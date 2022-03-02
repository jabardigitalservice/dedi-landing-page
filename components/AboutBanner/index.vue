<template>
  <div class="wrapper">
    <div class="pt-[60px]">
      <div class="flex flex-col-reverse sm:(flex-row justify-between items-center)">
        <div class="block sm:(w-[443px]) md:(w-[unset])">
          <h2 class="font-serif text-center text-[20px] leading-[40px] text-blue-gray-700 font-bold mt-6 sm:(mt-[unset] text-left text-[38px] leading-[45px])">
            Meniadakan Batasan Untuk
          </h2>
          <h2 class="font-serif text-center text-[20px] leading-[40px] text-blue-gray-700 font-bold sm:(mt-[unset] text-left text-[56px] leading-[65.63px])">
            Membawa Perubahan
          </h2>
          <p class="text-blue-gray-500 text-center w-full mt-6 sm:(text-left leading-[26px] w-[70%])">
            Perluas jangkauan, kembangkan kapasitas masyarakat, dan
            maksimalkan potensi desa.
          </p>
          <div class="mt-6 sm:(mt-8)">
            <BaseButton class="w-full active:(w-[calc(100%-2px)]) sm:(w-[unset] active:w-[unset])" label="Gabung Desa Digital" @click="onClickCTA" />
          </div>
        </div>
        <div class="flex-1">
          <img class="w-full sm:(flex-1)" src="@/assets/images/about/Banner.png" alt="About Banner">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentBannerAbout',
  methods: {
    onClickCTA () {
      this.$emit('onClickCTA', true)
    }
  }
}
</script>
