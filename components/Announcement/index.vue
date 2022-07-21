<template>
  <Portal to="announcement">
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
        <div class="modal__box">
          <div class="modal__box-image">
            <button class="modal__box--circle" @click="onClose">
              <IconTimes
                class="icon__times"
              />
            </button>
            <img class="w-full rounded-t-[15px]" width="681" height="255" src="~/assets/images/competition/Announcement_competition.svg">
          </div>
          <div class="modal__box-heading">
            <h1>
              Selamat Kepada Desa Terpilih Di Sayembara Desa Digital
              <img class="inline-block" width="28" height="28" src="~/assets/icons/IconParty.svg" alt="icon party">
            </h1>
          </div>
          <div class="modal__box-subheading">
            <p class="modal__box-subheading--blue">
              Kami ucapkan terima kasih atas partisipasi wargi yang telah mendaftar sebagai desa penerima manfaat sayembara di tahun 2022.
            </p>
          </div>
          <div class="modal__box-button">
            <BaseButton class="modal__box-button-announcement" variant="primary" @click="onClickDownload">
              <jds-icon class="text-white" size="18px" name="cloud-download" />
              <span>Cek Hasil Sayembara</span>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </Portal>
</template>

<script>
import IconTimes from '~/assets/icons/IconTimes.svg?inline'

export default {
  components: { IconTimes },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fileSecret: this.$config.apiSecretUpload
    }
  },
  methods: {
    onClose () {
      this.$emit('on-close-modal', false)
    },
    onClickDownload () {
      this.$axios.get('/files/download/PengumumanDesaTerpilih.pdf', {
        headers: {
          'x-api-key': this.fileSecret
        }
      }).then((response) => {
        const { data } = response.data
        const fileURL = data.path
        const fileLink = document.createElement('a')

        fileLink.href = fileURL
        fileLink.setAttribute('target', '_blank')
        fileLink.setAttribute('download', 'file.pdf')
        document.body.appendChild(fileLink)

        fileLink.click()
      }).catch((error) => {
        const { data } = error.response || {}
        if (data?.error) {
          this.$store.dispatch('toast/showToast', {
            type: 'error',
            message: data.error
          })
        }
      })
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

  &__box {
    @apply bg-white rounded-t-2xl flex flex-col rounded-2xl relative;

    &--circle {
      @apply w-[38px] h-[38px] rounded-full bg-white absolute flex justify-center items-center right-2 top-2;
    }

    &-heading {
      @apply h-full max-w-[425px] mx-auto pt-3 px-8 font-roboto font-bold text-[28px] leading-[42px] text-green-700 text-center
      sm:(px-4);
    }

    &-subheading {
      @apply h-full max-w-[621px] mx-auto mt-4 px-8 text-center
      sm:(px-4);

      &--blue {
        @apply text-sm leading-[23px] font-sans text-blue-gray-800 font-normal;
      }
    }

    &-image {
      @apply gap-3 grid-cols-2 justify-between
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
      @apply w-full flex justify-center mt-4 mb-6;

      &-close {
        @apply !hidden
        sm:(!inline-block w-[165px] h-[38px] !py-1 active:(!my-0 w-[calc(165px-2px)]));
      }

      &-announcement {
        @apply !py-2 !px-4;
      }
    }
  }

  &__close {
    @apply absolute right-4 -top-15 sm:hidden;
  }
}

.icon__times path {
  @apply fill-green-700;
}

</style>
