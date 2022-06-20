<template>
  <div id="potency" class="potency">
    <div class="potency__content">
      <div class="potency__content-img">
        <img height="473" width="auto" src="~assets/images/about/PotensiDesa.svg" alt="Tim Pengembang Desa Digital">
      </div>
      <div class="potency__content-text">
        <h1>Bayangkan Potensi Desa Berkembang Lebih Baik Dengan Teknologi Digital</h1>
        <p>
          Mempersempit kesenjangan digital adalah misi kami. Kami percaya, hadirnya teknologi bantu tingkatkan
          produktivitas masyarakat desa, bahkan memperluas jangkauan produk usaha mereka.
        </p>
        <p>
          Pemanfaatan teknologi yang tepat telah menghadirkan kebaikan bagi para penerima manfaat, diantaranya 12
          kelompok tani dari 11 Desa di Jawa Barat mengalami peningkatan hasil panen dan pendapatan masing-masing
          sebesar 42.2% dan 32.7%.
        </p>
        <p>
          Para petani ikan di 51 Desa juga telah merasakan manfaatnya. Mereka berhasil menurunkan jumlah kunjungan ke
          kolam dan Food Convertion Ratio (FCR) sebanyak 33.3% dan 15.4%, serta meningkatkan Survival Rate (SR) hingga
          50%. Bukti ini adalah sedikit dari yang kami capai. Bantu kami untuk terus menyebarkan dampak baik
          seluas-luasnya bagi banyak penerima penerima manfaat lainnya.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentPotency'
}

</script>

<style lang="postcss">
  .potency {
    @apply w-full h-full bg-[#F8F8F6];

    &__content {
      @apply w-full h-full flex flex-col-reverse
      md: (grid grid-cols-2 justify-between items-center);

      &-img {
        @apply w-full h-full flex items-end;
      }

      &-text {
        @apply w-full h-full flex flex-col
        md: (py-6)
        xl: (py-[60px]);

        h1 {
          @apply w-full h-full text-[28px] text-center leading-[42px] font-serif font-bold text-blue-gray-800 px-4
          md: (pl-0 pr-8 text-left text-[32px] leading-normal)
          xl: (text-[42px] leading-15);
        }

        p {
          @apply w-full h-full pt-6 text-center text-blue-gray-500 px-4
          md: (text-left pl-0 pr-8);
          lg: (max-w-[586px]);
        }
      }
    }
  }

</style>
