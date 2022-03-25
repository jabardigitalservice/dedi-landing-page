<template>
  <div v-if="isDropdown" id="tooltip" class="tooltip">
    <div class="tooltip__content">
      <div class="tooltip__content-bar">
        <div
          :class="{
            'tooltip__content-bar--default' : true,
            'tooltip__content-bar--background-low' : level === 'low',
            'tooltip__content-bar--background-medium' : level === 'medium',
            'tooltip__content-bar--background-strong' : level === 'strong'
          }"
          v-bind="{...$props,...$attrs}"
        />
        <div
          :class="{
            'tooltip__content-bar--default' : true,
            'tooltip__content-bar--background-medium' : level === 'medium',
            'tooltip__content-bar--background-strong' : level === 'strong'
          }"
          v-bind="{...$props,...$attrs}"
        />
        <div
          :class="{
            'tooltip__content-bar--default' : true,
            'tooltip__content-bar--background-strong' : level === 'strong'
          }"
          v-bind="{...$props,...$attrs}"
        />
      </div>
      <div class="tooltip__content-text">
        Kata Sandi Anda
        <span
          v-if="isLevel"
          :class="{
            'tooltip__content-text--weight' : true,
            'tooltip__content-text--color-low' : level === 'low',
            'tooltip__content-text--color-medium' : level === 'medium',
            'tooltip__content-text--color-strong' : level === 'strong',
          }"
          v-bind="{...$props,...$attrs}"
        >
          {{ textName }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    level: {
      type: String,
      default: 'default',
      validator: (value) => {
        return ['low', 'medium', 'strong', 'default'].includes(value)
      }
    },
    isDropdown: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      textName: '',
      options: [
        {
          keys: 'default',
          text: ''
        },
        {
          keys: 'low',
          text: 'tidak cukup kuat.'
        },
        {
          keys: 'medium',
          text: 'cukup kuat.'
        },
        {
          keys: 'strong',
          text: 'kuat.'
        }
      ]
    }
  },
  computed: {
    isLevel () {
      if (this.level !== null) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    level (value) {
      if (value !== '') {
        for (const option of this.options) {
          if (value === option.keys) {
            this.textName = option.text
          }
        }
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted #212121;

  &__content {
    visibility: visible;
    width: 238px;
    height: 45px;
    background-color: #212121;
    color: #fff;
    text-align: left;
    border-radius: 8px;
    padding: 8px 12px;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -60px;

    &::after {
      content: '';
      position: absolute;
      top: -20%;
      left: 45%;
      margin-left: -100px;
      border-width: 5px;
      border-style: solid;
      border-color: #212121 transparent transparent transparent;
      transform: rotate(180deg);
    }

    &-bar {
      @apply flex flex-row gap-1 pb-1.5;

      &--default {
        @apply w-[69px] h-[6px] bg-[#4F5050] rounded-[4px] border border-solid border-[#212121];
      }

      &--background {
        @apply bg-green-700;

        &-low {
          @apply bg-red-500;
        }
        &-medium {
          @apply bg-yellow-700;
        }
        &-strong {
          @apply bg-green-500;
        }
      }
    }

    &-text {
      @apply text-[12px] leading-[19px];

      &--weight {
        @apply font-bold;
      }

      &--color {

        &-low {
          @apply text-red-500;
        }
        &-medium {
          @apply text-yellow-700;
        }
        &-strong {
          @apply text-green-500;
        }
      }
    }
  }
}

</style>
