<template>
  <div>
    <swiper
      id="hero-banner"
      ref="heroBanner"
      :auto-update="true"
      :auto-destroy="true"
      :delete-instance-on-destroy="true"
      :cleanup-styles-on-destroy="true"
      :options="swiperOptions"
      :class="{
        'hero' : swiperOptions.pagination.el,
        'hero-full': !swiperOptions.pagination.el
      }"
      @click.native="slideClicked(swiper.activeIndex, $event)"
    >
      <swiper-slide
        v-for="item in data"
        :key="item.id"
      >
        <div class="hero-banner">
          <div
            class="hero-banner__main"
            :style="inlineStyleBackground(item.image.path)"
          >
            <!-- Temporary hide this section for next feature -->
            <div v-show="false" class="relative px-4 sm:pl-[15.5%]">
              <div class="hero-banner__box-title">
                <h3 class="hero-banner__title">
                  {{ item.title || '' }}
                </h3>
              </div>
              <p class="hero-banner__desc">
                {{ item.description || '' }}
              </p>
              <div class="hero-banner__cta">
                <BaseButton class="hero-banner__cta-btn" label="Gabung Sekarang" @click="onClickBanner(item.link)" />
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div
        slot="pagination"
        :class="{
          'swiper-pagination-banner z-20': true,
          'disabled': !swiperOptions.pagination.el
        }"
      />
    </swiper>
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
      data: [
        {
          id: 0,
          title: 'Saatnya semua menikmati manfaat teknologi',
          description: 'Bersama-sama, membuat desa lebih banyak kemajuan daripada yang kita bayangkan.',
          link: 'defaultLink',
          is_active: false,
          order: 1,
          image: {
            path: 'defaultImg',
            original_name: 'HeroBanner.svg'
          }
        }
      ],
      swiperOptions: {
        slidesPerView: 'auto',
        paginationClickable: true,
        spaceBetween: 16,
        passiveListeners: true,
        pagination: {
          el: '.swiper-pagination-banner',
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
      },
      query: {
        is_active: true,
        sort_by: 'asc',
        order_by: 'order'
      },
      slideLink: 'defaultLink'
    }
  },
  computed: {
    swiper () {
      return this.$refs.heroBanner.$swiper
    },
    defaultBgImage () {
      return require('~/assets/images/HeroBanner_withContext.svg')
    }
  },
  mounted () {
    this.getDataHeroBanner()
  },
  methods: {
    slideClicked (index, event) {
      // find link by active index slide
      const currentSlideData = this.data.filter((el, idx) => idx === index)
      this.slideLink = currentSlideData[0].link

      // only banner area that clickable
      const findArea = Array.from(event.target.classList).findIndex(element => element === 'swiper-container')
      if (findArea > -1) {
        this.onClickBanner(this.slideLink)
      }
    },
    onClickCTA () {
      /**
       * Trigger open popup join desa digital
       */
      this.$emit('clickCTA', true)
    },
    handleData () {
      if (this.data.length <= 1) {
        this.swiperOptions.pagination.el = null
      } else {
        this.swiperOptions.pagination.el = '.swiper-pagination-banner'
      }
    },
    async getDataHeroBanner () {
      const response = await this.$axios.get('/pages', { params: this.query })
      const { data } = response.data
      this.data.push(...data)
      this.handleData()
    },
    inlineStyleBackground (img) {
      if (img && img.startsWith('http')) {
        return { backgroundImage: `url(${img}` }
      } else if (img && img === 'defaultImg') {
        return { backgroundImage: `url(${this.defaultBgImage})` }
      } else {
        return ''
      }
    },
    onClickBanner (link) {
      if (link && link.startsWith('http')) {
        window.open(link, '_blank')
      } else if (link && link === 'defaultLink') {
        this.onClickCTA()
      }
    }
  }
}
</script>

<style lang="postcss">
.hero {
  @apply relative w-full h-full;

  &::before {
    @apply bg-no-repeat bg-center w-full h-full absolute bottom-0 left-0 z-10 cursor-pointer;
    content: "";
    background-image: url('~/assets/images/MotifHeroBanner.png');
    background-size: calc(max(100%, 1440px)) auto;
    background-position-y: 94%;
  }

  &-full::before {
      @apply bg-no-repeat bg-center w-full h-full absolute bottom-0 left-0 z-10 cursor-pointer;
      content: "";
      background-image: url('~/assets/images/MotifHeroBanner.png');
      background-size: calc(max(100%, 1440px)) auto;
      background-position-y: 100%;
    }
}
.hero-banner {
  @apply w-full h-[540px] sm:h-[640px];

  &__main {
    @apply bg-no-repeat bg-cover w-full h-full pt-[60px] relative;
    background-position-x: 10%;
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

.swiper-pagination-banner.disabled {
  display: none !important;
}
</style>
