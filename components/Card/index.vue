<template>
  <div
    id="card"
  >
    <swiper
      ref="mySwiper"
      :options="swiperOptions"
    >
      <swiper-slide v-for="datas in testimonials" :key="datas.id">
        <div
          class="card"
          @mouseover="onHover(datas.id)"
          @mouseleave="onHover(null)"
        >
          <img v-if="isCardHovered(datas.id)" :src="quoteWhite" alt="Quote Icon">
          <img v-else :src="quoteGreen" alt="Quote Icon">
          <div
            :class="{
              'card__text':true,
              'card__text--hover':isCardHovered(datas.id)
            }"
          >
            {{ datas.description }}
          </div>
          <div class="card__user mt-6">
            <img :src="datas.avatar" alt="ava-image">
            <div class="card__user-profile">
              <div
                :class="{
                  'card__user-profile-name':true,
                  'card__user-profile-name--hover':isCardHovered(datas.id)
                }"
              >
                {{ datas.name }}
              </div>
              <div :class="{'card__user-profile-rule':true, 'card__user-profile-rule--hover':isCardHovered(datas.id)}">
                {{ datas.type }}
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div slot="pagination" class="swiper-pagination" />
      <div slot="button-next" class="swiper-button-next" />
      <div slot="button-prev" class="swiper-button-prev" />
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
        centeredSlides: true,
        autoplay: 5000,
        loop: false,
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        keyboardControl: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
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
    this.swiper.slideTo(3, 1000, false)
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
  @apply bg-white border-1 border-[#E3E7ED] rounded-2xl px-4 py-8;

  &:hover {
    @apply bg-green-600;
  }
  &__text {
    @apply mt-6 text-sm text-center text-gray-600;

    &--hover{
      @apply text-white;
    }
  }
  &__user {
    @apply flex gap-[12px];

    &-profile {
      @apply mt-[12px];

      &-name {
        @apply text-gray-700 font-bold;

        &--hover{
        @apply text-white font-bold;
        }
      }
      &-rule {
        @apply text-gray-500;

        &--hover {
        @apply text-green-50;
        }
      }
    }
  }
}
</style>
