<template>
  <div class="wrapper">
    <div class="join-info">
      <h4 class="join-info__heading">
        Ingin Menjadi Bagian Dari Desa Digital?
      </h4>
      <p class="join-info__subheading">
        Gabung ke komunitas Desa Digital dengan bergabung sebagai Desa ataupun sebagai Mitra.
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
          v-if="isDesa"
          :class="{
            'join-info__infografik--active': isDesa,
            'join-info__infografik---non-active': !isDesa,
          }"
          width="932"
          height="395"
          src="~/assets/images/InfoJoinDesa.png"
          alt="Info Bergabung Desa"
        >
        <img
          v-if="isMitra"
          :class="{
            'join-info__infografik--active': isMitra,
            'join-info__infografik--non-active': !isMitra,
          }"
          width="932"
          height="395"
          src="~/assets/images/InfoJoinMitra.png"
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
  @apply py-6 flex flex-col items-center sm:py-10;

  &__heading {
    @apply font-serif font-bold text-blue-gray-800 text-[24px] leading-[31px] text-center sm:(text-[37px] leading-[60px] mt-8);
  }

  &__subheading {
    @apply text-sm text-gray-700 text-center mt-6 sm:(leading-[23px] mt-5);
  }

  &__switch {
    @apply h-[60px] w-[376px] rounded-[48px] bg-[#EBEEF3] mt-8 flex;

    &--active {
      box-shadow: 0px 4px 12px rgba(0, 27, 61, 0.08);
      @apply bg-white rounded-[48px] w-[184px] h-[52px] m-1 flex items-center justify-center transition-all delay-75;

      &-text {
        @apply px-5 py-4 text-blue-gray-800 text-[16px] leading-[19px] font-bold;
      }
    }

    &--non-active {
      @apply rounded-[48px] w-[184px] h-[52px] m-1 flex items-center justify-center cursor-pointer;

      &-text {
        @apply px-5 py-4 text-blue-gray-400 text-[16px] leading-[19px];
      }
    }
  }

  &__infografik {
    @apply w-full max-h-max overflow-x-auto my-8 flex items-center justify-start md:justify-center w-[932px] h-[395px];

    &--active {
      @apply max-w-max;
    }

    &--non-active {
      @apply max-w-max;
    }
  }

  &__cta {
    @apply w-full active:(w-[calc(100%-2px)]) sm:(w-auto active:(w-auto));
  }

}
</style>
