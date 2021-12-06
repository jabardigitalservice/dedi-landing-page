<template>
  <div id="maps-dedi" class="wrapper">
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
              'maps__boxmaps-sidebar':true,
              'maps__boxmaps-sidebar--fullscreen': isFullscreen,
              'maps__boxmaps-sidebar--exitfullscreen': !isFullscreen,
              'maps__boxmaps-sidebar--close': !isSidebarOpen,
            }"
          >
            <div class="maps__boxmaps-sidebar-content">
              <div class="maps__boxmaps-sidebar-content-title">
                Pencarian Desa Digital
              </div>
              <jds-search
                class="maps__boxmaps-sidebar-content-search"
                placeholder="Masukan nama desa"
                icon
                :button="false"
                :value="search"
                @input="onSearchVillage"
              />
              <div class="maps__boxmaps-sidebar-content-box-level-village">
                <div class="maps__boxmaps-sidebar-content-text-level">
                  Level Desa
                </div>
                <div class="maps__boxmaps-sidebar-content-text-about-dedi">
                  Apa ini ?
                </div>
              </div>
              <div class="maps__boxmaps-sidebar-content-box-chips">
                <BaseChipsGroup class="maps__boxmaps-sidebar-content-chips" mandatory :values="listLevel" @onChange="onClickChipLevel" />
              </div>
              <div class="maps__boxmaps-sidebar-content-text-join-dedi">
                Total <strong class="maps__boxmaps-sidebar-content-total-join-dedi">{{ totalVillage }} desa</strong> telah bergabung
              </div>
              <div v-if="listVillageIsReady && !listVillage.length" class="maps__boxmaps-sidebar-content-empty-state">
                <img width="125" height="160" src="~/assets/images/EmptyStateSearch.svg" alt="Empty State Search">
                <div class="maps__boxmaps-sidebar-content-empty-state-title">
                  Mohon maaf, pencarian dengan kata kunci <strong v-if="search" class="text-green-800">'{{ search }}'</strong> tidak dapat ditemukan.
                </div>
                <div class="maps__boxmaps-sidebar-content-empty-state-subtitle">
                  Silahkan mencoba dengan kata kunci yang berbeda.
                </div>
              </div>
              <div v-show="!listVillageIsReady" class="maps__boxmaps-sidebar-content-skeleton">
                <div v-for="(i, index) in 4" :key="index">
                  <div class="maps__boxmaps-sidebar-content-skeleton-item">
                    <div class="maps__boxmaps-sidebar-content-skeleton-info">
                      <div class="maps__boxmaps-sidebar-content-skeleton-info-item-full animate-pulse" />
                      <div class="maps__boxmaps-sidebar-content-skeleton-info-item-70 animate-pulse" />
                      <div class="maps__boxmaps-sidebar-content-skeleton-info-item-30 animate-pulse" />
                    </div>
                    <div class="maps__boxmaps-sidebar-content-skeleton-image animate-pulse" />
                  </div>
                  <div class="maps__boxmaps-sidebar-content-skeleton-separator" />
                </div>
              </div>
              <div
                v-show="listVillageIsReady"
                ref="listvillage"
                :class="{
                  'maps__boxmaps-sidebar-content-list-village':true,
                  'maps__boxmaps-sidebar-content-list-village--close':!isSidebarOpen,
                }"
              >
                <div v-for="(village, index) in listVillage" :key="index" class="maps__boxmaps-sidebar-content-list-village-item" @click="onClickItemVillage(village)">
                  <div class="maps__boxmaps-sidebar-content-list-village-item-info">
                    <div class="maps__boxmaps-sidebar-content-list-village-item-info-detail">
                      <div class="maps__boxmaps-sidebar-content-list-village-item-info-detail-name">
                        {{ village.name }}
                      </div>
                      <div class="maps__boxmaps-sidebar-content-list-village-item-info-detail-city">
                        {{ village.city.name }}
                      </div>
                      <div class="maps__boxmaps-sidebar-content-list-village-item-info-detail-list">
                        <div
                          :class="{
                            'maps__boxmaps-sidebar-content-list-village-item-info-detail-list-level': true,
                            'maps__boxmaps-sidebar-content-list-village-item-info-detail-list-level--green': village.level === null || village.level === 4,
                            'maps__boxmaps-sidebar-content-list-village-item-info-detail-list-level--blue': village.level === 3,
                            'maps__boxmaps-sidebar-content-list-village-item-info-detail-list-level--yellow': village.level === 2,
                            'maps__boxmaps-sidebar-content-list-village-item-info-detail-list-level--pink': village.level === 1
                          }"
                        >
                          Level {{ village.level ? village.level : '' }}
                        </div>
                        <div v-if="village.category.name" class="maps__boxmaps-sidebar-content-list-village-item-info-detail-list-tema">
                          {{ village.category.name }}
                        </div>
                      </div>
                    </div>
                    <div class="maps__boxmaps-sidebar-content-list-village-item-image">
                      <img class="rounded-lg object-cover h-full w-full" :src="[village.images.length ? village.images[0] : require('~/assets/logo/logo-dedi-abu-abu.svg')]" alt="gambar sebaran desa digital">
                    </div>
                  </div>
                  <div class="maps__boxmaps-sidebar-content-list-village-item-separator" />
                </div>
                <div ref="observer" class="h-10 w-full" />
              </div>
            </div>
            <div class="maps__boxmaps-sidebar-arrow" @click="setSidebar">
              <MapsDediExpandButton :background-fill="isSidebarOpen ? 'white' : '#069550'" />
              <jds-icon
                class="absolute"
                :color="isSidebarOpen ? '#069550' : 'white' "
                :name="isSidebarOpen ? 'chevron-left' : 'chevron-right'"
                size="16px"
              />
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
import InfoWindow from 'mixins/InfoWindows'
import MapsDedi from 'mixins/MapsDedi'

export default {
  mixins: [
    InfoWindow,
    MapsDedi
  ],
  data () {
    return {
      listVillageIsReady: true,
      joinSelected: 'village',
      totalVillage: 0,
      isFullscreen: false,
      map: null,
      google: null,
      infoWindow: null,
      markers: [],
      isDraged: true,
      isZoomChanged: true,
      isMoveCurrenLocation: false,
      isSidebarOpen: false,
      listVillage: [],
      markerOpenInfoWindow: {},
      focusMarker: null,
      observer: null,
      search: '',
      query: {
        current_page: 1,
        per_page: 7
      },
      listLevel: [
        {
          label: 'Semua',
          value: 'semua'
        },
        {
          label: 'Lvl 1',
          value: '1'
        },
        {
          label: 'Lvl 2',
          value: '2'
        },
        {
          label: 'Lvl 3',
          value: '3'
        },
        {
          label: 'Lvl 4',
          value: '4'
        }
      ]
    }
  },
  async fetch () {
    const response = await this.$axios.get('/villages/list-with-location', { params: this.query })
    const { data, meta } = response.data
    if (this.query.current_page > 1) {
      this.listVillage = [...this.listVillage, ...data]
    } else {
      this.listVillage = data
    }
    this.query = { ...this.query, ...meta }
    if (this.totalVillage < meta.total) {
      this.totalVillage = meta.total
    }
  }
}
</script>

<style lang="postcss">
@import './MapsDedi.pcss';
</style>
