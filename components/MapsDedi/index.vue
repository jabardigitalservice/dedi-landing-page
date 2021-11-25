<template>
  <div class="wrapper">
    <div class="maps-dedi">
      <h4 class="maps-dedi__heading">
        Data Perkembangan Desa Digital dan Mitra
      </h4>
      <p class="maps-dedi__subheading">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim aenean justo, adipiscing in lacinia mauris mauris vel.
      </p>
      <div class="maps-dedi__switch">
        <div
          :class="{
            'maps-dedi__switch--active': isvillage,
            'maps-dedi__switch--non-active': !isvillage,
          }"
          @click="joinSelected = 'village'"
        >
          <div
            :class="{
              'maps-dedi__switch--active-text': isvillage,
              'maps-dedi__switch--non-active-text': !isvillage
            }"
          >
            Desa Tergabung
          </div>
        </div>
        <div
          :class="{
            'maps-dedi__switch--active': isMitra,
            'maps-dedi__switch--non-active': !isMitra,
          }"
          @click="joinSelected = 'Mitra'"
        >
          <div
            :class="{
              'maps-dedi__switch--active-text': isMitra,
              'maps-dedi__switch--non-active-text': !isMitra
            }"
          >
            Mitra Tergabung
          </div>
        </div>
      </div>
      <div v-show="isvillage" class="maps">
        <div class="maps__motif">
          <img src="~/assets/images/MotifDot.svg" alt="Motif Dot">
        </div>
        <div
          ref="boxmaps"
          :class="{
            'maps__boxmaps--fullscreen': isFullscreen,
            'maps__boxmaps--exitfullscreen': !isFullscreen,
            'maps__boxmaps': true,

          }"
        >
          <div
            ref="maps"
            :class="{
              'maps__boxmaps-map--fullscreen': isFullscreen,
              'maps__boxmaps-map--exitfullscreen': !isFullscreen,
              'maps__boxmaps-map': true

            }"
          />
          <div
            :class="{
              'maps__boxmaps-info':true,
              'maps__boxmaps-info--fullscreen': isFullscreen,
              'maps__boxmaps-info--exitfullscreen': !isFullscreen,
            }"
          >
            <div class="maps__boxmaps-info-box">
              <div class="maps__boxmaps-info-box-title">
                Total <strong>{{ totalVillage }} desa</strong> telah bergabung
              </div>
              <div class="maps__boxmaps-info-box-subtitle">
                Update per {{ updatedDate }}
              </div>
            </div>
          </div>
          <div
            :class="{
              'maps__boxmaps-control':true,
              'maps__boxmaps-control--fullscreen': isFullscreen,
              'maps__boxmaps-control--exitfullscreen': !isFullscreen,
            }"
          >
            <div ref="currenlocation" class="maps__boxmaps-control-current-location" @click="setCurrentLocation">
              <img src="~/assets/icons/IconCurrentLocation.svg" class="w-5 h-5" alt="Icon Current Location">
            </div>
            <div>
              <div class="maps__boxmaps-control-zoom-in" @click="setZoomIn()">
                <img src="~/assets/icons/IconPlus.svg" class="w-5 h-5" alt="Icon Plus">
              </div>
              <div class="maps__boxmaps-control-zoom-out" @click="setZoomOut()">
                <img src="~/assets/icons/IconMinus.svg" class="w-5 h-5" alt="Icon Plus">
              </div>
            </div>
            <div ref="fullscreen" class="maps__boxmaps-control-fullscreen" @click="setFullscreen">
              <img src="~/assets/icons/IconFullscreen.svg" class="w-5 h-5" alt="Icon Fullscreen">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'
import debounce from 'lodash/debounce'

const loader = new Loader({
  apiKey: 'AIzaSyBisT1SjBCXqWjGdUT2Iv7LnbdCWKU__7w',
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
  data () {
    return {
      joinSelected: 'village',
      totalVillage: 0,
      isFullscreen: false,
      map: null,
      infoWindow: null,
      markers: [],
      isDraged: true,
      isZoomChanged: true,
      isMoveCurrenLocation: false
    }
  },
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
  mounted () {
    this.initialGoogleMap()
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
     * custom template info window
     */
    renderInfoWindow (item) {
      return `
        <div class="p-2 flex flex-col justify-start items-start">
          <div class="max-w-[260px]">
            <img class="w-[244px] h-[90px]" width="144" height="90" src="${item.images.length ? item.images[0] : require('~/assets/logo/logo-dedi-abu-abu.svg')}" alt="Logo Dedi Abu Abu" />
          </div> 
          <div class="mt-2 font-roboto text-blue-gray-800 font-bold text-base leading-[26px]">${item.name}</div>
          <div class="w-full flex justify-between items-center font-sans">
            <div class="text-gray-500 text-sm leading-[23px]">
              ${item.city.name}
            </div>
            <div class="bg-green-100 py-[2px] px-2 rounded-[6px] box-border">
              <div class="text-green-800 text-xs leading-[19px] font-medium">Level ${item.level ? item.level : ''}</div>
            </div>
          </div>
        </div>
      `
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
          response = await this.$axios.get('/villages/list-with-location', { params })
        } else {
          response.data = {}
        }

        const { data, meta } = response.data

        this.totalVillage = meta.total

        const urlMarkers = [
          '/markers/MarkerGreen.svg',
          '/markers/MarkerBlue.svg',
          '/markers/MarkerYellow.svg',
          '/markers/MarkerRed.svg'
        ]

        const markers = data.map((item) => {
          const marker = new google.maps.Marker({
            position: { lat: item.location.lat, lng: item.location.lng },
            map,
            icon: urlMarkers[0]
          })

          /**
           * show info window when marker is clicked
           */
          marker.addListener('click', () => {
            if (this.infoWindow) {
              this.infoWindow.close()
            }

            this.infoWindow = new google.maps.InfoWindow({
              content: this.renderInfoWindow(item)
            })

            this.infoWindow.open({
              map,
              anchor: marker,
              disableAutoPan: true
            })
          })

          return marker
        })
        this.markers = markers
      } catch (error) {
        throw new Error(error)
      }
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
    }
  }
}
</script>

<style lang="postcss">
@import './MapsDedi.pcss';
</style>
