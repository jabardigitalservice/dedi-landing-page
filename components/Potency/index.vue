<template>
  <div id="potency" class="potency">
    <div class="wrapper">
      <div class="potency__content">
        <div class="potency__content-img">
          <img
            height="473"
            width="auto"
            src="~assets/images/about/PotensiDesa.svg"
            alt="Tim Pengembang Desa Digital"
          >
        </div>
        <div class="potency__content-text">
          <h1>Bayangkan Potensi Desa Berkembang Lebih Baik Dengan Teknologi Digital</h1>
          <p>
            Mempersempit kesenjangan digital adalah misi kami. Kami percaya, hadirnya teknologi bantu tingkatkan
            produktivitas masyarakat desa, bahkan memperluas jangkauan produk usaha mereka.
          </p>
          <p>
            Hal ini mendorong kami untuk ambil peran dalam pengembangan potensi desa dengan pemanfaatan teknologi yang
            tepat. Demi terwujudnya kemandirian dan kesejahteraan masyarakat secara inklusif. Karena teknologi hadir
            untuk semua.
          </p>
        </div>
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
    @apply w-full h-full py-6 bg-[#F8F8F6];

    &__content {
      @apply w-full h-full flex flex-col-reverse
      md: (grid grid-cols-2 justify-between items-center);

      &-img {
        @apply w-full h-full flex;
      }

      &-text {
        @apply w-full h-full flex flex-col
        md: (py-30);

        h1 {
          @apply w-full h-full text-[28px] text-center leading-[42px] font-serif font-bold text-blue-gray-800
          md: (px-2 text-left)
          lg: (text-[42px] leading-15);
        }

        p {
          @apply w-full h-full pt-6 text-center text-blue-gray-500
          md: (w-full text-left px-2)
          lg: (w-[586px]);
        }
      }
    }
  }

</style>
