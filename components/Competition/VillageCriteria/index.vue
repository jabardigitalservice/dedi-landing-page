<template>
  <div id="village-criteria" class="village">
    <div class="village-criteria">
      <div class="village-criteria__title">
        <h1>Kriteria Desa Yang Dapat Mengikuti</h1>
        <p>
          Desa yang bisa ikut serta dalam sayembara ini adalah desa yang masuk dalam kategori
          <strong class="text-white">Level 4.0</strong>
          dengan potensi pertanian dan perikanan sesuai ketentuan berikut:
        </p>
      </div>
      <div class="village-criteria__main">
        <div class="village-criteria__main--wrapper">
          <div class="village-criteria__main--wrapper-content">
            <div
              v-for="index in 3"
              :key="data[index-1].id"
              :class="{
                'col-span-1': index < 3,
                'col-span-2': index === 3
              }"
            >
              <div class="village-criteria__card">
                <img
                  :class="{
                    'village-criteria__card--img-md': index < 3,
                    'village-criteria__card--img-lg': index === 3
                  }"
                  height="136"
                  width="auto"
                  :src="data[index-1].img"
                  :alt="`Kriteria desa ${data[index-1].id}`"
                >
                <div class="village-criteria__card--desc">
                  {{ data[index-1].desc }}
                </div>
              </div>
            </div>
          </div>
          <div class="village-criteria__main--wrapper-content">
            <div
              v-for="index in 4"
              :key="data[index+2].id"
              class="col-span-1"
            >
              <div class="village-criteria__card">
                <img
                  class="village-criteria__card--img-md"
                  height="136"
                  width="auto"
                  :src="data[index+2].img"
                  :alt="`Kriteria desa ${data[index+2].id}`"
                >
                <div
                  :class="{
                    'village-criteria__card--desc': true,
                    'village-criteria__card--desc-lg': index > 2,
                  }"
                >
                  {{ data[index+2].desc }}
                </div>
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
.village {
  @apply w-full h-full bg-[#292742];

  &-criteria {
    @apply max-w-7xl mx-auto px-4 py-6 lg:(px-6 py-10) xl:(py-[120px]);

    &__title {
      h1 {
        @apply text-[40px] leading-normal
        text-center font-serif font-bold text-white;
      }

      p {
        @apply w-full h-full pt-8
        text-center text-blue-gray-100
      }
    }

    &__main {
      @apply pt-6 lg:(pt-[60px]);

      &--wrapper {
        @apply flex flex-col gap-[29px] md:(max-w-2xl mx-auto) lg:(grid-cols-1) xl:(grid grid-cols-2 max-w-[unset]);

        &-content {
          @apply flex flex-col gap-[29px] md:(grid grid-cols-2);
        }
      }
    }

    &__card {
      @apply bg-white rounded-[20px] w-full h-auto border-none;

      &--img {
        &-md {
          @apply w-full min-h-[136px] rounded-t-[20px] object-cover object-center border-none;
        }
        &-lg {
          @apply w-full min-h-[126px] rounded-t-[20px] object-cover object-center border-none;
        }
      }

      &--desc {
        @apply w-full h-full px-4 py-5 text-base text-left text-blue-gray-600;

        &-lg {
          @apply w-full h-full px-4 py-5 text-base text-left text-blue-gray-600 md:(h-[125px]);
        }
      }
    }
  }
}
</style>
