<template>
  <div>
    <swiper
      v-if="!!(data.length)"
      ref="testimonials"
      :auto-update="true"
      :auto-destroy="true"
      :delete-instance-on-destroy="true"
      :cleanup-styles-on-destroy="true"
      :options="swiperOptions"
    >
      <swiper-slide
        v-for="item in data"
        :key="item.id"
      >
        <div id="hero-banner" class="hero-banner">
          <div class="hero-banner__main" :style="inlineStyleBackground(item.image.path)">
            <div class="relative px-4 sm:pl-[15.5%]">
              <div class="hero-banner__box-title">
                <h3 class="hero-banner__title">
                  Saatnya semua menikmati manfaat teknologi
                </h3>
              </div>
              <p class="hero-banner__desc">
                Bersama-sama, membuat desa lebih banyak kemajuan daripada yang kita bayangkan.
              </p>
              <div class="hero-banner__cta">
                <BaseButton class="hero-banner__cta-btn" label="Gabung Sekarang" @click="onClickCTA" />
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div slot="pagination" class="swiper-pagination navigation__wrapper" />
    </swiper>
    <div v-else id="hero-banner" class="hero-banner">
      <div class="hero-banner__main" :style="inlineStyleBackground">
        <div class="relative px-4 sm:pl-[15.5%]">
          <div class="hero-banner__box-title">
            <h3 class="hero-banner__title">
              Saatnya semua menikmati manfaat teknologi
            </h3>
          </div>
          <p class="hero-banner__desc">
            Bersama-sama, membuat desa lebih banyak kemajuan daripada yang kita bayangkan.
          </p>
          <div class="hero-banner__cta">
            <BaseButton class="hero-banner__cta-btn" label="Gabung Sekarang" @click="onClickCTA" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'HeroBanner',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      backgroundImage: 'HeroBanner.svg',
      data: [],
      swiperOptions: {
        slidesPerView: 'auto',
        paginationClickable: true,
        spaceBetween: 16,
        passiveListeners: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
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
      return this.$refs.testimonials.$swiper
    },
    bgImage () {
      return require(`~/assets/images/${this.backgroundImage}`)
    }
  },
  created () {
    this.getDataHeroBanner()
  },
  methods: {
    onClickCTA () {
      /**
       * Trigger open popup join desa digital
       */
      this.$emit('clickCTA', true)
    },
    async getDataHeroBanner () {
      const response = await this.$axios.get('/pages')
      const { data } = response.data
      if (Array.isArray(data) && data.length > 0) {
        this.data = data.filter(item => item.is_active)
      }
    },
    inlineStyleBackground (img) {
      console.log(img)
      if (img) {
        return { backgroundImage: `url(${img}` }
      } else {
        return { backgroundImage: `url(${this.bgImage})` }
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
.hero-banner {
  @apply relative h-[540px] sm:h-[590px];

  &__main {
    background-position-x: 30%;
    background-position-y: 100%;
    @apply bg-no-repeat bg-cover w-full h-full pt-[60px] relative;

    &::before {
      content: "";
      background-image: url('~/assets/images/MotifHeroBanner.png');
      background-size: calc(max(100%, 1440px)) auto;
      background-position-y: 100%;
      @apply bg-no-repeat w-full h-full absolute bottom-0 left-0;
    }
  }

  &__box-title {
    @apply mt-[22px] mb-2;
  }

  &__title {
    @apply text-[24px] leading-[30.72px]
    text-center font-serif font-bold text-blue-gray-700 max-w-3xl
    sm:(text-left text-[49px] leading-[62.72px]);
  }

  &__desc {
    @apply text-center font-sans text-blue-gray-400
    font-normal text-sm sm:(text-left leading-[23px]);
  }

  &__cta {
    @apply mt-6 sm:(mt-8);

    &-btn {
      @apply w-full active:(w-[calc(100%-2px)])
      sm:(w-auto active:(w-auto));
    }
  }
}

.swiper-container-horizontal > .swiper-pagination-bullets {
  @apply bottom-0 !important;
}

</style>
