<template>
  <div
    :class="{
      'registration__questionnaire-body': true,
      'registration__questionnaire-modal': showModalInfoVillage,
    }"
    @click.self="onCloseModal"
  >
    <ModalInfoVillage
      v-if="showModalInfoVillage"
      class="relative"
      @onCloseModal="onCloseModal"
    />
    <div
      v-else
    >
      <div class="registration__form" />
      <div class="registration__form-title">
        Kuisioner Desa Digital
      </div>
      <div class="registration__form-content">
        <jds-section-message
          show
          name="info"
          variant="info"
          :message="infoProgram"
        >
          <div class="registration__form-info" @click="onClickInfo">
            Lihat Level Desa Digital
          </div>
        </jds-section-message>

        <div v-show="false" class="registration__form-content--container">
          <div class="registration__form-content--container-title">
            Informasi Umum
          </div>
          <BaseInput
            class="mt-2"
            label="Nama Lengkap"
            type="text"
            autofocus
            autocomplete="name"
            placeholder="Cth: Agus Permadi"
          />
          <BaseInput
            class="mt-2"
            label="Jabatan"
            type="text"
            autofocus
            autocomplete="jabatan"
            placeholder="Cth: Kepala Desa Manyeti"
          />
          <div class="grid grid-cols-5 mt-6">
            <div class="registration__form-col-image">
              <div
                :class="{
                  'registration__form__image': true,
                  'registration__form__image--attached': file.isAttached
                }"
              >
                <img
                  v-if="file.source"
                  class="registration__form__image--attached-uploaded"
                  width="88"
                  height="88"
                  :src="file.source"
                  alt="Foto SK"
                >
                <img
                  v-else
                  class="text-gray-500"
                  height="22"
                  width="22"
                  src="@/assets/icons/IconPdf.svg"
                  alt="No Image"
                >
              </div>
            </div>
            <div class="registration__form-col-desc">
              <div class="registration__form__subtitle">
                Unggah SK Pengangkatan Kepala Desa
              </div>
              <div class="registration__form__placeholder">
                File yang didukung adalah .pdf maksimal 10 Mb.
              </div>
              <div class="registration__form__button">
                <button class="registration__form__button-btn" type="button" @click="$refs.letter.click()">
                  Unggah Foto
                  <jds-icon class="ml-2" size="12px" name="plus-bold" />
                </button>
                <input
                  ref="letter"
                  type="file"
                  hidden="true"
                  accept="image/png, image/jpeg, image/svg+xml"
                  @change="onFileChange()"
                >
                <div v-if="file.fileImage" class="registration__form__filename">
                  Filename: {{ file.fileImage.get('file').name }}
                </div>
                <div v-else-if="file.uploadErrorMessage" class="registration__form__filename-error">
                  {{ file.uploadErrorMessage }}
                </div>
                <div v-else class="registration__form__filename">
                  Belum ada file terpilih.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="registration__form-content--container">
          <div class="registration__form-content--container-title">
            Alamat Desa
          </div>
          <div class="registration__form-content--container__form-group">
            <jds-select
              class="w-full mt-2"
              name="kabupaten/kota"
              :options="[]"
              label="Kabupaten/Kota"
              placeholder="Masukkan nama Kabupaten/Kota"
            />
          </div>
          <div class="registration__form-content--container__form-group">
            <jds-select
              class="w-full mt-2"
              name="Kecamatan"
              :options="[]"
              label="Kecamatan"
              placeholder="Masukkan nama Kecamatan"
            />
          </div>
          <div class="registration__form-content--container__form-group">
            <jds-select
              class="w-full mt-2"
              name="Kelurahan/Desa"
              :options="[]"
              label="Kelurahan/Desa"
              placeholder="Masukkan nama Kelurahan/Desa"
            />
          </div>
        </div>

        <div class="registration__form-content--container">
          <div class="registration__form-content--container-title">
            Lainnya
          </div>
          <BaseInput
            class="mt-2"
            label="Nomor Handphone"
            type="text"
            autofocus
            autocomplete="handphone"
            placeholder="Cth: 0822 2068 9xxx"
          />
          <BaseInput
            class="mt-2"
            label="Alamat Email"
            type="text"
            autofocus
            autocomplete="email"
            placeholder="Cth: agus.permadi@gmail.com"
          />
        </div>
      </div>

      <div class="registration__submit">
        <BaseButton class="registration__submit-btn" variant="secondary" label="Batalkan" @click="$router.push('/')" />
        <BaseButton class="registration__submit-btn" label="Konfirmasi" @click="onSubmit" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      infoProgram: 'Program Desa Digital memiliki beberapa tingkatan/level, yuk cari tahu level desamu.',
      file: {
        isAttached: false,
        fileImage: null,
        source: null,
        uploadErrorMessage: null
      },
      uploadFileSecret: this.$config.apiSecretUpload,
      showModalInfoVillage: false,
      isConfirmEnable: false
    }
  },
  methods: {
    onClickInfo () {
      this.showModalInfoVillage = true
    },
    onCloseModal () {
      this.showModalInfoVillage = false
    },
    onFileChange () {
      // @todo: create upload file
    },
    onSubmit () {
      // @todo: create submit function
    }
  }
}

</script>

<style lang="postcss">
@import './../Questionnaire.pcss';

.jds-select, .jds-input-text, .jds-input-text__input-wrapper, .jds-popover__activator {
  @apply w-full !important;
}

.jds-select, .jds-input-text__input-wrapper {
  position: unset !important;
}

.jds-form-control-label {
  @apply mb-1;
}
</style>
