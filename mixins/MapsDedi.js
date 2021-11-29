import { Loader } from '@googlemaps/js-api-loader'
import debounce from 'lodash/debounce'

const loader = new Loader({
  apiKey: process.env.NUXT_ENV_GOOGLE_MAPS_API,
  version: 'weekly',
  region: 'ID'
})

const mapOptions = {
  mapId: '3ddb735886cd57d',
  center: { lat: -6.9024812, lng: 107.61881 },
  zoom: 16,
  disableDefaultUI: true
}

export default {
  computed: {
    isvillage () {
      return this.joinSelected === 'village'
    },
    isMitra () {
      return this.joinSelected === 'Mitra'
    },
    updatedDate () {
      return new Date().toLocaleString('id', { month: 'long', year: 'numeric' })
    }
  },
  watch: {
    '$fetchState.pending' (val) {
      this.listVillageIsReady = false
      if (!val) {
        setTimeout(() => {
          this.listVillageIsReady = true
        }, 1000)
      }
    }
  },
  mounted () {
    this.initialGoogleMap()
    this.initIntersectionObserver()
  },
  methods: {
    /**
     * Initial load google map
     */
    async initialGoogleMap () {
      try {
        const google = await loader.load()
        const map = await new google.maps.Map(this.$refs.maps, mapOptions)

        this.setCurrentLocation()

        this.map = map
        this.google = google

        map.addListener('dragend', () => {
          this.isDraged = true
        })

        map.addListener('zoom_changed', () => {
          this.isZoomChanged = true
        })

        map.addListener('zoom_changed', () => {
          this.isZoomChanged = true
        })

        map.addListener('click', () => {
          if (this.infoWindow) {
            this.infoWindow.close()
          }
        })

        map.addListener('idle', debounce(() => { this.setMarkerBounds(google, map) }, 1000, { leading: false, trailing: true }))
      } catch (error) {
        throw new Error(error)
      }
    },
    /**
     * mapping markers based on bounds
     */
    setMarkerBounds (google, map) {
      const bounds = this.getBounds(map)

      const params = {
        'bounds[ne]': `${bounds.ne.lng()},${bounds.ne.lat()}`,
        'bounds[sw]': `${bounds.sw.lng()},${bounds.sw.lat()}`
      }
      if (this.isDraged || this.isZoomChanged || this.isMoveCurrenLocation) {
        this.setMarker(google, map, params)
      }

      this.isDraged = false
      this.isZoomChanged = false
      this.isMoveCurrenLocation = false
    },
    /**
     * Delete all marker
     */
    deleteMarker () {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null)
      }
    },
    /**
     * this function may need optimization for render thousand marker into google map
     * set thousand marker into google map with marker cluster
     */
    async setMarker (google, map, params) {
      try {
        this.deleteMarker()

        const zoom = map.getZoom()

        let response = {}
        /**
         * Hit api when zoom more then 14 zoom
         */
        if (zoom > 14) {
          response = await this.$axios.get('/villages/with-location', { params })
        } else {
          response = {
            data: {
              data: [],
              meta: []
            }
          }
        }

        const { data } = response.data

        const urlMarkers = [
          '/markers/MarkerRed.svg',
          '/markers/MarkerYellow.svg',
          '/markers/MarkerBlue.svg',
          '/markers/MarkerGreen.svg'
        ]

        if (data) {
          const markers = data.map((item) => {
            const marker = new google.maps.Marker({
              position: { lat: item.location.lat, lng: item.location.lng },
              map,
              icon: item.level ? urlMarkers[item.level - 1] : urlMarkers[3]
            })

            if (this.markerOpenInfoWindow.lat === marker.position.lat() && this.markerOpenInfoWindow.lng === marker.position.lng()) {
              this.setInfoWindow(map, marker, item, google)
              this.markerOpenInfoWindow = {}
            }

            /**
             * show info window when marker is clicked
             */
            google.maps.event.addListener(marker, 'click', () => {
              this.isSidebarOpen = true
              this.listVillage = this.listVillage.filter(village => village.id !== item.id)
              this.listVillage.unshift(item)
              this.setInfoWindow(map, marker, item, google)
              this.$refs.listvillage.scrollTop = 0
            })

            return marker
          })
          this.markers = markers
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    /**
     * Toggle info window
     */
    setInfoWindow (map, marker, item, google) {
      if (this.infoWindow) {
        this.infoWindow.close()
      }

      this.infoWindow = new google.maps.InfoWindow({
        content: this.templateInfoWindow(item)
      })

      this.infoWindow.open({
        map,
        anchor: marker,
        disableAutoPan: true
      })
    },
    /**
     * Set zoom in
     */
    setZoomIn () {
      this.map.setZoom(this.map.getZoom() + 1)
    },
    /**
     * Set zoom out
     */
    setZoomOut () {
      this.map.setZoom(this.map.getZoom() - 1)
    },
    /**
     * Get bounds maps
     */
    getBounds (map) {
      try {
        const bounds = map.getBounds()
        const ne = bounds.getNorthEast()
        const sw = bounds.getSouthWest()
        return { ne, sw }
      } catch (error) {
        return {
          ne: null,
          sw: null
        }
      }
    },
    /**
     * Check in Bounds maps
     */
    inBounds (point, bounds) {
      const eastBound = point.lng() < bounds.ne.lng()
      const westBound = point.lng() > bounds.sw.lng()
      let inLong

      if (bounds.ne.lng() < bounds.sw.lng()) {
        inLong = eastBound || westBound
      } else {
        inLong = eastBound && westBound
      }

      const inLat = point.lat() > bounds.sw.lat() && point.lat() < bounds.ne.lat()
      return inLat && inLong
    },
    /**
     * Set current location with ask permission user location
     */
    setCurrentLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.isMoveCurrenLocation = true
          this.map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
        })
      } else {
        throw new Error('Geolocation is not supported by this browser')
      }
    },
    /**
     * Set fullscreen google map
     */
    requestFullscreen () {
      if (this.$refs.boxmaps.requestFullscreen) {
        this.$refs.boxmaps.requestFullscreen()
      } else if (this.$refs.boxmaps.webkitRequestFullScreen) {
        this.$refs.boxmaps.webkitRequestFullScreen()
      } else if (this.$refs.boxmaps.mozRequestFullScreen) {
        this.$refs.boxmaps.mozRequestFullScreen()
      } else if (this.$refs.boxmaps.msRequestFullScreen) {
        this.$refs.boxmaps.msRequestFullScreen()
      }
    },
    /**
     * Exit fullscreen google map
     */
    exitFullscreen () {
      if (process.client) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      }
    },
    /**
     * make decisions for set fullscreen or exit fullscreen google map
     */
    setFullscreen () {
      if (this.isFullscreen) {
        this.isFullscreen = false
        this.exitFullscreen()
      } else {
        this.isFullscreen = true
        this.requestFullscreen()
      }
    },
    /**
     * Toggle sidebar
     */
    setSidebar () {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    /**
     * Set Center Location
     */
    setCenter (location) {
      this.isMoveCurrenLocation = true
      this.map.setCenter({ lat: location.lat, lng: location.lng })
    },
    /**
     * on click item village in sidebar
     */
    onClickItemVillage (village) {
      this.setCenter(village.location)
      this.markerOpenInfoWindow = village.location
    },
    /**
     * Initial Intersection Observer
     */
    initIntersectionObserver () {
      this.observer = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting && this.query.current_page < this.query.last_page) {
          this.query = { ...this.query, current_page: this.query.current_page + 1 }
          this.$fetch()
        }
      })

      this.observer.observe(this.$refs.observer)
    },
    /**
     * on click level
     */
    onClickChipLevel (value) {
      this.query = {
        ...this.query,
        current_page: 1,
        level: value === 'semua' ? '' : value
      }
      this.$fetch()
    },
    /**
     * search village when user typed field search
     */
    onSearchVillage (value) {
      if (value.length > 2) {
        this.debounceSearch(value)
      } else {
        this.debounceSearch('')
      }
    },
    /**
     * make a delay request search village
     */
    debounceSearch: debounce(function (value) {
      this.query = { ...this.query, name: value, current_page: 1 }
      this.$fetch()
    }, 1000)
  },
  /**
   * Destroy observer
   */
  destroyed () {
    this.observer.disconnect()
  }
}
