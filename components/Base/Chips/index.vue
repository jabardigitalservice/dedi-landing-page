<template>
  <button
    :class="{
      'chips':true,
      'chips--active': isActive,
    }"
    @click="chipsOnClick"
  >
    <span
      :class="{
        'chips__label': true,
        'chips__label--active':isActive,
      }"
    >
      <slot />
      <img v-show="isActive" width="16" height="16" src="~/assets/icons/Checkchips.svg" alt="Icon Checkchips">
    </span>
  </button>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  watch: {
    active: {
      handler () {
        this.isActive = this.active
      },
      immediate: true
    }
  },
  methods: {
    chipsOnClick () {
      this.isActive = !this.isActive
      this.emitChips(this.isActive)
    },
    emitChips (value) {
      if (value) {
        this.$emit('click', this.value)
        this.$emit('click:active', this.value)
      } else {
        this.$emit('click', null)
        this.$emit('click:nonactive', null)
      }
    }
  }
}
</script>

<style lang="postcss">
.chips {
  @apply py-2 px-3 bg-white rounded-[27px] border border-blue-gray-50 focus:outline-none;

  &--active {
    @apply bg-green-700 pr-[6px];
  }

  &__label {
    @apply text-sm leading-[18px] text-gray-800 font-medium inline-flex gap-[6px] items-center;

    &--active {
      @apply text-sm leading-[18px] text-white font-bold;
    }
  }
}
</style>
