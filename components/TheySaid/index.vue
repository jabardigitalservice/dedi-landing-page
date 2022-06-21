<template>
  <div id="they-said" class="they-said">
    <div class="wrapper">
      <div class="they-said__wrapper">
        <div class="they-said__box">
          <div class="they-said__info">
            <img src="~/assets/images/about/Petik2.svg" alt="Petik 2">
            <div class="mt-4">
              <h2 class="they-said__info-title">
                Kata Mereka
              </h2>
              <h2 class="they-said__info-title">
                yang Ada di Balik Layar
              </h2>
            </div>
            <div class="mt-10">
              <transition name="slide-fade" mode="out-in">
                <div :key="content.name" class="they-said__info-name">
                  {{ content.name }}
                </div>
              </transition>
              <transition name="slide-fade" mode="out-in">
                <div :key="content.name" class="they-said__info-role">
                  {{ content.role }}
                </div>
              </transition>
            </div>
            <transition name="slide-fade" mode="out-in">
              <div :key="content.name" class="they-said__info-feedback">
                {{ content.feedback }}
              </div>
            </transition>
            <div class="they-said__info-box-pagination">
              <div
                :class="{
                  'they-said__info-btn-left': true,
                  'they-said__info-btn-left--disabled': currIndex === 0
                }"
                @click="prevSlide"
              >
                <jds-icon
                  :class="{
                    'they-said__info-arrow-left': true,
                    'they-said__info-arrow-left--disabled': currIndex === 0,
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
                    'they-said__info-pagination-dot': true,
                    'they-said__info-pagination-dot--active': currIndex === index,
                  }"
                />
              </div>
              <div
                :class="{
                  'they-said__info-btn-right': true,
                  'they-said__info-btn-right--disabled': currIndex === (contents.length - 1)
                }"
                @click="nextSlide"
              >
                <jds-icon
                  :class="{
                    'they-said__info-arrow-right': true,
                    'they-said__info-arrow-right--disabled': currIndex === (contents.length - 1),
                  }"
                  size="20px"
                  name="chevron-right"
                />
              </div>
            </div>
          </div>
          <div class="they-said__slides">
            <div class="they-said__slides-images">
              <transition name="slide-fade" mode="out-in">
                <div :key="content.image">
                  <img class="they-said__slides-image" :src="content.image" :alt="content.name">
                </div>
              </transition>
            </div>
            <div
              :class="{
                'they-said__slides-btn-left': true,
                'they-said__slides-btn-left--disabled': currIndex === 0
              }"
              @click="prevSlide"
            >
              <jds-icon
                :class="{
                  'they-said__slides-arrow-left': true,
                  'they-said__slides-arrow-left--disabled': currIndex === 0,
                }"
                size="20px"
                name="chevron-left"
              />
            </div>
            <div
              :class="{
                'they-said__slides-btn-right': true,
                'they-said__slides-btn-right--disabled': currIndex === (contents.length - 1)
              }"
              @click="nextSlide"
            >
              <jds-icon
                :class="{
                  'they-said__slides-arrow-right': true,
                  'they-said__slides-arrow-right--disabled': currIndex === (contents.length - 1),
                }"
                size="20px"
                name="chevron-right"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheySaid',
  data () {
    return {
      currIndex: 0,
      content: {},
      contents: [
        {
          name: 'Gumilar',
          role: 'Kepala Seksi Layanan Digital dan Informasi Jabar Digital Service',
          feedback: 'Dengan digitalisasi, semoga kesejahteraan masyarakat desa dapat meningkat, kapasitas masyarakat dapat berkembang, dan potensi desa tumbuh dengan maksimal.',
          image: require('~/assets/images/about/Gumilar.png')
        },
        {
          name: 'Rizi Advista Permana',
          role: 'Project Officer Jabar Digital Service',
          feedback: 'Semoga kesejahteraan masyarakat dapat tercapai dan Desa Digital bisa menjadi acuan bagi instansi lain yang ingin menerapkan program serupa.',
          image: require('~/assets/images/about/rizi.png')
        },
        {
          name: 'Cynditia Fitriani Rahardjo',
          role: 'Project Officer Jabar Digital Service',
          feedback: 'Desa Digital adalah desa yang bisa memanfaatkan teknologi untuk meningkatkan produktivitas dan kesejahteraan masyarakatnya secara mandiri.',
          image: require('~/assets/images/about/cindy.png')
        },
        {
          name: 'Jimy Candra Gunawan',
          role: 'Project Officer Jabar Digital Service',
          feedback: 'Desa Digital diharapkan mampu menjadi katalisator untuk transformasi digital di pedesaan serta mendorong kolaborasi multi-stakeholder guna mewujudkan desa yang mandiri dan berkelanjutan.',
          image: require('~/assets/images/about/Jimy.png')
        }
      ]
    }
  },
  mounted () {
    // assign first content
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
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.they-said {
  @apply bg-white py-6 lg:(py-[56px]) xl:(py-[80px]);

  &__wrapper {
    @apply rounded-4xl bg-[#222F3E] max-w-[1280px] p-6 lg:(p-[40px]) xl:(py-[56px] px-[60px]);
  }

  &__box {
    @apply flex items-center justify-between flex-col lg:(flex-row gap-6);
  }

  &__info {
    @apply xl:(w-[569px]);

    &-title {
      @apply font-bold font-serif text-white text-[38px] leading-[56px];
    }

    &-name {
      @apply text-white font-bold text-[18px] leading-[26px];
    }

    &-role {
      @apply text-blue-gray-200 text-[14] leading-[23px];
    }

    &-feedback {
      @apply mt-8 text-blue-gray-50 leading-[26px];
    }

    &-box-pagination {
      @apply flex justify-between items-center mt-8 lg:(hidden);
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
      @apply w-[60px] h-[60px] bg-green-700 rounded-full flex items-center justify-center cursor-pointer;

      &--disabled {
        @apply bg-gray-50;
      }
    }

    &-btn-right {
      @apply w-[60px] h-[60px] bg-green-700 rounded-full flex items-center justify-center cursor-pointer;

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

  &__slides {
    @apply min-w-[431px] justify-center items-center relative
    hidden lg:(flex);

    &-btn-left {
      @apply w-[60px] h-[60px] bg-green-700 rounded-full absolute left-0 flex items-center justify-center cursor-pointer;

      &--disabled {
        @apply bg-gray-50;
      }
    }

    &-btn-right {
      @apply w-[60px] h-[60px] bg-green-700 rounded-full absolute right-0 flex items-center justify-center cursor-pointer;

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

    &-images {
      @apply w-[371px] h-[437px] bg-[#C3D6D0] rounded-3xl;
    }

    &-image {
      @apply select-none w-[371px] h-[437px] rounded-3xl;
    }
  }

}
</style>
