<template>
  <div id="registration" class="registration-questionnaire">
    <div class="registration--position">
      <img class="registration__image" src="~/assets/images/FooterBanner.svg" alt="footer banner">
      <div class="registration__questionnaire">
        <div v-if="!showModalLevelDesa" class="registration__questionnaire-body">
          <div class="registration__form">
            <div class="registration__form-title">
              Kuisioner Desa Digital
            </div>
            <div class="registration__form-content">
              <div class="registration__form-content--container">
                <p class="mb-3">
                  Komunitas apa saja yang saat ini ada di Desa Bapak/Ibu? (Boleh pilih dari satu)
                </p>
                <jds-checkbox-group
                  v-model="params.properties.literasi_digital.komunitas.data"
                  :options="communities"
                  value-key="value"
                  label-key="value"
                />
                <div class="grid grid-cols-5 mt-4">
                  <div class="registration__form-col-image">
                    <div
                      :class="{
                        'registration__form__image': true,
                        'registration__form__image--attached': files.komunitas.isAttached
                      }"
                    >
                      <img
                        v-if="files.komunitas.source"
                        class="registration__form__image--attached-uploaded"
                        width="88"
                        height="88"
                        :src="files.komunitas.source"
                        alt="Foto Kendaraan"
                      >
                      <img
                        v-else
                        class="text-gray-500"
                        height="22"
                        width="22"
                        src="@/assets/icons/IconNoImage.svg"
                        alt="No Image"
                      >
                    </div>
                  </div>
                  <div class="registration__form-col-desc">
                    <div class="registration__form__subtitle">
                      Unggah foto pendamping lokal desa/patriot desa/ koumitas yang ada di desa Bapak/Ibu
                    </div>
                    <div class="registration__form__placeholder">
                      File yang didukung adalah .jpg, .jpeg dan .png
                    </div>
                    <div class="registration__form__button">
                      <button class="registration__form__button-btn" type="button" @click="$refs.komunitas.click()">
                        Unggah Foto
                        <jds-icon class="ml-2" size="12px" name="plus-bold" />
                      </button>
                      <input
                        ref="komunitas"
                        type="file"
                        hidden="true"
                        accept="image/png, image/jpeg, image/svg+xml"
                        @change="onFileChange('komunitas')"
                      >
                      <div v-if="files.komunitas.fileImage" class="registration__form__filename">
                        Filename: {{ files.komunitas.fileImage.get('file').name }}
                      </div>
                      <div v-else-if="files.komunitas.uploadErrorMessage" class="registration__form__filename-error">
                        {{ files.komunitas.uploadErrorMessage }}
                      </div>
                      <div v-else class="registration__form__filename">
                        Belum ada file terpilih.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="registration__form-content--container">
                <p class="mb-3">
                  Apakah komunitas tersebut pernah mengadakan program atau pelatihan tentang teknologi digita?
                </p>
                <jds-radio-button-group
                  id="pelatihan"
                  v-model="params.properties.literasi_digital.pelatihan.data"
                  :items="training"
                  value-key="value"
                  placeholder-key="value"
                  name="radio-button-group-pelatihan"
                />
              </div>

              <div class="registration__form-content--container">
                <p class="mb-3">
                  Pelatihan apa saja yang pernah diberikan?
                </p>
                <textarea
                  v-model="params.properties.literasi_digital.pelatihan.pelatihan"
                  class="form-text-area"
                  name="Pelatihan"
                  placeholder="Masukkan pelatihan disini"
                  rows="5"
                />
                <div class="grid grid-cols-5 mt-4">
                  <div class="registration__form-col-image">
                    <div
                      :class="{
                        'registration__form__image': true,
                        'registration__form__image--attached': files.pelatihan.isAttached
                      }"
                    >
                      <img
                        v-if="files.pelatihan.source"
                        class="registration__form__image--attached-uploaded"
                        width="88"
                        height="88"
                        :src="files.pelatihan.source"
                        alt="Foto pelatihan"
                      >
                      <img
                        v-else
                        class="text-gray-500"
                        height="22"
                        width="22"
                        src="@/assets/icons/IconNoImage.svg"
                        alt="No Image"
                      >
                    </div>
                  </div>
                  <div class="registration__form-col-desc">
                    <div class="registration__form__subtitle">
                      Unggah foto kegiatan pelatihan yang pernah dilakukan
                    </div>
                    <div class="registration__form__placeholder">
                      File yang didukung adalah .jpg, .jpeg dan .png
                    </div>
                    <div class="registration__form__button">
                      <button class="registration__form__button-btn" type="button" @click="$refs.pelatihan.click()">
                        Unggah Foto
                        <jds-icon class="ml-2" size="12px" name="plus-bold" />
                      </button>
                      <input
                        ref="pelatihan"
                        type="file"
                        hidden="true"
                        accept="image/png, image/jpeg, image/svg+xml"
                        @change="onFileChange('pelatihan')"
                      >
                      <div v-if="files.pelatihan.fileImage" class="registration__form__filename">
                        Filename: {{ files.pelatihan.fileImage.get('file').name }}
                      </div>
                      <div v-else-if="files.pelatihan.uploadErrorMessage" class="registration__form__filename-error">
                        {{ files.pelatihan.uploadErrorMessage }}
                      </div>
                      <div v-else class="registration__form__filename">
                        Belum ada file terpilih.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="registration__submit">
            <BaseButton class="registration__submit-btn" variant="secondary" label="Kembali" @click="onPreviousPage" />
            <BaseButton class="registration__submit-btn" label="Selanjutnya" @click="onSubmit" />
          </div>
        </div>

        <ModalQuestionnaire v-else :chosen-level="params.level" :village-types="villages" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  communities,
  training,
  villages
} from '@/constants/questionnaire.js'
export default {
  data () {
    return {
      communities,
      training,
      files: {
        komunitas: {
          isAttached: false,
          fileImage: null,
          source: null,
          uploadErrorMessage: null
        },
        pelatihan: {
          isAttached: false,
          fileImage: null,
          source: null,
          uploadErrorMessage: null
        }
      },
      params: {
        id: '32.09.21.2001', // @todo: remove this in next feature (id desa search)
        level: 2,
        properties: {
          literasi_digital: {
            komunitas: {
              data: [],
              photo: {
                path: null,
                original_name: null,
                source: null
              }
            },
            pelatihan: {
              data: '',
              photo: {
                path: null,
                original_name: null,
                source: null
              },
              pelatihan: ''
            }
          }
        }
      },
      uploadFileSecret: this.$config.apiSecretUpload,
      showModalLevelDesa: false,
      showModalInfoVillage: false,
      villages
    }
  },
  methods: {
    onFileChange () {
      // @todo: handle input image
    },
    async onSubmit () {
      // @todo: handle submit form
    },
    onPreviousPage () {
      // @todo: create method to show previous
    }
  }
}

</script>

<style lang="postcss">
@import './../Questionnaire.pcss';
</style>
