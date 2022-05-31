<template>
  <Portal to="criteriamitra">
    <div
      :class="{
        'modal-criteria-mitra__backdrop': true,
        'modal-criteria-mitra__backdrop--show': show,
        'modal-criteria-mitra__backdrop--hide': !show,
      }"
      @click.self="onClose('overlay')"
    >
      <div
        :class="{
          'modal-criteria-mitra__wrapper': true,
          'modal-criteria-mitra__wrapper--show': show,
          'modal-criteria-mitra__wrapper--hide': !show,
        }"
      >
        <div class="modal-criteria-mitra__close">
          <BaseButton variant="circle" @click="onClose">
            <template #icon>
              <jds-icon class="text-white" size="20px" name="times" />
            </template>
          </BaseButton>
        </div>
        <div class="modal-criteria-mitra__container">
          <div class="modal-criteria-mitra__container-heading">
            Kriteria Mitra Yang Dapat Mengikuti
          </div>
          <div class="modal-criteria-mitra__container-content">
            <div
              v-for="item in criteriaMitraDetails"
              :key="item.id"
              class="modal-criteria-mitra__container-content-main"
            >
              <div class="modal-criteria-mitra__container-content-main-img">
                <img class="mx-auto" width="40px" height="40px" :src="item.image" :alt="item.textImg">
              </div>
              <div class="modal-criteria-mitra__container-content-main-text">
                <h2 class="modal-criteria-mitra__container-content-main-text-title">
                  {{ item.title }}
                </h2>
                <ul v-if="item.textDetails.length > 1" class="modal-criteria-mitra__container-content-main-text-info">
                  <li
                    v-for="(textDetail, index) in item.textDetails"
                    :key="index"
                    class="modal-criteria-mitra__container-content-main-text-info-message"
                  >
                    {{ textDetail }}
                  </li>
                </ul>
                <div v-else>
                  <p
                    v-for="(textDetail, index) in item.textDetails"
                    :key="index"
                    class="modal-criteria-mitra__container-content-main-text-info-message"
                  >
                    {{ textDetail }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-criteria-mitra__container-action">
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
      criteriaMitraDetails: [
        {
          id: 1,
          image: require('@/assets/images/criteria/mitra/CriteriaMitraBusiness.svg'),
          title: 'Memiliki proses bisnis yang berkelanjutan',
          textImg: 'Proses Bisnis',
          textDetails: [
            'Inovasi melalui pemanfaatan teknologi digital.', 'Memberi manfaat untuk masyarakat Jawa Barat.', 'Dapat dilanjutkan secara mandiri oleh masyarakat.'
          ]
        },
        {
          id: 2,
          image: require('@/assets/images/criteria/mitra/CriteriaMitraAccess.svg'),
          title: 'Menyepakati pemberian akses dashboard dan data',
          textImg: 'Akses Dashboard',
          textDetails: [
            'Hal ini diperlukan untuk keperluan penyediaan data alternatif untuk pengambilan kebijakan dan untuk keperluan monitoring dan evaluasi kebermanfaatan program'
          ]
        },
        {
          id: 3,
          image: require('@/assets/images/criteria/mitra/CriteriaMitraAdministrative.svg'),
          title: 'Memenuhi prasyarat administrasi',
          textImg: 'Prasyarat Administrasi',
          textDetails: [
            'Mitra diminta untuk menyetujui prasyarat administrasi untuk keperluan Pengadaan Langsung, maupun Perjanjian Kerja Sama.'
          ]
        },
        {
          id: 4,
          image: require('@/assets/images/criteria/mitra/CriteriaMitraLocation.svg'),
          title: 'Memiliki ajuan lokasi kerja dengan syarat sebagai berikut:',
          textImg: 'Lokasi Kerja',
          textDetails: [
            'Sesuai dengan rencana kerja JDS di tahun kerja sama;', 'Lokasi memiliki potensi ekonomi;', 'Inovasi digital yang ditawarkan mampu membantu permasalahan di lokasi tersebut;', 'Lebih disukai apabila lokasi memperhatikan aspek ketersebaran/pemerataan.'
          ]
        },
        {
          id: 5,
          image: require('@/assets/images/criteria/mitra/CriteriaMitraContact.svg'),
          title: 'Memiliki kontak local champion',
          textImg: 'Kontak',
          textDetails: [
            'Hal ini untuk memastikan pemberdayaan lokal dan membantu proses monitoring, evaluasi, dan assesment dampak secara berkala.'
          ]
        }
      ]
    }
  },
  methods: {
    onClose (closeOn) {
      if (closeOn !== 'overlay' || window.innerWidth < 640) {
        this.$emit('onCloseModal', false)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.modal-criteria-mitra {

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
      @apply font-roboto font-bold text-[21px] leading-[34px] text-green-700 text-left;
    }

    &-content {
      @apply h-[350px] overflow-y-scroll;

      &-main {
        @apply grid grid-cols-[max-content,1fr] gap-6 mb-4;

        &-img {
          @apply flex items-center w-[67px] h-[67px] rounded-full bg-green-50;
        }

        &-text {

          &-title {
            @apply font-sans font-bold text-[16px] leading-[26px] text-green-700;
          }

          &-info {
            @apply list-disc pl-5;

            &-message {
              @apply font-sans font-400 text-[14px] leading-[23px] text-gray-800 text-justify;
            }
          }
        }
      }
    }

    &-action {
      @apply w-full flex justify-center sm:(py-2 gap-4);
    }
  }

  &__close {
    @apply absolute right-4 -top-15 sm:hidden;
  }
}
</style>

</style>
