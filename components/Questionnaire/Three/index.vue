<template>
  <div class="registration__questionnaire-body">
    <div class="registration__form">
      <div class="registration__form-title">
        Kuisioner Desa Digital
      </div>
      <div v-show="!isShowPotency" class="registration__form-content">
        <div class="registration__form-content--container">
          <p class="mb-3">
            Dari pilihan berikut, sosial media apa yang dikelola secara resmi oleh perangkat desa Bapak/Ibu?
          </p>
          <jds-checkbox-group
            v-model="properties.tentang_bumdes.sosial_media.data"
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
            v-model="properties.tentang_bumdes.bumdes.data"
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
                Unggah foto BUMDes yang ada di desa Bapak/Ibu
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
            Tuliskan nama BUMDes yang ada di desa Bapak/Ibu
          </p>
          <textarea
            v-model="properties.tentang_bumdes.bumdes.bumdes"
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
            v-model="properties.tentang_bumdes.komoditas.data"
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
                Unggah foto Komoditas atau kegiatan yang dilakukan oleh BUMDes di desa Bapak/Ibu
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

      <div v-show="isShowPotency" class="registration__form-content">
        <div class="registration__form-content--container">
          <p class="mb-3">
            Apakah desa tempat Bapak/Ibu tinggal memiliki potensi yang dapat dikembangkan?
          </p>
          <jds-radio-button-group
            id="potency"
            v-model="properties.potensi_desa.data"
            :items="optionsPotency"
            value-key="value"
            placeholder-key="value"
            name="radio-button-group-bumdes"
          />
        </div>

        <div class="registration__form-content--container">
          <p class="mb-3">
            Jika ada, ceritakan potensi yang dapat dikembangkan dari desa tempat Bapak/Ibu tinggal?
          </p>
          <textarea
            v-model="properties.potensi_desa.potensi_dapat_dikembangkan"
            class="form-text-area"
            name="Daftar potensi"
            placeholder="Masukkan disini"
            rows="4"
          />
          <div class="grid grid-cols-5 mt-4">
            <div class="registration__form-col-image">
              <div
                :class="{
                  'registration__form__image': true,
                  'registration__form__image--attached': files.potency.isAttached
                }"
              >
                <img
                  v-if="files.potency.source"
                  class="registration__form__image--attached-uploaded"
                  width="88"
                  height="88"
                  :src="files.potency.source"
                  alt="Foto potensi"
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
                Unggah foto potensi yang dapat dikembangkan di desa Bapak/Ibu
              </div>
              <div class="registration__form__placeholder">
                File yang didukung adalah .jpg, .jpeg dan .png
              </div>
              <div class="registration__form__button">
                <button class="registration__form__button-btn" type="button" @click="$refs.potency.click()">
                  Unggah Foto
                  <jds-icon class="ml-2" size="12px" name="plus-bold" />
                </button>
                <input
                  ref="potency"
                  type="file"
                  hidden="true"
                  accept="image/png, image/jpeg, image/svg+xml"
                  @change="onFileChange('potency')"
                >
                <div v-if="files.potency.fileImage" class="registration__form__filename">
                  Filename: {{ files.potency.fileImage.get('file').name }}
                </div>
                <div v-else-if="files.potency.uploadErrorMessage" class="registration__form__filename-error">
                  {{ files.potency.uploadErrorMessage }}
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
        <BaseButton class="registration__submit-btn" variant="secondary" label="Kembali" @click="onPreviousPage" />
        <BaseButton class="registration__submit-btn" label="Selanjutnya" @click="onSubmit" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  optionsSocialMedia,
  optionsBumdes,
  optionsPotency,
  villages
} from '@/constants/questionnaire.js'
export default {
  data () {
    return {
      optionsSocialMedia,
      optionsBumdes,
      optionsPotency,
      page: 1,
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
        },
        potency: {
          isAttached: false,
          fileImage: null,
          source: null,
          uploadErrorMessage: null
        }
      },
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
        },
        potensi_desa: {
          data: '',
          potensi_dapat_dikembangkan: '',
          photo: {
            path: null,
            original_name: null,
            source: null
          }
        }
      },
      uploadFileSecret: this.$config.apiSecretUpload,
      showModalLevelDesa: false,
      isShowPotency: false,
      villages
    }
  },
  watch: {
    'properties.potensi_desa.data' () {
      if (this.properties.potensi_desa.data && this.properties.potensi_desa.data === 'Belum ada potensi') {
        this.$emit('onClickLevel', false)
      } else {
        this.$emit('onClickLevel', true)
      }
    }
  },
  methods: {
    setFile (value) {
      const formData = new FormData()
      formData.append('file', value)
      return formData
    },
    submitFile (image) {
      return new Promise((resolve, reject) => {
        this.$axios.post('/files/upload', image, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-api-key': this.uploadFileSecret
          }
        }).then((response) => {
          const { data } = response.data
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    onFileChange (category) {
      switch (category) {
        case ('socialMedia'): {
          const elSocialMedia = this.$refs.socialMedia.files[0]
          if (elSocialMedia) {
            const isValidFormat = ['image/png', 'image/jpeg'].includes(elSocialMedia.type)
            const { socialMedia } = this.files || {}
            if (isValidFormat) {
              if (elSocialMedia.size > 1000000) {
                socialMedia.isAttached = false
                socialMedia.fileImage = null
                socialMedia.source = null
                socialMedia.uploadErrorMessage = 'Gambar anda melebihi ukuran maksimal'
              } else {
                socialMedia.isAttached = true
                socialMedia.fileImage = this.setFile(elSocialMedia)
                socialMedia.source = URL.createObjectURL(elSocialMedia)
                socialMedia.uploadErrorMessage = ''
              }
            } else {
              socialMedia.isAttached = false
              socialMedia.fileImage = null
              socialMedia.uploadErrorMessage = 'Maaf file yang anda masukan tidak didukung'
            }
            this.submitFile(this.files.socialMedia.fileImage)
              .then((response) => {
                const { source, original_name: originalName, path } = response || null
                this.properties.tentang_bumdes.sosial_media.photo.path = path
                this.properties.tentang_bumdes.sosial_media.photo.source = source
                this.properties.tentang_bumdes.sosial_media.photo.original_name = originalName
              })
              .catch(() => {
                socialMedia.isAttached = false
                socialMedia.fileImage = null
                socialMedia.source = null
                socialMedia.uploadErrorMessage = 'Gambar foto social media gagal diupload'
              })
          }
          break
        }
        case ('bumdes'): {
          const elBumdes = this.$refs.bumdes.files[0]
          if (elBumdes) {
            const isValidFormat = ['image/png', 'image/jpeg'].includes(elBumdes.type)
            const { bumdes } = this.files || {}
            if (isValidFormat) {
              if (elBumdes.size > 1000000) {
                bumdes.isAttached = false
                bumdes.fileImage = null
                bumdes.source = null
                bumdes.uploadErrorMessage = 'Gambar anda melebihi ukuran maksimal'
              } else {
                bumdes.isAttached = true
                bumdes.fileImage = this.setFile(elBumdes)
                bumdes.source = URL.createObjectURL(elBumdes)
                bumdes.uploadErrorMessage = ''
              }
            } else {
              bumdes.isAttached = false
              bumdes.fileImage = null
              bumdes.uploadErrorMessage = 'Maaf file yang anda masukan tidak didukung'
            }
            this.submitFile(this.files.bumdes.fileImage)
              .then((response) => {
                const { source, original_name: originalName, path } = response || null
                this.properties.tentang_bumdes.bumdes.photo.path = path
                this.properties.tentang_bumdes.bumdes.photo.source = source
                this.properties.tentang_bumdes.bumdes.photo.original_name = originalName
              })
              .catch(() => {
                bumdes.isAttached = false
                bumdes.fileImage = null
                bumdes.source = null
                bumdes.uploadErrorMessage = 'Gambar BUMDes gagal diupload'
              })
          }
          break
        }
        case ('komoditas'): {
          const elKomoditas = this.$refs.komoditas.files[0]
          if (elKomoditas) {
            const isValidFormat = ['image/png', 'image/jpeg'].includes(elKomoditas.type)
            const { komoditas } = this.files || {}
            if (isValidFormat) {
              if (elKomoditas.size > 1000000) {
                komoditas.isAttached = false
                komoditas.fileImage = null
                komoditas.source = null
                komoditas.uploadErrorMessage = 'Gambar anda melebihi ukuran maksimal'
              } else {
                komoditas.isAttached = true
                komoditas.fileImage = this.setFile(elKomoditas)
                komoditas.source = URL.createObjectURL(elKomoditas)
                komoditas.uploadErrorMessage = ''
              }
            } else {
              komoditas.isAttached = false
              komoditas.fileImage = null
              komoditas.uploadErrorMessage = 'Maaf file yang anda masukan tidak didukung'
            }
            this.submitFile(this.files.komoditas.fileImage)
              .then((response) => {
                const { source, original_name: originalName, path } = response || null
                this.properties.tentang_bumdes.komoditas.photo.path = path
                this.properties.tentang_bumdes.komoditas.photo.source = source
                this.properties.tentang_bumdes.komoditas.photo.original_name = originalName
              })
              .catch(() => {
                komoditas.isAttached = false
                komoditas.fileImage = null
                komoditas.source = null
                komoditas.uploadErrorMessage = 'Gambar komoditas gagal diupload'
              })
          }
          break
        }
        case ('potency'): {
          const elPotency = this.$refs.potency.files[0]
          if (elPotency) {
            const isValidFormat = ['image/png', 'image/jpeg'].includes(elPotency.type)
            const { potency } = this.files || {}
            if (isValidFormat) {
              if (elPotency.size > 1000000) {
                potency.isAttached = false
                potency.fileImage = null
                potency.source = null
                potency.uploadErrorMessage = 'Gambar anda melebihi ukuran maksimal'
              } else {
                potency.isAttached = true
                potency.fileImage = this.setFile(elPotency)
                potency.source = URL.createObjectURL(elPotency)
                potency.uploadErrorMessage = ''
              }
            } else {
              potency.isAttached = false
              potency.fileImage = null
              potency.uploadErrorMessage = 'Maaf file yang anda masukan tidak didukung'
            }
            this.submitFile(this.files.potency.fileImage)
              .then((response) => {
                const { source, original_name: originalName, path } = response || null
                this.properties.potensi_desa.photo.path = path
                this.properties.potensi_desa.photo.source = source
                this.properties.potensi_desa.photo.original_name = originalName
              })
              .catch(() => {
                potency.isAttached = false
                potency.fileImage = null
                potency.source = null
                potency.uploadErrorMessage = 'Gambar potensi desa gagal diupload'
              })
          }
          break
        }
      }
    },
    onSubmit () {
      if (!this.isShowPotency) {
        this.isShowPotency = true
      } else {
        this.$emit('onSubmit', this.properties)
      }
    },
    onPreviousPage () {
      // @todo : change into vuex store
      if (this.isShowPotency) {
        this.isShowPotency = false
      } else {
        this.$emit('onPrev')
      }
    }
  }
}

</script>

<style lang="postcss">
@import './../Questionnaire.pcss';
</style>
