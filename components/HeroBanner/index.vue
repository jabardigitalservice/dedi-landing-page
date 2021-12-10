<template>
  <div id="hero-banner" class="hero-banner">
    <div class="hero-banner__main">
      <div class="relative px-4 sm:pl-[15.5%]">
        <div class="hero-banner__box-title">
          <h3 class="hero-banner__title">
            Saatnya semua menikmati
          </h3>
          <h3 class="hero-banner__title">
            manfaat teknologi
          </h3>
        </div>
        <p class="hero-banner__desc">
          Bersama-sama, membuat desa lebih banyak kemajuan daripada yang kita bayangkan.
        </p>
        <div class="hero-banner__cta">
          <BaseButton class="hero-banner__cta-btn" label="Gabung Sekarang" @click="onClickCTA" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
.hero-banner {
  @apply relative h-[540px] sm:h-[590px];

  &__main {
    background-image: url('~/assets/images/HeroBanner.png');
    background-position-x: 30%;
    background-position-y: 100%;
    @apply bg-no-repeat bg-cover w-full h-full pt-[60px] relative;

    &::before {
      content: "";
      background-image: url('~/assets/images/MotifHeroBanner.png');
      background-size: calc(max(100%, 1440px)) auto;
      background-position-y: 100%;
      @apply bg-no-repeat w-full h-full absolute bottom-0 left-0;
    }
  }

  &__box-title {
    @apply mt-[22px] mb-2;
  }

  &__title {
    @apply text-[24px] leading-[30.72px]
    text-center font-serif font-bold text-blue-gray-700
    sm:(text-left text-[49px] leading-[62.72px]);
  }

  &__desc {
    @apply text-center font-sans text-blue-gray-400
    font-normal text-sm sm:(text-left leading-[23px]);
  }

  &__cta {
    @apply mt-6 sm:(mt-8);

    &-btn {
      @apply w-full active:(w-[calc(100%-2px)])
      sm:(w-auto active:(w-auto));
    }
  }
}

</style>
