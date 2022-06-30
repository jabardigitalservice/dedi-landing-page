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
          <div class="modal__container--overflow">
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
                  src="~/assets/images/GabungMitra_Aktif.svg"
                  alt="Gabung Mitra"
                  width="100%"
                  height="180px"
                  class="join-as__mitra"
                >
                <img
                  v-else
                  src="~/assets/images/GabungMitra_Abu.svg"
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
                  src="~/assets/images/GabungDesa_Aktif.svg"
                  alt="Gabung Desa"
                  width="100%"
                  height="180px"
                  class="join-as__desa"
                >
                <img
                  v-else
                  src="~/assets/images/GabungDesa_Abu.svg"
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
            <div class="modal__container-info">
              <img width="16" height="16" src="~/assets/icons/IconInfo.svg" alt="Icon Info">
              <div class="modal__container-info-content">
                <p class="modal__container-info-content-text">
                  <span class="modal__container-info-content-text--bold">Disclaimer:</span> Pendaftaran sebagai desa penerima manfaat hanya dapat dilakukan oleh Kepala Desa.
                </p>
              </div>
            </div>
            <div class="modal__container-button">
              <BaseButton class="modal__container-button-close" variant="secondary" label="Batal" @click="onClose" />
              <BaseButton class="modal__container-button-next" :variant="btnVariant" label="Lanjutkan" :disabled="btnDisabled" @click="onRegistration" />
            </div>
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
    },
    onRegistration () {
      if (this.selected === 'mitra') {
        this.$router.push({ path: '/registration', query: { option: 'mitra' } })
      } else if (this.selected === 'desa') {
        this.$router.push({ path: '/registration', query: { option: 'desa' } })
      } else {
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
    @apply bg-white rounded-t-2xl py-6 flex flex-col px-4 rounded-2xl
    md: (px-12);

    &--overflow {
      @apply overflow-y-scroll flex flex-col
      sm:(h-full overflow-visible);
    }

    &-heading {
      @apply font-roboto font-bold text-[21px] leading-[34px] text-green-700 text-center;
    }

    &-subheading {
      @apply text-sm leading-[20px] font-sans text-gray-800 font-normal text-center mt-6;
    }

    &-join-as {
      @apply grid gap-3 grid-cols-2 justify-between mt-6
      sm:(gap-6 max-h-[257px] flex items-center justify-center);
    }

    &-info {
      @apply min-w-[250px] max-w-[725px] flex justify-center justify-items-start items-start gap-4 mt-6 py-3.5 px-4 bg-blue-50 border border-blue-800 rounded-lg
      sm:(mx-4)
      md:(mx-6);

     &-content {
        @apply flex-grow;

        &-text {
          @apply items-start text-[14px] leading-[23px];

          &--bold {
            @apply text-gray-900 font-bold;
          }
        }
      }
    }

    &-button {
      @apply w-full mt-6 sm:(flex justify-center gap-4 py-2);

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
  @apply cursor-pointer flex flex-col justify-center
  sm:(min-h-[257px]);

  &--active {
    @apply border-green-700 border-[1.5px] rounded-[14px];
  }

  &:hover {
    @apply rounded-[14px];
    box-shadow: 0 4px 20px rgba(65, 92, 132, 0.12);
  }

  &__mitra, &__desa {
    @apply  object-cover object-left-top h-[180px] w-auto rounded-t-xl border-0 md:(w-full);

    img {
      @apply h-full w-full;
    }

    &-info-text {
      @apply border-[#D2D7DE] border rounded-b-xl px-4 py-3 flex justify-between items-center;
    }

    &-title {
      @apply text-gray-500 text-[12px] leading-[19px];

      &--active {
        @apply text-blue-gray-600;
      }

      &--hover {
        @apply text-blue-gray-600;
      }
    }

    &-subtitle {
      @apply text-gray-600 text-[24px] leading-[32px] font-bold font-roboto;

      &--active {
        @apply text-green-800;
      }

      &--hover {
        @apply text-blue-gray-800;
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
