<template>
  <div class="achievement-nav">
    <div slot="button-prev" class="swiper-prev-achievement">
      <jds-icon
        :class="{
          'button-left' : true,
          'button-left--disabled': currIndex === 0
        }"
        size="16px"
        name="chevron-left"
        @click="prevNav"
      />
    </div>
    <div v-if="isShowPagination" slot="pagination" class="swiper-pagination" />
    <div slot="button-next" class="swiper-next-achievement">
      <jds-icon
        :class="{
          'button-right' : true,
          'button-right--disabled': currIndex === (data.length - 1)
        }"
        size="16px"
        name="chevron-right"
        @click="nextNav"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => ([])
    },
    isShowPagination: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currIndex: 0
    }
  },
  methods: {
    prevNav () {
      if (this.currIndex > 0) {
        this.currIndex--
      }
    },
    nextNav () {
      if (this.currIndex < this.data.length - 1) {
        this.currIndex++
      }
    }
  }
}
</script>

<style lang="postcss">
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
