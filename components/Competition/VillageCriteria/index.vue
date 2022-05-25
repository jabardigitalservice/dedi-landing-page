<template>
  <div id="village-criteria" class="village-criteria">
    <div class="wrapper">
      <div class="village-criteria__title">
        <h1>Kriteria Desa Yang Dapat Mengikuti</h1>
        <p>
          Desa yang bisa ikut serta dalam sayembara ini adalah desa yang masuk dalam kategori
          <strong class="text-white">Desa Level 3</strong> dan <strong class="text-white">Level 4</strong>
          sesuai ketentuan berikut:
        </p>
      </div>
      <div class="village-criteria__main">
        Under Construction
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.village-criteria {
  @apply w-full h-full bg-[#292742] py-[120px] sm:(py-[120px]);

  &__title {
    h1 {
      @apply text-[28px] leading-[42px]
      text-center font-serif font-bold text-white
      sm:(text-[32px] leading-[50px]);
    }

    p {
      @apply w-full h-full pt-8
      text-center text-blue-gray-100
    }
  }

  &__main {
    @apply pt-[32px] sm:(pt-[64px]);
  }

}

</style>
