<template>
  <div class="info-village">
    <div class="info-village__card">
      <div class="info-village__info">
        <h2 class="info-village__info-title">
          Tahapan Perkembangan Desa Digital
        </h2>
        <transition name="slide-fade-stage" mode="out-in">
          <h2 :key="content.stage" class="info-village__info-subtitle">
            {{ content.stage }}
          </h2>
        </transition>
        <transition name="slide-fade-stage" mode="out-in">
          <h3 :key="content.title" class="info-village__info-title-desc">
            {{ content.title }}
          </h3>
        </transition>
        <transition name="slide-fade-stage" mode="out-in">
          <p :key="content.desc" class="info-village__info-desc">
            {{ content.desc }}
          </p>
        </transition>
        <div class="info-village__info-box-pagination">
          <div
            :class="{
              'info-village__info-btn-left': true,
              'info-village__info-btn-left--disabled': currIndex === 0
            }"
            @click="prevSlide"
          >
            <jds-icon
              :class="{
                'info-village__info-arrow-left': true,
                'info-village__info-arrow-left--disabled': currIndex === 0,
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
                'info-village__info-pagination-dot': true,
                'info-village__info-pagination-dot--active': currIndex === index,
              }"
            />
          </div>
          <div
            :class="{
              'info-village__info-btn-right': true,
              'info-village__info-btn-right--disabled': currIndex === (contents.length - 1)
            }"
            @click="nextSlide"
          >
            <jds-icon
              :class="{
                'info-village__info-arrow-right': true,
                'info-village__info-arrow-right--disabled': currIndex === (contents.length - 1),
              }"
              size="20px"
              name="chevron-right"
            />
          </div>
        </div>
      </div>
      <div class="info-village__pagination">
        <div
          :class="{
            'info-village__pagination-btn-left': true,
            'info-village__pagination-btn-left--disabled': currIndex === 0
          }"
          @click="prevSlide"
        >
          <jds-icon
            :class="{
              'info-village__pagination-icon-left': true,
              'info-village__pagination-icon-left--disabled': currIndex === 0
            }"
            size="12px"
            name="chevron-up"
          />
        </div>
        <div class="info-village__pagination-dots">
          <div
            v-for="(i, index) in contents.length"
            :key="i.tahap"
            :class="{
              'info-village__pagination-dot': true,
              'info-village__pagination-dot--active': index === currIndex,
            }"
          />
        </div>
        <div
          :class="{
            'info-village__pagination-btn-right': true,
            'info-village__pagination-btn-right--disabled': currIndex === (contents.length - 1),
          }"
          @click="nextSlide"
        >
          <jds-icon
            :class="{
              'info-village__pagination-icon-right': true,
              'info-village__pagination-icon-right--disabled': currIndex === (contents.length - 1),
            }"
            size="12px"
            name="chevron-down"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currIndex: 0,
      content: {},
      contents: [
        {
          stage: 'Desa Digital 1.0',
          title: 'Pembangunan Infrastruktur',
          desc: 'Menghadirkan Infrastruktur dasar penggunaan internet di 141 desa, bersama Diskominfo Jabar dan Lintasarta. Diantaranya dengan menyiapkan infrastruktur yang memadai untuk membangun konektivitas, baik melalui pembangunan VSAT, tower pemancar, ketersediaan akses jalan dan suplai listrik yang stabil juga diperlukan.'
        },
        {
          stage: 'Desa Digital 2.0',
          title: 'Pelatihan Literasi Digital',
          desc: 'Melakukan sosialisasi terkait pemanfaatan internet sebagai langkah untuk meminimalisir dampak negatif dari digitalisasi.'
        },
        {
          stage: 'Desa Digital 3.0',
          title: 'Pelatihan Pemasaran Digital',
          desc: 'Membangkitkan daya saing desa melalui pelatihan digital marketplace bagi pelaku Usaha Mikro Kecil Menengah (UMKM) dan Badan Usaha Milik Desa (BUMNDes).'
        },
        {
          stage: 'Desa Digital 4.0',
          title: 'Implementasi Pemanfaatan Teknologi',
          desc: 'Meningkatkan produktifitas dan kemandirian masyarakat desa dengan meluncurkan ragam desa tematik sesuai dengan potensi desa. Tematik yang sudah berjalan diantaranya:',
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
    },
    onClose () {
      this.$emit('onCloseModal', false)
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
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-stage-enter-active {
  transition: all .3s ease;
}
.slide-fade-stage-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-stage-enter, .slide-fade-stage-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.info-village {
  @apply sm:(mx-auto);

  &__card {
    box-shadow: 0px 4px 28px rgba(0, 71, 41, 0.08);
    @apply font-serif font-bold bg-white rounded-[20px]
    flex justify-between items-center;
  }

  &__info {
    @apply py-6 px-4 w-full flex-1 sm:(p-[48px]);

    &-title {
      @apply text-blue-gray-800 font-bold text-[28px] leading-[42px] text-center
      sm:(text-[42px] leading-[60px] text-left);
    }

    &-subtitle {
      @apply mt-6 font-serif font-bold text-green-700 text-[24px] leading-[42px] text-center
      sm:(text-[28px] leading-[60px] text-left);
    }

    &-title-desc {
      @apply font-roboto text-blue-gray-500 text-center leading-[26px] mt-4 sm:(text-left);
    }

    &-desc {
      @apply mt-3 font-sans font-normal text-blue-gray-400 leading-[26px] text-center sm:(text-left);
    }

    &-box-pagination {
      @apply flex justify-between items-center mt-8 sm:(hidden);
    }

    &-pagination-dot {
      @apply float-left mr-[20px] w-3 h-3 rounded-full bg-gray-300 transition-all duration-300 ease-in-out;

      &--active {
        @apply w-[44px] cursor-auto bg-green-600;
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
    @apply hidden sm:(block self-end pb-[48px] px-2);

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
}
</style>
