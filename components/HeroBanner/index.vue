<template>
  <div class="hero-banner">
    <div class="hero-banner__main" />
    <div class="hero-banner__motif" />
  </div>
</template>

<style lang="postcss">
.hero-banner {
  @apply relative h-[540px] sm:h-[590px];

  &__main {
    background-image: url('~/assets/images/HeroBanner.png');
    background-position-x: 30%;
    background-position-y: 100%;
    @apply bg-no-repeat w-screen h-full;
  }

  &__motif{
    background-image: url('~/assets/images/MotifHeroBanner.png');
    @apply bg-no-repeat bg-cover w-full bottom-0 h-[57px] absolute;
  }
}

</style>
