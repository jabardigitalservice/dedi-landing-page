<template>
  <div class="chips-group">
    <button
      v-for="item in values"
      :key="item.value"
      :class="{
        'chips':true,
        'chips--active': isActive(item.value),
      }"
      @click="chipsOnClick(item.value)"
    >
      <span
        :class="{
          'chips__label': true,
          'chips__label--active':isActive(item.value),
        }"
      >
        {{ item.label }}
        <img v-show="isActive(item.value)" width="16" height="16" src="~/assets/icons/Checkchips.svg" alt="Icon Checkchips">
      </span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    values: {
      type: Array,
      validator: (values) => {
        return values.every((item) => {
          return item.label && item.value
        })
      },
      default: () => []
    },
    mandatory: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      active: null
    }
  },
  mounted () {
    this.initialActive()
  },
  methods: {
    isActive (value) {
      return this.active === value
    },
    initialActive () {
      if (Array.isArray(this.values) && this.values.length) {
        this.active = this.values[0].value
      }
    },
    chipsOnClick (value) {
      if (this.mandatory) {
        this.active = value
        this.emitChips(value)
      } else {
        this.active = value === this.active ? null : value
        this.emitChips(this.active)
      }
    },
    emitChips (value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="postcss">

.chips-group {
  @apply flex gap-6;
}

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
