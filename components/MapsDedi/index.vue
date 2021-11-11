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
            'maps-dedi__switch--active': isDesa,
            'maps-dedi__switch--non-active': !isDesa,
          }"
          @click="joinSelected = 'Desa'"
        >
          <div
            :class="{
              'maps-dedi__switch--active-text': isDesa,
              'maps-dedi__switch--non-active-text': !isDesa
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
      <div v-show="isDesa" class="maps">
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
                Total <span class="font-bold">{{ totalVillage }} Desa</span> telah bergabung
              </div>
              <div class="maps__boxmaps-info-box-subtitle">
                Update per {{ new Date().toLocaleString('id', { month: 'long' }) }} {{ new Date().getFullYear() }}
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
import { MarkerClusterer, KmeansAlgorithm } from '@googlemaps/markerclusterer'

const loader = new Loader({
  apiKey: 'AIzaSyBisT1SjBCXqWjGdUT2Iv7LnbdCWKU__7w',
  version: 'weekly',
  region: 'ID'
})

const mapOptions = {
  mapId: '3ddb735886cd57d',
  center: { lat: -6.9169137, lng: 107.62003 },
  zoom: 15,
  disableDefaultUI: true
}

export default {
  data () {
    return {
      joinSelected: 'Desa',
      totalVillage: 0,
      isFullscreen: false,
      map: null,
      infoWindow: null
    }
  },
  computed: {
    isDesa () {
      return this.joinSelected === 'Desa'
    },
    isMitra () {
      return this.joinSelected === 'Mitra'
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
        const map = new google.maps.Map(this.$refs.maps, mapOptions)

        this.map = map

        map.addListener('click', () => {
          if (this.infoWindow) {
            this.infoWindow.close()
          }
        })

        map.addListener('dragend', () => {
          if (this.infoWindow) {
            if (!this.inBounds(this.infoWindow.position, this.getBounds(map))) {
              this.infoWindow.close()
            }
          }
        })

        this.setMarker(google, map)
      } catch (error) {
        throw new Error(error)
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
    async setMarker (google, map) {
      try {
        const response = await this.$axios.get('/villages/list-with-location')
        this.totalVillage = response.data.meta.total
        const urlMarkers = [
          '/markers/MarkerGreen.svg',
          '/markers/MarkerBlue.svg',
          '/markers/MarkerYellow.svg',
          '/markers/MarkerRed.svg'
        ]
        const markers = response.data.data.map((item) => {
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
              disableAutoPan: false
            })
          })

          return marker
        })
        /**
         * displaying markers with marker clusters and optimization in this case using KmeansAlgorithm with maximum display 20 cluster
         */
        // eslint-disable-next-line no-new
        new MarkerClusterer({ algorithm: new KmeansAlgorithm({ maxZoom: 18, numberOfClusters: 20 }), markers, map })
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
     * This function in sprint 2 is not curretly use
     */
    getBounds (map) {
      const bounds = map.getBounds()
      const ne = bounds.getNorthEast()
      const sw = bounds.getSouthWest()
      return { ne, sw }
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
/**
 * overide class google maps info window
 * Remove close button info window
 */
.gm-ui-hover-effect {
    display: none !important;
}

.gm-style .gm-style-iw-d {
  overflow: unset !important;
}

.gm-style .gm-style-iw-c {
  padding: 0 !important;
  box-shadow: 0px 4px 22px rgba(0, 100, 48, 0.14);
}

.gm-style .gm-style-iw-t::after {
  display: none !important;
}

.maps-dedi {
  @apply py-6 flex flex-col items-center sm:py-10 lg:py-20;

  &__heading {
    @apply font-serif font-bold text-blue-gray-800 text-[24px] leading-[31px] text-center sm:(text-[37px] leading-[60px] mt-8) lg:mt-[34px];
  }

  &__subheading {
    @apply text-sm text-gray-700 text-center mt-6 sm:(leading-[23px] mt-5);
  }

  &__switch {
    @apply h-[60px] max-w-[376px] sm:w-[376px] rounded-[48px] bg-[#EBEEF3] my-8 flex;

    &--active {
      box-shadow: 0px 4px 12px rgba(0, 27, 61, 0.08);
      @apply bg-white rounded-[48px] max-w-[184px] sm:w-[184px] h-[52px] m-1 flex items-center justify-center transition-all delay-75;

      &-text {
        @apply px-5 py-4 text-blue-gray-800 text-[16px] leading-[19px] font-bold text-center;
      }
    }

    &--non-active {
      @apply rounded-[48px] max-w-[184px] sm:w-[184px] h-[52px] m-1 flex items-center justify-center cursor-pointer;

      &-text {
        @apply px-5 py-4 text-blue-gray-400 text-[16px] leading-[19px] text-center;
      }
    }
  }
}

.maps {
  @apply w-full relative;

  &__motif {
    @apply absolute hidden sm:(block -bottom-5 -left-5) -z-10;
  }

  &__boxmaps {
    @apply relative w-full border border-blue-gray-50 bg-white;

    &--fullsreen {
      @apply p-0 rounded-none;
    }

    &--exitfullscreen {
      @apply p-4 rounded-[12px];
    }

    &-map {
      @apply w-full;

      &--fullscreen {
        @apply h-screen sm:h-screen rounded-none;
      }

      &--exitfullscreen {
        @apply h-[700px] sm:h-[730px] rounded-[12px];
      }

    }

    &-info {
      @apply absolute left-0 top-0;

      &--fullscreen {
        @apply m-6;
      }

      &--exitfullscreen {
        @apply m-10;
      }

      &-box {
        @apply bg-green-700 py-2 px-4 text-white rounded-lg;

        &-title {
          @apply font-roboto text-base leading-[26px];
        }

        &-subtitle {
          @apply italic text-xs leading-[19px];
        }
      }
    }

    &-control {
      @apply absolute bottom-0 right-0 flex flex-col gap-3;

      &--fullscreen {
        @apply m-6;
      }

      &--exitfullscreen {
        @apply m-10;
      }

      &-current-location {
        @apply bg-green-700 hover:bg-green-800 w-[38px] h-[38px] rounded-lg cursor-pointer select-none flex items-center justify-center;
      }

      &-zoom-in {
        @apply bg-green-700 hover:bg-green-800 w-[38px] h-[38px] rounded-t-lg cursor-pointer select-none flex items-center justify-center border-b border-b-green-500;
      }

      &-zoom-out {
        @apply bg-green-700 hover:bg-green-800 w-[38px] h-[38px] rounded-b-lg cursor-pointer select-none flex items-center justify-center;
      }

      &-fullscreen {
        @apply bg-green-700 hover:bg-green-800 w-[38px] h-[38px] rounded-lg cursor-pointer select-none flex items-center justify-center;
      }
    }
  }
}
</style>
