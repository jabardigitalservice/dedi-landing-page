<template>
  <div id="village-partner" class="wrapper">
    <div class="village-partner">
      <h4 class="village-partner__heading">
        Data Perkembangan Desa Digital dan Mitra
      </h4>
      <p class="village-partner__subheading">
        Demi mewujudkan kemandirian desa di Jawa Barat, program Desa Digital
        mengajak akademisi, pelaku usaha, komunitas, hingga masyarakat khususnya
        di pedesaan untuk turut berkontribusi dalam proses pembangunan infrastruktur, pemanfaatan
        <i>Internet of Things</i>
        (IoT), dan berpartisipasi dalam pelatihan literasi digital.
      </p>
      <p class="village-partner__subheading">
        Mengusung konsep pentahelix, kini {{ totalVillages }} desa di Jawa Barat telah menjadi
        penerima manfaat dan {{ totalPartners }} mitra telah terhubung untuk berinovasi bersama.
      </p>
      <div class="village-partner__switch">
        <div
          :class="{
            'village-partner__switch--active': isvillage,
            'village-partner__switch--non-active': !isvillage,
          }"
          @click="joinSelected = 'village'"
        >
          <div
            :class="{
              'village-partner__switch--active-text': isvillage,
              'village-partner__switch--non-active-text': !isvillage
            }"
          >
            Desa Tergabung
          </div>
        </div>
        <div
          :class="{
            'village-partner__switch--active': isMitra,
            'village-partner__switch--non-active': !isMitra,
          }"
          @click="joinSelected = 'Mitra'"
        >
          <div
            :class="{
              'village-partner__switch--active-text': isMitra,
              'village-partner__switch--non-active-text': !isMitra
            }"
          >
            Mitra Tergabung
          </div>
        </div>
      </div>
      <MapsDedi v-show="isvillage" />
      <Partner v-show="isMitra" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      joinSelected: 'village',
      dataPartners: [],
      dataVillages: [],
      totalPartners: 0,
      totalVillages: 0,
      query: {
        partnerQuery: {
          per_page: 16,
          current_page: 1,
          is_verified: true
        },
        villageQuery: {
          current_page: 1,
          per_page: 7,
          is_active: true
        }
      }
    }
  },
  async fetch () {
    await this.fetchPartner()
    await this.fetchVillage()
  },
  computed: {
    isvillage () {
      return this.joinSelected === 'village'
    },
    isMitra () {
      return this.joinSelected === 'Mitra'
    }
  },
  methods: {
    async fetchPartner () {
      const partnerResponse = await this.$axios.get('/partners', { params: this.query.partnerQuery })
      const { data, meta } = partnerResponse.data
      this.dataPartners = data
      this.query.partnersQuery = { ...this.query.partnersQuery, ...meta }
      this.totalPartners < meta.total ? this.totalPartners = meta.total : this.totalPartners = 0
    },
    async fetchVillage () {
      const villageResponse = await this.$axios.get('/villages/list-with-location', { params: this.query.villageQuery })
      const { data, meta } = villageResponse.data
      this.dataVillages = data
      this.query.villagesQuery = { ...this.query.villagesQuery, ...meta }
      this.totalVillages < meta.total ? this.totalVillages = meta.total : this.totalVillages = 0
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

.village-partner{
  @apply py-6 flex flex-col items-center sm:py-10 lg:py-20;

  &__heading {
    @apply mb-6 font-serif font-bold text-blue-gray-800 text-[24px] leading-[31px] text-center sm:(text-[37px] leading-[60px] mt-8 mb-5) lg:mt-[34px];
  }

  &__subheading {
    @apply text-sm text-blue-gray-700 text-center max-w-[1000px] sm:leading-[23px];
  }

  &__switch {
    @apply h-[60px] max-w-full sm:max-w-[376px] rounded-[48px] bg-[#EBEEF3] my-8 flex;

    &--active {
      box-shadow: 0px 4px 12px rgba(0, 27, 61, 0.08);
      @apply bg-white rounded-[48px] w-[184px] sm:max-w-[184px] h-[52px] m-1 flex items-center justify-center transition-all delay-75;

      &-text {
        @apply px-5 py-4 text-blue-gray-800 text-[16px] leading-[19px] font-bold text-center;
      }
    }

    &--non-active {
      @apply rounded-[48px] w-[184px] sm:max-w-[184px] h-[52px] m-1 flex items-center justify-center cursor-pointer;

      &-text {
        @apply px-5 py-4 text-blue-gray-400 text-[16px] leading-[19px] text-center;
      }
    }
  }
}
</style>
