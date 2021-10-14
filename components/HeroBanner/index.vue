<template>
  <div class="hero-banner">
    <div class="hero-banner__main">
      <h3>Judul Landing Page</h3>
    </div>
  </div>
</template>

<style lang="postcss">
.hero-banner {
  @apply relative h-[540px] sm:h-[590px] pt-[60px];

  &__main {
    background-image: url('~/assets/images/HeroBanner.png');
    background-position-x: 30%;
    background-position-y: 100%;
    @apply bg-no-repeat bg-cover w-screen h-full;

    &::before {
      content: "";
      background-image: url('~/assets/images/MotifHeroBanner.png');
      background-size: calc(max(100%, 1440px)) auto;
      background-position-y: 100%;
      @apply bg-no-repeat w-full h-full absolute bottom-0;
    }
  }
}

</style>
