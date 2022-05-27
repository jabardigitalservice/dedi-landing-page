<template>
  <div id="village-criteria" class="village-criteria">
    <div class="village-criteria__title">
      <h1>Kriteria Desa Yang Dapat Mengikuti</h1>
      <p>
        Desa yang bisa ikut serta dalam sayembara ini adalah desa yang masuk dalam kategori
        <strong class="text-white">Desa Level 3</strong> dan <strong class="text-white">Level 4</strong>
        sesuai ketentuan berikut:
      </p>
    </div>
    <div class="village-criteria__main">
      <div class="village-criteria__main--wrapper">
        <div class="village-criteria__main--wrapper-content">
          <div v-for="index in 2" :key="data[index-1].id" class="col-span-1">
            <div class="card">
              <img class="card--img" height="136" :src="data[index-1].img" :alt="`Kriteria desa ${data[index-1].id}`">
              <div class="card--desc">
                {{ data[index-1].desc }}
              </div>
            </div>
          </div>
          <div class="col-span-2">
            <div class="card">
              <img class="card--img" height="126" :src="data[2].img" :alt="`Kriteria desa ${data[2].id}`">
              <div class="card--desc">
                {{ data[2].desc }}
              </div>
            </div>
          </div>
        </div>
        <div class="village-criteria__main--wrapper-content">
          <div v-for="index in 4" :key="data[index+2].id" class="col-span-1">
            <div class="card">
              <img class="card--img" height="136" :src="data[index+2].img" :alt="`Kriteria desa ${data[index+2].id}`">
              <div class="card--desc">
                {{ data[index+2].desc }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {
          id: 1,
          img: require('~/assets/images/competition/KriteriaDesa_1.svg'),
          desc: 'Adanya kelompok tani atau pembudidaya ikan yang memiliki unit usaha tertentu.'
        },
        {
          id: 2,
          img: require('~/assets/images/competition/KriteriaDesa_2.svg'),
          desc: 'Mendukung peningkatan potensi desa melalui inovasi teknologi digital.'
        },
        {
          id: 3,
          img: require('~/assets/images/competition/KriteriaDesa_5.svg'),
          desc: 'Memiliki pegiat TIK, Pandu Desa, Patriot Desa, dan local champion untuk membantu sosialisasi, pengawasan, dan evaluasi program.'
        },
        {
          id: 4,
          img: require('~/assets/images/competition/KriteriaDesa_3.svg'),
          desc: 'Desa anda memiliki akses internet.'
        },
        {
          id: 5,
          img: require('~/assets/images/competition/KriteriaDesa_4.svg'),
          desc: 'Desa anda memiliki BUMDes aktif.'
        },
        {
          id: 6,
          img: require('~/assets/images/competition/KriteriaDesa_6.svg'),
          desc: 'Pemerintah desa siap menjadi fasilitator untuk kegiatan Desa Digital.'
        },
        {
          id: 7,
          img: require('~/assets/images/competition/KriteriaDesa_7.svg'),
          desc: 'Adanya keterlibatan Organisasi Perangkat Daerah (OPD) terkait proses keberlanjutan program.'
        }
      ]
    }
  }
}
</script>

<style lang="postcss">
.village-criteria {
  @apply w-full h-full bg-[#292742] px-4 py-6 md:(px-6 py-10) lg:(py-[120px]);

  &__title {
    h1 {
      @apply text-[40px] leading-auto
      text-center font-serif font-bold text-white;
    }

    p {
      @apply w-full h-full pt-8
      text-center text-blue-gray-100
    }
  }

  &__main {
    @apply pt-6 md:(pt-[60px]);

    &--wrapper {
      @apply flex flex-col gap-[29px] md:(grid-cols-1) lg:(grid grid-cols-2);

      &-content {
        @apply flex flex-col gap-[29px] md:(grid grid-cols-2);
      }
    }
  }
}

.card {
  @apply bg-white rounded-[20px] w-full h-auto border-none !important;

  &--img {
    border-radius: 20px 20px 0 0;
  }

  &--desc {
    @apply w-full h-full px-4 py-5
    text-sm text-left text-gray-800;
  }
}
</style>
