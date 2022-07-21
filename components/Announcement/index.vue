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
        <div class="modal__container">
          <div class="modal__container-image">
            <BaseButton variant="circle">
              <template #icon>
                <jds-icon class="text-white" size="20px" name="times" />
              </template>
              <img class="" src="~/assets/images/competition/Announcement_competition.svg">
            </BaseButton>
          </div>
          <div class="modal__container-heading">
            <h1>
              Selamat Kepada Desa Terpilih Di Sayembara Desa Digital 🎉
            </h1>
          </div>
          <div class="modal__container-subheading">
            <p>
              Kami ucapkan terima kasih atas partisipasi wargi yang telah mendaftar sebagai desa penerima manfaat sayembara di tahun 2022.
            </p>
          </div>
          <div class="modal__container-button">
            <BaseButton class="modal__container-button-announcement" :variant="btnVariant" label="Cek Hasil Sayembara">
              <template #icon>
                <jds-icon class="text-green-700" size="18px" name="cloud-download" />
              </template>
            </BaseButton>
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
  }
}
</script>
