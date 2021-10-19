<template>
  <jds-button v-bind="{...$props,...$attrs}" v-on="$listeners">
    <div class="flex gap-1 items-center justify-center">
      <slot name="icon" />
      <slot />
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
    }
  }
}
</script>

<style lang="postcss" scoped>
  // Notes: this is alternative solution for customize button design system.
  // If component button design system improved in the future maybe this code not needed

.jds-button {
  @apply font-sans font-bold;

  &--primary {
     @apply text-sm px-[16px] py-[14px] active:(px-[15px] py-[13px] m-[1px])
     bg-green-700 sm:(text-size-[14px] leading-[18px] px-[22px] py-[16px]
     active:(px-[21px] py-[15px] m-[1px]));
  }

  &--secondary{
    @apply text-sm px-[16px] py-[14px] active:(px-[15px] py-[13px] m-[1px])
    sm:(py-[10px]) sm:active:(px-[15px] py-[9px] m-[1px]) text-green-700 border-green-700 border;
  }

  &--tertiary{
    @apply text-sm px-[16px] py-[14px] active:(px-[15px] py-[13px] m-[1px])
    sm:(py-[10px] px-2) sm:active:(px-[7px] py-[9px] m-[1px]) text-green-700;
  }
}
</style>
