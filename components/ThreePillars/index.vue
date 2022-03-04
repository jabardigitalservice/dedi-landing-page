<template>
  <div id="three-pillars" class="pillars">
    <div class="wrapper">
      <div class="pillars__title">
        <h1>Nilai yang Kami Tanamkan</h1>
        <p>Ada tiga nilai utama yang selalu kami pegang teguh dalam menjalankan misi dari program Desa Digital.</p>
      </div>
      <div class="pillars__main">
        <CardPillars />
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.pillars {
  @apply w-full h-full bg-[#F8F8F6] pt-20 pb-8 sm:(py-[120px]);

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
