<template>
  <div
    id="card"
  >
    <swiper
      ref="mySwiper"
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
            <div
              :class="{
                'card__text':true,
                'card__text--hover':isCardHovered(datas.id)
              }"
            >
              {{ datas.description }}
            </div>
            <div class="card__user">
              <img
                :src="datas.avatar"
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
      <div slot="pagination" class=" swiper-pagination" />
      <div slot="button-next" class="swiper-button-next navigation" />
      <div slot="button-prev" class="swiper-button-prev navigation" />
    </swiper>
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
        slidesPerView: 1,
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
            slidesPerView: 1.15,
            spaceBetween: 22
          },
          1024: {
            slidesPerView: 3
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
  @apply bg-white border-1 border-[#E3E7ED] rounded-2xl h-[196px] w-[378px]
  sm:(h-[182px] w-[495px])
  lg:(h-[222px] w-[276.33px]);

  &-hover {
    @apply bg-green-600;
  }
  &__container {
    @apply px-[36px] py-4;
  }
  &__text {
    @apply my-6 h-[60px] text-sm text-center text-gray-600 line-clamp-3
    sm:(h-[46px] leading-[23px] line-clamp-2)
    lg:(my-[12px] h-[110px] w-[220px] leading-[23px] line-clamp-4);

    &--hover{
      @apply text-white;
    }
  }
  &__user {
    @apply flex gap-[12px];

    &-profile {
      &-name {
        @apply text-gray-700 text-sm font-bold
        sm:(leading-[23px]);

        &--hover{
        @apply text-white font-bold;
        }
      }
      &-rule {
        @apply text-gray-500 text-xs leading-[19px];

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
  @apply hidden lg:(inline)
}
.swiper-container-horizontal > .swiper-pagination-bullets {
  position: relative;
  width: 100%;
  bottom: -32px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

}
.swiper-pagination-bullet {
  width: 13px;
  height: 13px;
  border: #069550 2px solid;
  margin-left: 8px;
  background: none;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background: #069550;
  width: 16px;
  height: 16px;
}
</style>
