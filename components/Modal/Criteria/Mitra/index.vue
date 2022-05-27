<template>
  <div
    :class="{
      'modal__backdrop': true,
      'modal__backdrop--show': show,
      'modal__backdrop--hide': !show,
    }"
    @click.self="onClose('overlay')"
  >
    <div
      :class="{
        'modal__wrapper': true,
        'modal__wrapper--show': show,
        'modal__wrapper--hide': !show,
      }"
    >
      <div class="modal__close">
        <BaseButton variant="circle" @click="onClose">
          <template #icon>
            <jds-icon class="text-white" size="20px" name="times" />
          </template>
        </BaseButton>
      </div>
      <div class="modal__container">
        <div class="modal__container-heading">
          Kriteria Mitra Yang Dapat Mengikuti
        </div>
        <div class="modal__container-join-as">
          <p>test</p>
        </div>
        <div class="modal__container-button">
          <BaseButton variant="primary" label="Oke, saya mengerti" @click="onClose" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selected: null
    }
  },
  methods: {
    onClose (closeOn) {
      if (closeOn !== 'overlay' || window.innerWidth < 640) {
        this.selected = null
        this.$emit('onCloseModal', false)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
@import './ModalCriteriaMitra.pcss'
</style>
