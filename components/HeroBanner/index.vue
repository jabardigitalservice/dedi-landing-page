<template>
  <div class="hero-banner">
    <div class="hero-banner__main">
      <div class="relative px-4 sm:pl-[15.5%]">
        <h3 class="hero-banner__title">
          Judul Landing Page
        </h3>
        <p class="hero-banner__desc">
          Tulisan ini berisi deskripsi singkat dari judul yang terdapat pada judul utama.
        </p>
        <p class="hero-banner__desc">
          Perlu didiskusikan apa yang akan muncul.
        </p>
        <div class="hero-banner__cta">
          <BaseButton class="hero-banner__cta-btn" label="Gabung Sekarang" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.hero-banner {
  @apply relative h-[540px] sm:h-[590px];

  &__main {
    background-image: url('~/assets/images/HeroBanner.png');
    background-position-x: 30%;
    background-position-y: 100%;
    @apply bg-no-repeat bg-cover w-screen h-full pt-[60px] relative;

    &::before {
      content: "";
      background-image: url('~/assets/images/MotifHeroBanner.png');
      background-size: calc(max(100%, 1440px)) auto;
      background-position-y: 100%;
      @apply bg-no-repeat w-full h-full absolute bottom-0 left-0;
    }
  }

  &__title {
    @apply mt-[22px] mb-2 text-[32px] leading-[40.96px]
    text-center font-serif font-bold text-blue-gray-700
    sm:(text-left text-[49px] leading-[79px]);
  }

  &__desc {
    @apply text-center font-sans text-blue-gray-400
    font-normal text-sm sm:text-left;
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
