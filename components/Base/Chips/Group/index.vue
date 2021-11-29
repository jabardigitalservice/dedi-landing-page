<template>
  <div class="chips-group">
    <button
      v-for="item in values"
      :key="item.value"
      :class="{
        'chips': true,
        'chips--active': isActive(item.value)
      }"
      @click="onClick(item.value)"
    >
      <span
        :class="{
          'chips__label': isActive(item.value),
          'chips__label--active': isActive(item.value)
        }"
      >
        {{ item.label }}
        <img
          v-show="isActive(item.value)"
          width="14"
          height="14"
          src="@/assets/icons/ChecklistChips.svg"
          alt="ChecklistChips"
        >
      </span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    values: {
      type: Array,
      default: () => [],
      validator: (values) => {
        return values.every(item => item.label && item.value)
      }
    },
    mandatory: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      active: null
    }
  },
  mounted () {
    this.initialValue()
  },
  methods: {
    initialValue () {
      const allValues = this.values.map(item => item.value)
      const [firstValue] = allValues
      this.active = firstValue
    },
    isActive (value) {
      return this.active === value
    },
    onClick (value) {
      if (this.mandatory) {
        this.active = value
        this.emitChips(value)
      } else {
        this.active = value === this.active ? null : value
        this.emitChips(this.active)
      }
    },
    emitChips (value) {
      this.$emit('onChange', value)
    }
  }
}
</script>

<style lang="postcss">
.chips-group {
  @apply inline-flex flex-wrap gap-6 lg:(inline-flex gap-5);
}

.chips {
  @apply text-sm py-2 px-3 border bg-white border-blue-gray-50 rounded-[27px] focus:outline-none;

  &--active {
      @apply bg-green-700 pr-[6px];
    }

  &__label {
    @apply font-sans inline-flex gap-[6px] text-gray-800 leading-[18px] font-medium;

    &--active {
      @apply text-white leading-[18px] font-bold;
    }
  }
}
</style>
