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
      <div class="w-full p-4 rounded-[12px] border border-blue-gray-50">
        <div ref="maps" class="w-full h-[730px] rounded-[12px]" />
      </div>
    </div>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'
export default {
  data () {
    return {
      joinSelected: 'Desa'
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
  async mounted () {
    const resLocation = await this.$axios.get('/villages/list-with-location')
    console.log(resLocation.data.data)
    const loader = new Loader({
      apiKey: 'AIzaSyBisT1SjBCXqWjGdUT2Iv7LnbdCWKU__7w',
      version: 'weekly',
      libraries: ['places']
    })
    const mapOptions = {
      mapId: '3ddb735886cd57d',
      center: { lat: -6.9169137, lng: 107.62003 },
      zoom: 14
    }

    try {
      const google = await loader.load()
      // eslint-disable-next-line no-unused-vars
      const map = new google.maps.Map(this.$refs.maps, mapOptions)
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style lang="postcss">
.maps-dedi {
  @apply py-6 flex flex-col items-center sm:py-10 lg:py-20;

  &__heading {
    @apply font-serif font-bold text-blue-gray-800 text-[24px] leading-[31px] text-center sm:(text-[37px] leading-[60px] mt-8) lg:mt-[34px];
  }

  &__subheading {
    @apply text-sm text-gray-700 text-center mt-6 sm:(leading-[23px] mt-5);
  }

  &__switch {
    @apply h-[60px] max-w-[376px] rounded-[48px] bg-[#EBEEF3] my-8 flex;

    &--active {
      box-shadow: 0px 4px 12px rgba(0, 27, 61, 0.08);
      @apply bg-white rounded-[48px] max-w-[184px] h-[52px] m-1 flex items-center justify-center transition-all delay-75;

      &-text {
        @apply px-5 py-4 text-blue-gray-800 text-[16px] leading-[19px] font-bold text-center;
      }
    }

    &--non-active {
      @apply rounded-[48px] max-w-[184px] h-[52px] m-1 flex items-center justify-center cursor-pointer;

      &-text {
        @apply px-5 py-4 text-blue-gray-400 text-[16px] leading-[19px] text-center;
      }
    }
  }

}
</style>
