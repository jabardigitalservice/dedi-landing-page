<template>
  <div id="develop-stage" class="develop-stage">
    <div class="wrapper">
      <div class="develop-stage__card">
        <div class="develop-stage__info">
          <h2 class="develop-stage__info-title">
            Tahapan Perkembangan Desa Digital
          </h2>
          <transition name="slide-fade-stage" mode="out-in">
            <h2 :key="content.tahap" class="develop-stage__info-subtitle">
              {{ content.tahap }}
            </h2>
          </transition>
          <transition name="slide-fade-stage" mode="out-in">
            <h3 :key="content.title" class="develop-stage__info-title-desc">
              {{ content.title }}
            </h3>
          </transition>
          <transition name="slide-fade-stage" mode="out-in">
            <p :key="content.desc" class="develop-stage__info-desc">
              {{ content.desc }}
            </p>
          </transition>
          <transition-group
            v-show="content.tahap === 'Desa Digital 4.0'"
            tag="div"
            class="develop-stage__info-thematic"
            name="slide-fade-stage"
            mode="out-in"
          >
            <p v-for="thematic in content.thematics" :key="thematic" class="develop-stage__info-desc develop-stage__info-desc--list">
              Desa Digital {{ thematic }}.
            </p>
          </transition-group>
          <div class="develop-stage__info-box-pagination">
            <div
              :class="{
                'develop-stage__info-btn-left': true,
                'develop-stage__info-btn-left--disabled': currIndex === 0
              }"
              @click="prevSlide"
            >
              <jds-icon
                :class="{
                  'develop-stage__info-arrow-left': true,
                  'develop-stage__info-arrow-left--disabled': currIndex === 0,
                }"
                size="20px"
                name="chevron-left"
              />
            </div>
            <div>
              <div
                v-for="(i, index) in contents.length"
                :key="i.name"
                :class="{
                  'develop-stage__info-pagination-dot': true,
                  'develop-stage__info-pagination-dot--active': currIndex === index,
                }"
              />
            </div>
            <div
              :class="{
                'develop-stage__info-btn-right': true,
                'develop-stage__info-btn-right--disabled': currIndex === (contents.length - 1)
              }"
              @click="nextSlide"
            >
              <jds-icon
                :class="{
                  'develop-stage__info-arrow-right': true,
                  'develop-stage__info-arrow-right--disabled': currIndex === (contents.length - 1),
                }"
                size="20px"
                name="chevron-right"
              />
            </div>
          </div>
        </div>
        <div class="develop-stage__pagination">
          <div
            :class="{
              'develop-stage__pagination-btn-left': true,
              'develop-stage__pagination-btn-left--disabled': currIndex === 0
            }"
            @click="prevSlide"
          >
            <jds-icon
              :class="{
                'develop-stage__pagination-icon-left': true,
                'develop-stage__pagination-icon-left--disabled': currIndex === 0
              }"
              size="12px"
              name="chevron-up"
            />
          </div>
          <div class="develop-stage__pagination-dots">
            <div
              v-for="(i, index) in contents.length"
              :key="i.tahap"
              :class="{
                'develop-stage__pagination-dot': true,
                'develop-stage__pagination-dot--active': index === currIndex,
              }"
            />
          </div>
          <div
            :class="{
              'develop-stage__pagination-btn-right': true,
              'develop-stage__pagination-btn-right--disabled': currIndex === (contents.length - 1),
            }"
            @click="nextSlide"
          >
            <jds-icon
              :class="{
                'develop-stage__pagination-icon-right': true,
                'develop-stage__pagination-icon-right--disabled': currIndex === (contents.length - 1),
              }"
              size="12px"
              name="chevron-down"
            />
          </div>
        </div>
        <div class="develop-stage__images">
          <transition name="slide-fade" mode="out-in">
            <div v-if="content.image" :key="content.tahap">
              <img class="develop-stage__image" :src="content.image" alt="Tahapan 1">
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DevelopmentStage',
  data () {
    return {
      currIndex: 0,
      content: {},
      contents: [
        {
          tahap: 'Desa Digital 1.0',
          title: 'Pembangunan Infrastruktur',
          desc: 'Menghadirkan Infrastruktur dasar penggunaan internet di 141 desa, bersama Diskominfo Jabar dan Lintasarta. Diantaranya dengan menyiapkan infrastruktur yang memadai untuk membangun konektivitas, baik melalui pembangunan VSAT, tower pemancar, ketersediaan akses jalan dan suplai listrik yang stabil juga diperlukan.',
          image: require('~/assets/images/about/tahap1.png')
        },
        {
          tahap: 'Desa Digital 2.0',
          title: 'Pelatihan Literasi Digital',
          desc: 'Melakukan sosialisasi terkait pemanfaatan internet sebagai langkah untuk meminimalisir dampak negatif dari digitalisasi.',
          image: require('~/assets/images/about/tahap2.png')
        },
        {
          tahap: 'Desa Digital 3.0',
          title: 'Pelatihan Pemasaran Digital',
          desc: 'Membangkitkan daya saing desa melalui pelatihan digital marketplace bagi pelaku Usaha Mikro Kecil Menengah (UMKM) dan Badan Usaha Milik Desa (BUMNDes).',
          image: require('~/assets/images/about/tahap3.png')
        },
        {
          tahap: 'Desa Digital 4.0',
          title: 'Implementasi Pemanfaatan Teknologi',
          desc: 'Meningkatkan produktifitas dan kemandirian masyarakat desa dengan meluncurkan ragam desa tematik sesuai dengan potensi desa. Tematik yang sudah berjalan diantaranya:',
          image: require('~/assets/images/about/tahap4.png'),
          thematics: [
            'Pertanian', 'Perikanan', 'Kesehatan', 'Pendidikan', 'Waste Management', 'Multimedia'
          ]
        }
      ]
    }
  },
  mounted () {
    this.content = this.contents[this.currIndex]
  },
  methods: {
    prevSlide () {
      if (this.currIndex > 0) {
        this.currIndex--
      }
      this.content = this.contents[this.currIndex]
    },
    nextSlide () {
      if (this.currIndex < this.contents.length - 1) { this.currIndex++ }
      this.content = this.contents[this.currIndex]
    }
  }
}
</script>

<style lang="postcss" scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-stage-enter-active {
  transition: all .3s ease;
}
.slide-fade-stage-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-stage-enter, .slide-fade-stage-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.develop-stage {
  @apply bg-[#FCFCFC] py-6 md:(py-[60px]);

  &__card {
    box-shadow: 0px 4px 28px rgba(0, 71, 41, 0.08);
    @apply font-serif font-bold bg-white rounded-[20px]
    flex justify-between items-center;
  }

  &__info {
    @apply py-6 px-4 w-full flex-1 xl:(p-[48px]);

    &-title {
      @apply text-blue-gray-800 font-bold text-[28px] leading-[42px] text-center
      xl:(text-[42px] leading-[60px] text-left);
    }

    &-subtitle {
      @apply mt-6 font-serif font-bold text-green-700 text-[24px] leading-[42px] text-center
      xl:(text-[28px] leading-[60px] text-left);
    }

    &-title-desc {
      @apply font-roboto text-blue-gray-500 text-center leading-[26px] mt-4 xl:(text-left);
    }

    &-thematic {
      @apply grid grid-cols-2 gap-2;
    }

    &-desc {
      @apply mt-3 font-sans font-normal text-blue-gray-400 leading-[26px] text-center xl:(text-left);

      &--list {
        @apply list-item list-inside list-decimal;
      }
    }

    &-box-pagination {
      @apply flex justify-between items-center mt-8 xl:(hidden);
    }

    &-pagination-dot {
      @apply float-left mr-[12px] w-3 h-3 rounded-full bg-gray-300 transition-all duration-300 ease-in-out;

      &--active {
        @apply w-[32px] cursor-auto bg-green-600;
      }
    }

    &-pagination-dot:last-child {
      @apply mr-[unset];
    }

    &-btn-left {
      @apply w-[42px] h-[42px] bg-green-700 rounded-full flex items-center justify-center cursor-pointer;

      &--disabled {
        @apply bg-gray-50;
      }
    }

    &-btn-right {
      @apply w-[42px] h-[42px] bg-green-700 rounded-full flex items-center justify-center cursor-pointer;

      &--disabled {
        @apply bg-gray-50;
      }
    }

    &-arrow-left {
      @apply text-white;

      &--disabled {
        @apply text-gray-500;
      }
    }

    &-arrow-right {
      @apply text-white;

      &--disabled {
        @apply text-gray-500;
      }
    }
  }

  &__pagination {
    @apply hidden xl:(block);

    &-dots {
      @apply flex items-center justify-between gap-3 flex-col py-[12px];
    }

    &-dot {
      @apply w-3 h-3 bg-gray-300 rounded-full transition-all duration-300 ease-in-out;

      &--active {
        @apply bg-green-700 h-8;
      }
    }

    &-icon-left {
      @apply text-white cursor-pointer;

      &--disabled {
        @apply text-gray-500
      }
    }

    &-icon-right {
      @apply text-white cursor-pointer;

      &--disabled {
        @apply text-gray-500
      }
    }

    &-btn-left {
      @apply w-6 h-6 rounded-full bg-green-700 flex justify-center items-center;

      &--disabled {
        @apply bg-gray-100;
      }
    }

    &-btn-right {
      @apply w-6 h-6 rounded-full bg-green-700 flex justify-center items-center;

      &--disabled {
        @apply bg-gray-100;
      }
    }
  }

  &__images {
    @apply hidden h-full min-w-[600px] xl:(block);
  }

  &__image {
    @apply rounded-r-[20px] object-cover w-full h-full;
  }
}
</style>
