<template>
  <jds-button
    :class="{
      'jds-button--circle' : variant === 'circle',
      'jds-button--disabled' : variant === 'disabled',
    }"
    v-bind="{...$props,...$attrs}"
    v-on="$listeners"
  >
    <div class="flex gap-1 items-center justify-center">
      <slot name="icon" />
      <slot />
    </div>
    <div v-show="loading" class="flex justify-between">
      <span>
        {{ textLoading }}
      </span>
      <jds-spinner size="14" />
    </div>
  </jds-button>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    variant: {
      type: String,
      default: 'primary'
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'button'
    },
    loading: {
      type: Boolean,
      default: false
    },
    textLoading: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="postcss" scoped>
  // Notes: this is alternative solution for customize button design system.
  // If component button design system improved in the future maybe this code not needed

.jds-button {
  @apply font-sans font-bold;

  &--disabled {
    @apply cursor-not-allowed text-sm px-[16px] py-[14px] text-gray-500 bg-gray-200
    sm:(text-size-[14px] leading-[18px] px-[22px] py-[16px]);
  }

  &--circle {
    @apply bg-green-700 p-[12px] rounded-full hover:bg-green-800
    active:(p-[11px] m-[1px]);
  }

  &--primary {
     @apply text-sm px-[16px] py-[14px] bg-green-700
     active:(px-[15px] py-[13px] m-[1px])
     sm:(leading-[18px] px-[22px] py-[16px]
     active:(px-[21px] py-[15px] m-[1px]));
  }

  &--secondary{
    @apply text-sm px-[16px] py-[14px] text-green-700 border-green-700 border
    active:(px-[15px] py-[13px] m-[1px])
    sm:(leading-[18px] py-[10px])
    sm:active:(px-[15px] py-[9px] m-[1px]);
  }

  &--tertiary{
    @apply text-sm px-[16px] py-[14px] text-green-700
    active:(px-[15px] py-[13px] m-[1px])
    sm:(leading-[18px] py-[10px] px-2)
    sm:active:(px-[7px] py-[9px] m-[1px]);
  }
}
</style>
