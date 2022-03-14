<template>
  <div id="achievement">
    <div class="achievement__main-intro">
      <p>Kami telah mendapatkan berbagai penghargaan dari:</p>
      <div class="achievement__main-intro-nav">
        <CardAchievementSwiper :data="contents" />
      </div>
    </div>

    <div class="achievement__main-cards">
      <swiper
        ref="mySwiper"
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
      <CardAchievementSwiper :data="contents" :is-show-pagination="true" />
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data () {
    return {
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
        paginationClickable: true,
        spaceBetween: 32,
        passiveListeners: true,
        navigation: {
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: false
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
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted () {
    this.swiper.slideTo(0, 1000, false)
  }
}
</script>

<style lang="postcss">
  .swiper-wrapper {
    @apply !pb-6;
  }

  .swiper-slide {
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
</style>
