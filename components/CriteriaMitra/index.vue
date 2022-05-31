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
