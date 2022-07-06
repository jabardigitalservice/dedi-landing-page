<template>
  <div id="three-pillars" class="pillars">
    <div class="pillars__wrapper">
      <div class="pillars__title">
        <h1>Nilai yang Kami Tanamkan</h1>
        <p>
          Nilai yang kami tanam selalu kami pegang teguh. Nilai ini yang menjadi kekuatan bagi kami dalam menjalankan
          misi dari program Desa Digital.
        </p>
      </div>
      <div class="pillars__main">
        <CardPillars />
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.pillars {
  @apply w-full h-full bg-[#F8F8F6];

  &__wrapper {
    @apply max-w-7xl mx-6 py-6 md:(py-[60px]) xl:(py-[120px] mx-auto);
  }

  &__title {

    h1 {
      @apply text-[28px] leading-[42px]
      text-center font-serif font-bold text-blue-gray-800
      sm:(text-[32px] leading-[50px]);
    }

    p {
      @apply w-full h-full pt-[28px]
      text-center text-blue-gray-400
    }
  }

  &__main {
    @apply pt-[32px] sm:(pt-[64px]);
  }
}
</style>
