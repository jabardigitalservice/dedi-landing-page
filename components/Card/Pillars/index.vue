<template>
  <div
    id="card"
    class="content"
  >
    <div v-for="content in contents" :key="content.id" class="card">
      <img :src="content.img" :alt="`Pillar ${content.id}`">
      <h2>{{ content.title }}</h2>
      <p>{{ content.desc }}</p>
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
    @apply bg-white rounded-2xl h-[382px] w-[320px] !important;
    box-shadow: 0px 2px 32px rgba(0, 0, 0, 0.06) !important;

    &:nth-child(even) {
      @apply h-[405px] !important;
    }

    img {
      @apply rounded-t-[15px] bg-cover bg-center;
    }

    h2 {
      @apply text-[20px] leading-[34px] pt-3
      text-center font-roboto font-bold text-blue-gray-800
    }

    p {
      @apply w-full h-full pt-3 px-8
      text-sm text-center text-blue-gray-700
    }
  }
}
</style>
