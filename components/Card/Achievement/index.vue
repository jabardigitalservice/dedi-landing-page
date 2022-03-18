<template>
  <div id="achievement">
    <div class="achievement__main-intro">
      <p>Kami telah mendapatkan berbagai penghargaan dari:</p>
      <div class="achievement__main-intro-nav">
        <div class="achievement-nav">
          <button slot="button-prev" class="swiper-prev-achievement">
            <jds-icon
              :class="{
                'button-left' : true,
                'button-left--disabled': currIndex === 0
              }"
              size="16px"
              name="chevron-left"
              @click="prevNav"
            />
          </button>
          <div v-if="!isShowPagination" slot="pagination" class="swiper-pagination" />
          <button slot="button-next" class="swiper-next-achievement">
            <jds-icon
              :class="{
                'button-right' : true,
                'button-right--disabled': currIndex === (contents.length - 1)
              }"
              size="16px"
              name="chevron-right"
              @click="nextNav"
            />
          </button>
        </div>
      </div>
    </div>

    <div class="achievement__main-cards">
      <swiper
        ref="achievement"
        :auto-update="true"
        :auto-destroy="true"
        :delete-instance-on-destroy="true"
        :cleanup-styles-on-destroy="true"
        :options="swiperOptions"
      >
        <swiper-slide
          v-for="content in contents"
          :key="content.id"
        >
          <div class="achievement__main-cards__card">
            <div class="achievement__main-cards__card-content">
              <img
                width="85"
                height="85"
                :src="content.img"
                :alt="`Achievement ${content.id}`"
              >
              <div class="achievement__main-cards__card-content-desc">
                <div class="achievement__main-cards__card-content-desc-title">
                  {{ content.title }}
                </div>
                <div class="achievement__main-cards__card-content-desc-subtitle">
                  {{ content.subtitle }}
                </div>
                <div class="achievement__main-cards__card-content-desc-text">
                  {{ content.desc }}
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <div class="achievement__main-outro-nav">
      <div class="achievement-nav">
        <button slot="button-prev" class="swiper-prev-achievement">
          <jds-icon
            :class="{
              'button-left' : true,
              'button-left--disabled': currIndex === 0
            }"
            size="16px"
            name="chevron-left"
            @click="prevNav"
          />
        </button>
        <div v-if="isShowPagination" slot="pagination" class="swiper-pagination" />
        <button slot="button-next" class="swiper-next-achievement">
          <jds-icon
            :class="{
              'button-right' : true,
              'button-right--disabled': currIndex === (contents.length - 1)
            }"
            size="16px"
            name="chevron-right"
            @click="nextNav"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      currIndex: 0,
      isShowPagination: true,
      contents: [
        {
          id: 1,
          img: require('~/assets/images/about/Logo_IDC.png'),
          title: 'DX Leader',
          subtitle: 'IDX Digital Transformation Award 2019',
          desc: 'Gubernur Ridwan Kamil berhasil menerapkan teknologi digital sebagai solusi dalam mengatasi permasalahan di masyarakat.'
        },
        {
          id: 2,
          img: require('~/assets/images/about/Logo_GovInsider.png'),
          title: 'Best Adaptation for Digital Village Program',
          subtitle: 'GovInsider Digital Innovation Award 2019',
          desc: 'Desa Digital menjadi program terbaik dalam adaptasi pemanfaatan teknologi untuk misi peningkatan kualitas hidup masyarakat desa.'
        },
        {
          id: 3,
          img: require('~/assets/images/about/Logo_OpenGov.png'),
          title: 'Recognition Of Excellence',
          subtitle: 'OpenGov 2019',
          desc: 'Desa Digital mendapatkan apresiasi atas kinerja pemerintahan dinilai unggul, khususnya dalam melakukan inovasi digital di desa.'
        },
        {
          id: 4,
          img: require('~/assets/images/about/Logo_IDC_Asia.png'),
          title: 'Digital Equity and Accessibility',
          subtitle: 'IDC Smart City Asia Pacific Awards 2020',
          desc: 'Program ini diakui mampu mengembangkan konsep Kota Cerdas terbaik se-Asia Pasifik.'
        }
      ],
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween: 32,
        passiveListeners: true,
        navigation: {
          nextEl: '.swiper-next-achievement',
          prevEl: '.swiper-prev-achievement'
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets'
        },
        breakpoints: {
          640: {
            spaceBetween: 22
          },
          1280: {
            spaceBetween: 16
          }
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.achievement.$swiper
    }
  },
  methods: {
    prevNav () {
      if (this.currIndex > 0) {
        this.currIndex--
      }
    },
    nextNav () {
      if (this.currIndex < this.contents.length - 1) {
        this.currIndex++
      }
    }
  }
}
</script>

<style lang="postcss">
  .swiper-wrapper {
    @apply !pb-6;
  }

  #achievement .swiper-slide {
    @apply sm:(w-[495px]) xl:(w-[unset])
  }

  .achievement__main {
    &-intro {
      @apply flex flex-col items-center justify-between
      md: (flex-row);

      p {
        @apply w-full h-full pt-4 text-center text-blue-gray-500
        md: (pt-6 text-left);
      }

      &-nav {
        @apply hidden md: (flex);
      }
    }

    &-outro-nav {
      @apply w-full flex sm: (hidden);
    }

    &-cards {
      @apply w-full h-full relative items-center justify-center pt-6 gap-8
      md: (pt-8);

      &__card {
        border-radius: 0.75rem 0.75rem 0 0;
        box-shadow: 0px 4px 24px rgba(0, 92, 54, 0.06) !important;
        @apply bg-white rounded-2xl w-auto h-auto select-none
        md: (w-[492px] h-[170px]);

        &-content {
          @apply w-full h-full flex flex-col p-[20px]
          md: (flex-row );

          img {
            @apply w-full h-full m-4 block w-[60px] h-[60px]
              md: (w-[85px] h-[85px] m-0);
          }

          &-desc {
            @apply w-full h-full pl-6;

            &-title {
              @apply text-[16px] font-roboto font-bold text-blue-gray-800;
            }

            &-subtitle {
              @apply text-[16px] pt-1 font-roboto font-medium text-blue-gray-800;
            }

            &-text {
              @apply w-full h-full pt-2 text-sm text-left text-blue-gray-700;
            }
          }
        }
      }
    }
  }

  .achievement-nav {
    @apply w-full h-full flex flex-row pt-6 gap-8 justify-center;

    .button-left, .button-right {
      @apply w-[42px] h-[42px] bg-green-700 text-white font-light rounded-full
      flex items-center justify-center cursor-pointer;

      &--disabled {
        @apply bg-gray-100 text-gray-400;
      }
    }

    .swiper-pagination {
      @apply relative flex flex-row items-center justify-center !important;

      &-bullet {
        @apply w-3 h-3 bg-gray-300 border-0 transition-all duration-300 !important;

        &-active {
          @apply w-8 h-3 bg-green-600 border-0 rounded-md !important;
        }
      }
    }
  }
</style>
