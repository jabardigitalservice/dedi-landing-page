<template>
  <Portal to="criteriamitra">
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
          <!-- @todo: add content in the next pr -->
          </div>
          <div class="modal__container-button">
            <BaseButton variant="primary" label="Oke, saya mengerti" @click="onClose" />
          </div>
        </div>
      </div>
    </div>
  </Portal>
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
.modal {

  &__backdrop {
    @apply z-20 fixed h-screen w-screen backdrop-filter backdrop-blur-[6px]
    bg-black bg-opacity-75 top-0 transition-all duration-300;

    &--show {
      @apply visible opacity-100;
    }

    &--hide{
      @apply invisible opacity-0;
    }
  }

  &__wrapper{
    @apply fixed bottom-0 w-full transition-all duration-300
    sm:(relative top-1/2 mx-auto my-0 bottom-[unset] max-w-[680px]);

    &--show {
      @apply transform translate-y-0 sm:(-translate-y-1/2);
    }

    &--hide{
      @apply transform translate-y-[20%] sm:(-translate-y-[30%]);
    }
  }

  &__container {
    @apply bg-white rounded-t-2xl py-6 flex flex-col gap-6 px-4
    sm:px-12 sm:(rounded-2xl);

    &-heading {
      @apply font-roboto font-bold text-[21px] leading-[34px] text-green-700 text-center;
    }

    &-subheading {
      @apply text-sm leading-[20px] font-sans text-gray-800 font-normal text-center;
    }

    &-join-as {
      @apply grid gap-3 grid-cols-2 justify-between
      sm:(gap-6 h-[329px] flex items-center justify-center);
    }

    &-button {
      @apply w-full sm:(py-2 flex justify-center gap-4);

      &-close {
        @apply !hidden
        sm:(!inline-block w-[165px] h-[38px] !py-1 active:(!my-0 w-[calc(165px-2px)]));
      }

      &-next {
        @apply w-full active:(w-[calc(100%-2px)])
        sm:(w-[165px] h-[38px] !py-0 active:(!my-0 w-[calc(165px-2px)]));
      }
    }
  }

  &__close {
    @apply absolute right-4 -top-15 sm:hidden;
  }
}

</style>
