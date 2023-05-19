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
              <img height="20" width="20" src="~/assets/icons/IconTimes.svg" alt="Icon Times">
            </template>
          </BaseButton>
        </div>
        <div class="modal-flow__container">
          <div class="modal-flow__container-wrapper">
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
                  <div class="modal-flow__container-body-right-date">
                    {{ item.date }}
                  </div>
                  <div class="modal-flow__container-body-right-subtitle">
                    {{ item.subtitle }}
                  </div>
                  <div class="modal-flow__container-body-right-section">
                    <div v-show="!!(item.info)" class="modal-flow__section-info">
                      <div class="modal-flow__section-info-img">
                        <img width="16" height="16" src="~/assets/icons/IconInfo.svg" alt="Icon Info">
                      </div>
                      <div class="modal-flow__section-info-content">
                        {{ item.info }}
                      </div>
                    </div>
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
          title: 'PENDAFTARAN',
          date: '24 Juni - 12 Juli 2022',
          subtitle: 'Kepala Desa dan Mitra membuat akun dan melengkapi data yang dibutuhkan.',
          info: 'Khusus Kepala Desa, harus mengisi kuisioner Desa Digital untuk menentukan level desa terlebih dahulu.',
          img: require('~/assets/images/competition/IconAlurSayembara_1.svg')
        },
        {
          id: 2,
          title: 'PROSES MATCH-MAKING',
          date: '15 - 22 Juli 2022',
          subtitle: 'Proses ini dilakukan untuk memasangkan desa dan mitra dengan fokus pengembangan yang sama.',
          info: 'Penilaian dilakukan berdasarkan SOP yang berlaku.',
          img: require('~/assets/images/competition/IconAlurSayembara_2.svg')
        },
        {
          id: 3,
          title: 'PROSES AUDIENSI',
          date: '22 - 29 Juli 2022',
          subtitle: 'Desa terpilih kemudian dipertemukan denan mitra OPD terkait.',
          info: '',
          img: require('~/assets/images/competition/IconAlurSayembara_3.svg')
        },
        {
          id: 4,
          title: 'IMPLEMENTASI DESA DIGITAL',
          date: 'Agustus - Oktober 2022',
          subtitle: 'Proses implementasi dan pendampingan inovasi teknologi dari mitra kepada desa.',
          info: '',
          img: require('~/assets/images/competition/IconAlurSayembara_4.svg')
        },
        {
          id: 5,
          title: 'MONITORING DAN EVALUASI',
          date: 'September - Desember 2022',
          subtitle: 'Proses ini dilakukan kepada mitra dan desa.',
          info: '',
          img: require('~/assets/images/competition/IconAlurSayembara_5.svg')
        }
      ],
      linkDocument: 'https://drive.google.com/file/d/1HHQaSMJl1N6wB3jJXaCZIeUrQAhy_FBJ/view?usp=sharing'
    }
  },
  methods: {
    onClose (closeOn) {
      if (closeOn !== 'overlay' || window.innerWidth < 640) {
        this.$emit('closeModalCompetitionFlowDetail', false)
      }
    },
    onClickDownload () {
      window.open(this.linkDocument, '_blank')
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

    &-wrapper {
      @apply bg-white;
      border-radius: 8px 8px 0 0;
    }

    &-title {
      @apply py-4 px-6 font-roboto font-bold text-[21px] leading-[34px] text-green-700 text-left;
    }

    &-body {
      @apply pt-6 pr-6 h-[420px] overflow-auto;

      /* Scroll bar stylings */
      scrollbar-color: #E0E0E0 white;
      scrollbar-width: thin;

      &::-webkit-scrollbar {
        @apply w-5 h-5;
      }

      &::-webkit-scrollbar-track {
        @apply bg-transparent;
      }

      &::-webkit-scrollbar-thumb {
        @apply bg-gray-300 rounded-xl border-solid border-6 border-transparent bg-clip-content;
      }
      /* End of scroll bar stylings */

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

        &-date {
          @apply text-gray-800  font-bold text-sm;
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
      border-radius: 0 0 8px 8px;

      &-close {
        @apply w-full active:(w-[calc(100%-2px)])
        sm:(w-[165px] h-[38px] !py-0 active:(!my-0 w-[calc(165px-2px)]));
      }
    }
  }

  &__close {
    @apply absolute right-4 -top-15 sm:(hidden);
  }

  &__section-info {
    @apply p-2 bg-blue-50 border border-blue-800 rounded-lg flex flex-row;

    &-img {
      @apply min-w-4 min-h-4 mr-4 pt-[2px] md:(mr-6);
    }

    &-content {
      @apply text-sm text-gray-900;
    }
  }
}

</style>
