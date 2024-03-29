<template>
  <div class="input-text">
    <label
      :class="[
        {
          'input-text__label' : true,
          'input-text__label--italic': labelItalic,
          'input-text__label--error' : error,
          'required': required ,
        },
      ]"
      :for="label"
    >
      {{ label }}
    </label>
    <div
      :class="{
        'input-text__wrapper-input': true,
        'input-text__wrapper-input--focus': isFocused,
        'input-text__wrapper-input--error': error
      }"
    >
      <div
        v-if="$slots['icon-left']"
        :class="{
          'input-text__icon-left': true,
          'input-text__icon-left--border': iconLeftType === 'border',
          'input-text__icon-left--focus': iconLeftType !== 'border' && isTyped
        }"
        @click="onClickEye"
      >
        <slot name="icon-left" />
      </div>
      <input
        :id="label"
        :class="{
          'input-text__input': true,
          'input-text__input--typed': isTyped
        }"
        :placeholder="placeholder"
        :type="mType"
        :value="value"
        :min="min"
        :autofocus="autofocus"
        autocomplete="on"
        @focus="onFocus"
        @blur="onblur"
        @input="onInput"
      >
      <div
        v-if="type === 'password' || $slots['icon-right']"
        :class="{
          'input-text__icon-right': true,
          'input-text__icon-right--border': iconRightType === 'border',
          'input-text__icon-right--focus': isTyped
        }"
      >
        <jds-icon
          v-if="!$slots['icon-right']"
          class="cursor-pointer"
          :name="iconEye"
          size="1rem"
          @click="onClickEye"
        />
        <slot name="icon-right" />
      </div>
    </div>
    <p v-if="showErrorMsg" class="input-text__error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    /**
     * Auto focus on fill
     */
    autofocus: {
      type: Boolean,
      default: false
    },
    /**
     * autocomplete value to input text if field save to browser
     */
    autocomplete: {
      type: String,
      default: 'off'
    },
    /**
     * value of input text
     */
    value: {
      type: String,
      default: ''
    },
    /**
     * type of input text
     */
    type: {
      type: String,
      default: 'text'
    },
    /**
     * the label above input text
     */
    label: {
      type: String,
      default: ''
    },
    /**
     * the minimum value to accept for this input
     */
    min: {
      type: String,
      default: ''
    },
    /**
     * font style the label make style italic
     */
    labelItalic: {
      type: Boolean,
      default: false
    },
    /**
     * placeholder input text
     */
    placeholder: {
      type: String,
      default: ''
    },
    /**
     * different style icon right normal or border type
     */
    iconRightType: {
      type: String,
      default: 'normal'
    },
    /**
     * different style icon left normal or border type
     */
    iconLeftType: {
      type: String,
      default: 'normal'
    },
    /**
     * Error state
     */
    error: {
      type: Boolean,
      default: false
    },
    /**
     * Error Message
     */
    errorMessage: {
      type: String,
      default: ''
    },
    /**
     * Error state
     */
    required: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isFocused: false,
      isTyped: false,
      iconEye: 'eye',
      isShowPassword: false
    }
  },
  computed: {
    /**
     * handle certain condition for property type
     * in this case handle show password or hidden password
     */
    mType () {
      if (this.type === 'password' && !this.isShowPassword) {
        return 'password'
      } else if (this.type === 'password' && this.isShowPassword) {
        return 'text'
      }
      return this.type
    },
    showErrorMsg () {
      return typeof this.errorMessage === 'string' && !!this.errorMessage.length
    }
  },
  methods: {
    /**
     * handle method when input text on input
     */
    onInput (e) {
      if (e.target.value.length) {
        this.isTyped = true
      } else {
        this.isTyped = false
      }
      /**
       * Emitting value of input text
       */
      this.$emit('input', e.target.value)
    },
    /**
     * handle method when icon eye clicked specifically for password type
     */
    onClickEye () {
      if (this.iconEye === 'eye') {
        this.iconEye = 'eye-off'
        this.isShowPassword = true
      } else {
        this.iconEye = 'eye'
        this.isShowPassword = false
      }
    },
    onblur (e) {
      this.isFocused = false
      /**
       * Emitting value of input text
       */
      this.$emit('blur', e.target.value)
    },
    onFocus (e) {
      this.isFocused = true
      /**
       * Emitting value of input text
       */
      this.$emit('focus', e.target.value)
    }
  }
}
</script>

<style lang="postcss">
@import './Input.pcss';
</style>
