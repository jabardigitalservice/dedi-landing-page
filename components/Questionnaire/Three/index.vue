<template>
  <div id="registration" class="registration-questionnaire">
    <div class="registration--position">
      <img class="registration__image" src="~/assets/images/FooterBanner.svg" alt="footer banner">
      <div class="registration__questionnaire">
        <div v-if="!showModalLevelDesa">
          <div class="registration__questionnaire-body">
            <div class="registration__form">
              <div class="registration__form-title">
                Kuisioner Desa Digital
              </div>
              <div class="registration__form-content">
                <div class="registration__form-content--container">
                  <p class="mb-3">
                    Dari pilihan berikut, sosial media apa yang dikelola secara resmi oleh perangkat desa Bapak/Ibu?
                  </p>
                  <jds-checkbox-group
                    v-model="params.properties.tentang_bumdes.sosial_media.data"
                    :options="optionsSocialMedia"
                    value-key="value"
                    label-key="value"
                  />
                  <div class="grid grid-cols-5 mt-4">
                    <div class="registration__form-col-image">
                      <div
                        :class="{
                          'registration__form__image': true,
                          'registration__form__image--attached': files.socialMedia.isAttached
                        }"
                      >
                        <img
                          v-if="files.socialMedia.source"
                          class="registration__form__image--attached-uploaded"
                          width="88"
                          height="88"
                          :src="files.socialMedia.source"
                          alt="Foto Social Media"
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
                        Unggah screenshoot social media yang dimiliki desa
                      </div>
                      <div class="registration__form__placeholder">
                        File yang didukung adalah .jpg, .jpeg dan .png
                      </div>
                      <div class="registration__form__button">
                        <button class="registration__form__button-btn" type="button" @click="$refs.socialMedia.click()">
                          Unggah Foto
                          <jds-icon class="ml-2" size="12px" name="plus-bold" />
                        </button>
                        <input
                          ref="socialMedia"
                          type="file"
                          hidden="true"
                          accept="image/png, image/jpeg, image/svg+xml"
                          @change="onFileChange('socialMedia')"
                        >
                        <div v-if="files.socialMedia.fileImage" class="registration__form__filename">
                          Filename: {{ files.socialMedia.fileImage.get('file').name }}
                        </div>
                        <div v-else-if="files.socialMedia.uploadErrorMessage" class="registration__form__filename-error">
                          {{ files.socialMedia.uploadErrorMessage }}
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
                    Apakah ada BUMDes (Badan Usaha Milik Desa) di desa Bapak/Ibu?
                  </p>
                  <jds-radio-button-group
                    id="bumdes"
                    v-model="params.properties.tentang_bumdes.bumdes.data"
                    :items="optionsBumdes"
                    value-key="value"
                    placeholder-key="value"
                    name="radio-button-group-bumdes"
                  />
                  <div class="grid grid-cols-5 mt-4">
                    <div class="registration__form-col-image">
                      <div
                        :class="{
                          'registration__form__image': true,
                          'registration__form__image--attached': files.bumdes.isAttached
                        }"
                      >
                        <img
                          v-if="files.bumdes.source"
                          class="registration__form__image--attached-uploaded"
                          width="88"
                          height="88"
                          :src="files.bumdes.source"
                          alt="Foto BUMDes"
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
                        Unggah foto BUMDes yang ada di desa Bapak dan Ibu
                      </div>
                      <div class="registration__form__placeholder">
                        File yang didukung adalah .jpg, .jpeg dan .png
                      </div>
                      <div class="registration__form__button">
                        <button class="registration__form__button-btn" type="button" @click="$refs.bumdes.click()">
                          Unggah Foto
                          <jds-icon class="ml-2" size="12px" name="plus-bold" />
                        </button>
                        <input
                          ref="bumdes"
                          type="file"
                          hidden="true"
                          accept="image/png, image/jpeg, image/svg+xml"
                          @change="onFileChange('bumdes')"
                        >
                        <div v-if="files.bumdes.fileImage" class="registration__form__filename">
                          Filename: {{ files.bumdes.fileImage.get('file').name }}
                        </div>
                        <div v-else-if="files.bumdes.uploadErrorMessage" class="registration__form__filename-error">
                          {{ files.bumdes.uploadErrorMessage }}
                        </div>
                        <div v-else class="registration__form__filename">
                          Belum ada file terpilih.
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="mb-3">
                    Tuliskan nama BUMDes yang ada di desa Bapak dan Ibu
                  </p>
                  <textarea
                    v-model="params.properties.tentang_bumdes.bumdes.bumdes"
                    class="form-text-area"
                    name="Nama BUMDes"
                    placeholder="Masukkan disini"
                    rows="3"
                  />
                </div>

                <div class="registration__form-content--container">
                  <p class="mb-3">
                    Jika ada, komoditas apa yang dikelola/diproduksi oleh BUMDes di desa Bapak/Ibu?
                  </p>
                  <textarea
                    v-model="params.properties.tentang_bumdes.komoditas.data"
                    class="form-text-area"
                    name="Daftar komoditas"
                    placeholder="Masukkan disini"
                    rows="3"
                  />
                  <div class="grid grid-cols-5 mt-4">
                    <div class="registration__form-col-image">
                      <div
                        :class="{
                          'registration__form__image': true,
                          'registration__form__image--attached': files.komoditas.isAttached
                        }"
                      >
                        <img
                          v-if="files.komoditas.source"
                          class="registration__form__image--attached-uploaded"
                          width="88"
                          height="88"
                          :src="files.komoditas.source"
                          alt="Foto Komoditas"
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
                        Unggah foto Komoditas atau kegiatan yang dilakukan oleh BUMDes di desa Bapak dan Ibu
                      </div>
                      <div class="registration__form__placeholder">
                        File yang didukung adalah .jpg, .jpeg dan .png
                      </div>
                      <div class="registration__form__button">
                        <button class="registration__form__button-btn" type="button" @click="$refs.komoditas.click()">
                          Unggah Foto
                          <jds-icon class="ml-2" size="12px" name="plus-bold" />
                        </button>
                        <input
                          ref="komoditas"
                          type="file"
                          hidden="true"
                          accept="image/png, image/jpeg, image/svg+xml"
                          @change="onFileChange('komoditas')"
                        >
                        <div v-if="files.komoditas.fileImage" class="registration__form__filename">
                          Filename: {{ files.komoditas.fileImage.get('file').name }}
                        </div>
                        <div v-else-if="files.komoditas.uploadErrorMessage" class="registration__form__filename-error">
                          {{ files.komoditas.uploadErrorMessage }}
                        </div>
                        <div v-else class="registration__form__filename">
                          Belum ada file terpilih.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="registration__submit">
                <BaseButton class="registration__submit-btn" label="Selanjutnya" @click="onSubmit" />
              </div>
            </div>
          </div>
        </div>

        <ModalQuestionnaire v-else :chosen-level="params.level" :village-types="villages" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  optionsSocialMedia,
  optionsBumdes,
  villages
} from '@/constants/questionnaire.js'
export default {
  data () {
    return {
      optionsSocialMedia,
      optionsBumdes,
      files: {
        socialMedia: {
          isAttached: false,
          fileImage: null,
          source: null,
          uploadErrorMessage: null
        },
        bumdes: {
          isAttached: false,
          fileImage: null,
          source: null,
          uploadErrorMessage: null
        },
        komoditas: {
          isAttached: false,
          fileImage: null,
          source: null,
          uploadErrorMessage: null
        }
      },
      params: {
        id: '32.09.21.2001', // @todo: remove this in next feature (id desa search)
        level: 3,
        properties: {
          tentang_bumdes: {
            sosial_media: {
              data: [],
              photo: {
                path: null,
                original_name: null,
                source: null
              }
            },
            bumdes: {
              data: '',
              photo: {
                path: null,
                original_name: null,
                source: null
              },
              bumdes: ''
            },
            komoditas: {
              data: '',
              photo: {
                path: null,
                original_name: null,
                source: null
              }
            }
          }
        }
      },
      uploadFileSecret: this.$config.apiSecretUpload,
      showModalLevelDesa: false,
      villages
    }
  },
  methods: {
    onFileChange (category) {
      // @todo: handle input image
    },
    onSubmit () {
      // @todo: handle submit form
    }
  }
}

</script>

<style lang="postcss">
@import './../Questionnaire.pcss';
</style>
