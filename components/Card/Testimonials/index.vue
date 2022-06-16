<template>
  <div
    id="card"
    class="relative"
  >
    <swiper
      ref="testimonials"
      :auto-update="true"
      :auto-destroy="true"
      :delete-instance-on-destroy="true"
      :cleanup-styles-on-destroy="true"
      :options="swiperOptions"
    >
      <swiper-slide
        v-for="datas in testimonials"
        :key="datas.id"
      >
        <div
          :class="{
            'card':true,
            'card-hover':isCardHovered(datas.id)
          }"
          @mouseover="onHover(datas.id)"
          @mouseleave="onHover(null)"
        >
          <div class="card__container">
            <img
              v-if="isCardHovered(datas.id)"
              :src="quoteWhite"
              alt="Quote Icon"
            >
            <img
              v-else
              :src="quoteGreen"
              alt="Quote Icon"
            >
            <div class="card__text-container">
              <div
                :class="{
                  'card__text':true,
                  'card__text--hover':isCardHovered(datas.id)
                }"
              >
                {{ datas.description }}
              </div>
            </div>
            <div class="card__user">
              <img
                :src="datas.avatar.path"
                alt="ava-image"
                class="card__user-img"
              >
              <div class="card__user-profile">
                <div
                  :class="{
                    'card__user-profile-name':true,
                    'card__user-profile-name--hover':isCardHovered(datas.id)
                  }"
                >
                  {{ datas.name }}
                </div>
                <div
                  :class="{
                    'card__user-profile-rule':true,
                    'card__user-profile-rule--hover':isCardHovered(datas.id)
                  }"
                >
                  {{ datas.type }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div slot="pagination" class="swiper-pagination navigation__wrapper mt-8" />
      <button slot="button-next" class="navigation navigation__wrapper swiper-button-next">
        <jds-icon class="navigation__button-right" size="16px" name="chevron-right" />
      </button>
      <button slot="button-prev" class="navigation navigation__wrapper swiper-button-prev">
        <jds-icon class="navigation__button-left" size="16px" name="chevron-left" />
      </button>
    </swiper>
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
  props: {
    testimonials: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      quoteGreen: require('~/assets/icons/QuoteGreen.svg'),
      quoteWhite: require('~/assets/icons/QuoteWhite.svg'),
      hovered: null,
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
    }
  },
  methods: {
    onHover (value) {
      this.hovered = value
    },
    isCardHovered (id) {
      return this.hovered === id
    }
  }
}
</script>

<style lang="postcss">
.card {
  @apply bg-white border-1 border-[#E3E7ED] rounded-2xl h-[196px] w-full
  sm:(h-[182px] w-[495px])
  xl:(h-[222px] w-[276px]);

  &-hover {
    @apply bg-green-600;
  }
  &__container {
    @apply px-[36px] py-4 xl:(px-[32px]);
  }
  &__text {
    @apply mt-6 text-sm text-center text-blue-gray-700 line-clamp-3
    sm:(leading-[23px] line-clamp-2)
    xl:(mt-[12px] max-h-[92px] leading-[23px] line-clamp-4);

    &-container{
      @apply h-[60px]
      sm:(h-[46px])
      xl:(h-[110px]);
    }
    &--hover{
      @apply text-white;
    }
  }
  &__user {
    @apply flex gap-[12px] mt-6 overflow-hidden overflow-ellipsis whitespace-nowrap
    xl:(mt-12px);

    &-profile {
      &-name {
        @apply text-blue-gray-700 text-sm font-bold
        sm:(leading-[23px]);

        &--hover{
        @apply text-white font-bold;
        }
      }
      &-rule {
        @apply text-blue-gray-500 text-xs text-left leading-[19px];

        &--hover {
        @apply text-green-50;
        }
      }
    }
    &-img {
      @apply h-[42px] w-[42px] rounded-[40px]
    }
  }
}

.navigation{
  @apply !hidden !xl:(inline)
}

.navigation__wrapper{
  @apply !hidden !xl:(inline mt-8)
}

.navigation__button-right, .navigation__button-left{
  @apply !w-[42px] !h-[42px] !rounded-1/2 !bg-green-700 !text-white
}

#card .swiper-slide {
  @apply sm:(w-[495px]) xl:(w-[286px])
}

.swiper-wrapper {
  @apply !w-full;
}

.swiper-container-horizontal > .swiper-pagination-bullets {
  position: relative !important;
  width: 100% !important;
  @apply xl:(bottom-[-20px]) !important;
  margin-bottom: 32px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;

}

.swiper-pagination-bullet {
  width: 13px !important;
  height: 13px !important;
  border: #069550 2px solid !important;
  margin-left: 8px !important;
  background: none !important;
  opacity: 1 !important;
}

.swiper-pagination-bullet-active {
  background: #069550 !important;
  width: 16px !important;
  height: 16px !important;
}

.swiper-button-prev {
  left: 0 !important;
}

.swiper-button-next {
  right: 0 !important;
}

.swiper-button-prev,
.swiper-button-next {
  position: absolute !important;
  top: unset !important;
  bottom: 0 !important;
  width: unset !important;
  height: unset !important;
  margin-top: unset !important;
}

.swiper-button-prev.swiper-button-disabled .navigation__button-left,
.swiper-button-next.swiper-button-disabled .navigation__button-right{
  color: #BDBDBD !important;
  background: #F5F5F5 !important;
  cursor: auto !important;
  pointer-events: none !important;
}

.swiper-button-prev.swiper-button-disabled,.swiper-button-next.swiper-button-disabled {
  opacity: 1 !important;
}

.swiper-button-prev:after,
.swiper-button-next:after {
  display: none !important;
}
</style>
