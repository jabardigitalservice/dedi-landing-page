<template>
  <Portal to="joindedi">
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
            Bergabung ke Desa Digital
          </div>
          <div class="modal__container-subheading">
            Sebelum melanjutkan, silahkan
            <span class="font-bold">
              pilih dan klik
            </span>
            role dibawah ini yang sesuai dengan Anda.
          </div>
          <div class="modal__container-join-as">
            <div
              tabindex="0"
              :class="{
                'join-as': true,
                'join-as--active': isMitraSelected
              }"
              @click="onSelect('mitra')"
              @mouseover="onHover('mitra')"
              @mouseout="onHover(null)"
            >
              <img
                v-if="isMitraSelected || isMitraHovered"
                src="~/assets/images/GabungMitra.png"
                alt="Gabung Mitra"
                width="100%"
                height="180px"
                class="join-as__mitra"
              >
              <img
                v-else
                src="~/assets/images/GabungMitraDisabled.png"
                alt="Gabung Mitra Disabled"
                width="100%"
                height="180px"
                class="join-as__mitra"
              >
              <div class="join-as__mitra-info-text">
                <div class="flex flex-col gap-2">
                  <div
                    :class="{
                      'join-as__mitra-title': true,
                      'join-as__mitra-title--hover': isMitraHovered,
                      'join-as__mitra-title--active': isMitraSelected
                    }"
                  >
                    Gabung sebagai
                  </div>
                  <div
                    :class="{
                      'join-as__mitra-subtitle': true,
                      'join-as__mitra-subtitle--hover': isMitraHovered,
                      'join-as__mitra-subtitle--active': isMitraSelected
                    }"
                  >
                    Mitra
                  </div>
                </div>
                <div
                  :class="{
                    'join-as__mitra-boxicon': true,
                    'join-as__mitra-boxicon--active': isMitraSelected
                  }"
                >
                  <div
                    :class="{
                      'join-as__mitra-icon': true,
                      'join-as__mitra-icon--active': isMitraSelected
                    }"
                  >
                    <IconCheckmark />
                  </div>
                </div>
              </div>
            </div>
            <div
              tabindex="0"
              :class="{
                'join-as': true,
                'join-as--active': isDesaSelected
              }"
              @click="onSelect('desa')"
              @mouseover="onHover('desa')"
              @mouseout="onHover(null)"
            >
              <img
                v-if="isDesaSelected || isDesaHovered"
                src="~/assets/images/GabungDesa.png"
                alt="Gabung Desa"
                width="100%"
                height="180px"
                class="join-as__desa"
              >
              <img
                v-else
                src="~/assets/images/GabungDesaDisabled.png"
                alt="Gabung Desa Disabled"
                width="100%"
                height="180px"
                class="join-as__desa"
              >
              <div class="join-as__desa-info-text">
                <div class="flex flex-col gap-2">
                  <div
                    :class="{
                      'join-as__desa-title': true,
                      'join-as__desa-title--hover': isDesaHovered,
                      'join-as__desa-title--active': isDesaSelected
                    }"
                  >
                    Gabung sebagai
                  </div>
                  <div
                    :class="{
                      'join-as__desa-subtitle': true,
                      'join-as__desa-subtitle--hover': isDesaHovered,
                      'join-as__desa-subtitle--active': isDesaSelected
                    }"
                  >
                    Desa
                  </div>
                </div>
                <div
                  :class="{
                    'join-as__desa-boxicon': true,
                    'join-as__desa-boxicon--active': isDesaSelected
                  }"
                >
                  <div
                    :class="{
                      'join-as__desa-icon': true,
                      'join-as__desa-icon--active': isDesaSelected
                    }"
                  >
                    <IconCheckmark />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal__container-button">
            <BaseButton class="modal__container-button-close" variant="secondary" label="Batal" @click="onClose" />
            <BaseButton class="modal__container-button-next" :variant="btnVariant" label="Lanjutkan" :disabled="btnDisabled" @click="onClose" />
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
      selected: null,
      hovered: null,
      btnVariant: 'disabled',
      btnDisabled: true
    }
  },
  computed: {
    isMitraHovered () {
      return this.hovered === 'mitra'
    },
    isDesaHovered () {
      return this.hovered === 'desa'
    },
    isMitraSelected () {
      return this.selected === 'mitra'
    },
    isDesaSelected () {
      return this.selected === 'desa'
    }
  },
  watch: {
    selected (value) {
      if (value !== null) {
        this.btnVariant = 'primary'
        this.btnDisabled = false
      } else {
        this.btnVariant = 'disabled'
        this.btnDisabled = true
      }
    }
  },
  methods: {
    onSelect (value) {
      this.selected = value
    },
    onHover (value) {
      this.hovered = value
    },
    onClose (closeOn) {
      if (closeOn !== 'overlay' || window.innerWidth < 640) {
        this.selected = null
        this.$emit('closeModal', false)
      }
    }
  }
}
</script>

<style lang="postcss">
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

.join-as {
  @apply border-[#D2D7DE] border rounded-xl cursor-pointer
  sm:(h-[257px]);

  &--active {
    @apply border-green-700 border;
  }

  &:hover {
    box-shadow: 0 4px 20px rgba(65, 92, 132, 0.12);
  }

  &__mitra, &__desa {
    @apply bg-no-repeat h-[180px] w-full rounded-t-xl object-cover object-left-top;

    &-info-text {
      @apply px-4 py-3 flex justify-between items-center;
    }

    &-title {
      @apply text-gray-500 text-[12px] leading-[19px];

      &--active {
        @apply text-gray-600;
      }

      &--hover {
        @apply text-gray-600;
      }
    }

    &-subtitle {
      @apply text-gray-600 text-[24px] leading-[32px] font-bold font-roboto;

      &--active {
        @apply text-green-800;
      }

      &--hover {
        @apply text-gray-800;
      }
    }

    &-boxicon {
      @apply w-10 h-10 flex items-center justify-center;

      &--active {
        @apply bg-green-700 rounded-full;
      }
    }

    &-icon {
      @apply text-gray-300;

      &--active {
        @apply text-white;
      }
    }
  }
}

</style>
