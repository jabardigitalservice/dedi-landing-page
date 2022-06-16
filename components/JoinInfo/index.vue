<template>
  <div id="join-info" class="wrapper">
    <div class="join-info">
      <h4 class="join-info__heading">
        Jadi Bagian Desa Digital, Jadi Bagian Perubahan
      </h4>
      <p class="join-info__subheading">
        Bergabung sebagai desa ataupun mitra dengan ikuti tahapan berikut.
      </p>
      <div class="join-info__switch">
        <div
          :class="{
            'join-info__switch--active': isDesa,
            'join-info__switch--non-active': !isDesa,
          }"
          @click="flowSelected = 'Desa'"
        >
          <div
            :class="{
              'join-info__switch--active-text': isDesa,
              'join-info__switch--non-active-text': !isDesa
            }"
          >
            Alur Desa
          </div>
        </div>
        <div
          :class="{
            'join-info__switch--active': isMitra,
            'join-info__switch--non-active': !isMitra,
          }"
          @click="flowSelected = 'Mitra'"
        >
          <div
            :class="{
              'join-info__switch--active-text': isMitra,
              'join-info__switch--non-active-text': !isMitra
            }"
          >
            Alur Mitra
          </div>
        </div>
      </div>
      <div class="join-info__infografik">
        <img
          v-show="isDesa"
          class="max-w-max join-info__infografik-image"
          width="932"
          height="395"
          src="~/assets/images/InfoJoinDesa.svg"
          alt="Info Bergabung Desa"
        >
        <img
          v-show="isMitra"
          class="max-w-max join-info__infografik-image "
          width="932"
          height="395"
          src="~/assets/images/InfoJoinMitra.svg"
          alt="Info Bergabung Desa"
        >
      </div>
      <BaseButton
        class="join-info__cta"
        label="Gabung Sekarang"
        @click="onClickCTA"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      flowSelected: 'Desa'
    }
  },
  computed: {
    isDesa () {
      return this.flowSelected === 'Desa'
    },
    isMitra () {
      return this.flowSelected === 'Mitra'
    }
  },
  methods: {
    onClickCTA () {
      /**
       * Trigger open popup join desa digital
       */
      this.$emit('clickCTA', true)
    }
  }
}
</script>

<style lang="postcss">
.join-info {
  background-image: url('~/assets/images/BackgroundGabungDesaMitra.svg');
  background-repeat: no-repeat;
  background-position-x: 5%;
  background-position-y: 75%;
  @apply py-6 flex flex-col items-center sm:py-10 lg:py-20;

  &__heading {
    @apply font-serif font-bold text-blue-gray-800 text-[24px] leading-[36px] text-center sm:(text-[37px] leading-[60px] mt-8);
  }

  &__subheading {
    @apply text-sm text-blue-gray-600 text-center mt-6 sm:(leading-[23px] mt-5);
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

  &__infografik {
    @apply w-full max-h-max overflow-x-auto my-8 flex items-center justify-start lg:justify-center;

    &-image {
      width: 932px;
      height: 395px;
    }
  }

  &__cta {
    @apply w-full active:(w-[calc(100%-2px)]) sm:(w-auto active:(w-auto));
  }

}
</style>
