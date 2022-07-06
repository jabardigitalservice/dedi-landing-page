<template>
  <div
    id="card"
    class="content"
  >
    <div v-for="content in contents" :key="content.id" class="card">
      <img class="card-img" :src="content.img" :alt="`Pillar ${content.id}`">
      <div class="card-text">
        <h2>{{ content.title }}</h2>
        <p>{{ content.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      contents: [
        {
          id: 1,
          img: require('~/assets/images/about/Pilar_1_Dedi.svg'),
          title: 'INOVASI TEKNOLOGI',
          desc: 'Responsif dalam memberikan solusi bagi pengembangan desa di Jawa Barat melalui beragam inovasi.'
        },
        {
          id: 2,
          img: require('~/assets/images/about/Pilar_2_Dedi.svg'),
          title: 'MELAYANI SEPENUH HATI',
          desc: 'Tak hanya menyediakan infrastruktur, masyarakat desa juga didampingi untuk belajar menggunakan teknologi agar mulai terbiasa dan perlahan merasakan manfaatnya.'
        },
        {
          id: 3,
          img: require('~/assets/images/about/Pilar_3_Dedi.svg'),
          title: 'BERKEMBANG BERSAMA',
          desc: 'Mengadopsi sistem pentahelix, mengajak akademisi, pelaku usaha, komunitas hingga peran media untuk berkolaborasi dan ciptakan aksi.'
        }
      ]
    }
  }
}
</script>

<style lang="postcss">
.content {
  @apply flex flex-col space-y-8 justify-center items-center
  sm:(flex flex-row gap-12 space-y-0);

  .card {
    @apply bg-white rounded-2xl min-h-[382px] h-auto w-full;
    box-shadow: 0px 2px 32px rgba(0, 0, 0, 0.06) !important;

    &:nth-child(even) {
      @apply min-h-[405px];
    }

    &-img {
      @apply rounded-t-[15px] object-cover object-center w-full;
    }

    &-text {
      @apply p-4 md:(px-8 pb-8);

      h2 {
        @apply text-[20px] leading-[32px] text-center font-roboto font-bold text-blue-gray-800;
      }

      p {
        @apply w-full h-full pt-3 text-base text-center text-blue-gray-700 md:(text-sm);
      }
    }
  }
}
</style>
