<template>
  <Portal to="competitionflowdetail">
    <div
      :class="{
        'modal-flow__backdrop': true,
        'modal-flow__backdrop--show': show,
        'modal-flow__backdrop--hide': !show,
      }"
      @click.self="onClose('overlay')"
    >
      <div
        :class="{
          'modal-flow__wrapper': true,
          'modal-flow__wrapper--show': show,
          'modal-flow__wrapper--hide': !show,
        }"
      >
        <div class="modal-flow__close">
          <BaseButton variant="circle" @click="onClose">
            <template #icon>
              <jds-icon class="text-white" size="20px" name="times" />
            </template>
          </BaseButton>
        </div>
        <div class="modal-flow__container">
          <div class="bg-white">
            <div class="modal-flow__container-title">
              Alur Sayembara Desa Digital
            </div>
            <div class="modal-flow__container-body">
              <div v-for="(item, index) in data" :key="item.id" class="modal-flow__container-body-wrapper">
                <div class="modal-flow__container-body-left">
                  <div class="modal-flow__container-body-left-icon">
                    <div class="modal-flow__container-body-left-icon-wrapper">
                      <img width="35" height="33" :src="item.img" alt="Flow Sayembara 1">
                    </div>
                  </div>
                  <div class="modal-flow__container-body-left-line">
                    <div v-show="index !== (data.length - 1)" class="modal-flow__container-body-left-line-bar" />
                  </div>
                </div>
                <div class="modal-flow__container-body-right">
                  <div class="modal-flow__container-body-right-title">
                    {{ item.title }}
                  </div>
                  <div class="modal-flow__container-body-right-subtitle">
                    {{ item.subtitle }}
                  </div>
                  <div class="modal-flow__container-body-right-section">
                    <jds-section-message
                      :show="!!(item.info)"
                      name="info"
                      variant="info"
                      :message="item.info"
                    />
                  </div>
                </div>
              </div>
              <div class="modal-flow__container-body-guide">
                <div class="modal-flow__container-body-guide-wrapper">
                  <div class="modal-flow__container-body-guide-icon">
                    <img
                      height="30"
                      width="27"
                      src="@/assets/icons/IconPdf-red.svg"
                      alt="Surat Keterangan"
                    >
                  </div>
                  <div class="modal-flow__container-body-guide-text">
                    Panduan Lengkap Sayembara Desa Digital
                  </div>
                  <div class="modal-flow__container-body-guide-button" @click="onClickDownload">
                    <span class="text-green-700 text-sm font-bold mr-1">Unduh</span>
                    <jds-icon class="text-green-700" size="18px" name="cloud-download" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-flow__container-button">
            <BaseButton class="modal-flow__container-button-close" variant="primary" label="OK, saya mengerti" @click="onClose" />
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
      data: [
        {
          id: 1,
          title: '1. PENDAFTARAN',
          subtitle: 'Kepala Desa dan Mitra membuat akun dan melengkapi data yang dibutuhkan.',
          info: 'Khusus Kepala Desa, harus mengisi kuisioner Desa Digital untuk menentukan level desa terlebih dahulu.',
          img: require('~/assets/images/competition/IconAlurSayembara_1.svg')
        },
        {
          id: 2,
          title: '2. PROSES MATCH-MAKING',
          subtitle: 'Proses ini dilakukan untuk memasangkan desa dan mitra dengan fokus pengembangan yang sama.',
          info: 'Penilaian dilakukan berdasarkan SOP yang berlaku',
          img: require('~/assets/images/competition/IconAlurSayembara_2.svg')
        },
        {
          id: 3,
          title: '3. PROSES AUDIENSI',
          subtitle: 'Desa terpilih kemudian dipertemukan denan mitra OPD terkait.',
          info: '',
          img: require('~/assets/images/competition/IconAlurSayembara_3.svg')
        },
        {
          id: 4,
          title: '4. IMPLEMENTASI DESA DIGITAL',
          subtitle: 'Proses implementasi dan pendampingan inovasi teknologi dari mitra kepada desa.',
          info: '',
          img: require('~/assets/images/competition/IconAlurSayembara_4.svg')
        },
        {
          id: 5,
          title: '5. MONITORING DAN EVALUASI',
          subtitle: 'Proses ini dilakukan kepada mitra dan desa.',
          info: '',
          img: require('~/assets/images/competition/IconAlurSayembara_5.svg')
        }
      ],
      fileSecret: this.$config.apiSecretUpload
    }
  },
  methods: {
    onClose (closeOn) {
      if (closeOn !== 'overlay' || window.innerWidth < 640) {
        this.$emit('closeModalCompetitionFlowDetail', false)
      }
    },
    onClickDownload () {
      this.$axios.get('/files/download/probis_sayembara.pdf', {
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
.modal-flow {
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
    @apply bg-white rounded-md flex flex-col;

    &-title {
      @apply py-4 px-6 font-roboto font-bold text-[21px] leading-[34px] text-green-700 text-left;
    }

    &-body {
      @apply pt-6 pr-6 h-[420px] overflow-auto;

      &-wrapper {
        @apply grid grid-cols-4 md:(grid-cols-5);
      }

      &-left {
        @apply px-6 col-span-1 flex flex-col items-center;

        &-icon {
          @apply flex justify-center items-center;

          &-wrapper {
            @apply w-[67px] h-[67px] bg-green-50 rounded-full flex justify-center items-center;
          }
        }

        &-line {
          @apply flex justify-center h-full;

          &-bar {
            @apply w-1 h-full bg-green-100;
          }
        }
      }

      &-right {
        @apply col-span-3 flex flex-col md:(col-span-4);

        &-title {
          @apply text-green-700 font-bold leading-normal;
        }

        &-subtitle {
          @apply text-gray-800 text-sm;
        }

        &-section {
          @apply mt-4 mb-10;
        }
      }

      &-guide {
        @apply mx-6 mr-0 mb-6 bg-green-50 border border-green-100 rounded-lg;

        &-wrapper {
          @apply py-2 px-2 flex flex-row justify-center items-center text-sm md:(grid grid-cols-12 px-5 text-base);
        }

        &-icon {
          @apply col-span-1 w-[27px] h-[30.5px] flex justify-center items-center;
        }

        &-text {
          @apply col-span-9 text-green-800 font-bold px-4 md:(px-0);
        }

        &-button {
          @apply col-span-2 flex flex-row justify-center items-center cursor-pointer;
        }
      }
    }

    &-button {
      @apply w-full bg-gray-50 py-4 px-6 sm:(flex justify-center);

      &-close {
        @apply w-full active:(w-[calc(100%-2px)])
        sm:(w-[165px] h-[38px] !py-0 active:(!my-0 w-[calc(165px-2px)]));
      }
    }
  }

  &__close {
    @apply absolute right-4 -top-15 sm:(hidden);
  }
}

</style>
