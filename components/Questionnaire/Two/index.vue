<template>
  <div class="registration__questionnaire-body">
    <div class="registration__form">
      <div class="registration__form-title">
        Kuisioner Desa Digital
      </div>
      <div class="registration__form-content">
        <div class="registration__form-content--container">
          <p class="mb-3 required">
            Komunitas apa saja yang saat ini ada di Desa Bapak/Ibu? (Boleh pilih dari satu)
          </p>
          <label v-for="(item, index) in communities" :key="index" class="custom-checkbox">
            {{ item.value }}
            <input
              v-model="literasi_digital.komunitas.data"
              type="checkbox"
              name="community-list"
              :value="item.value"
              @change="onCommunityListSelected"
            >
            <span class="checkmark" />
          </label>
          <label class="custom-checkbox">
            Tidak ada komunitas
            <input
              type="checkbox"
              name="community-list-none"
              value="Tidak ada komunitas"
              @change="onCommunityListNoneSelected"
            >
            <span class="checkmark" />
          </label>
          <div v-show="isShowTrainingImage" class="grid grid-cols-5 mt-4">
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
                Unggah foto pendamping lokal desa/patriot desa/komunitas yang ada di desa Bapak/Ibu
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
          <p class="mb-3 required">
            Apakah komunitas tersebut pernah mengadakan program atau pelatihan tentang teknologi digital?
          </p>
          <jds-radio-button-group
            id="pelatihan"
            v-model="literasi_digital.pelatihan.data"
            :items="training"
            value-key="value"
            placeholder-key="value"
            name="radio-button-group-pelatihan"
          />
        </div>

        <div v-show="isShowCommunityImage" class="registration__form-content--container">
          <p class="mb-3">
            Pelatihan apa saja yang pernah diberikan?
          </p>
          <div
            :class="{
              'form-text-area' : true,
              'form-text-area--error' : showTrainingErrorMsg
            }"
          >
            <textarea
              v-model.trim="literasi_digital.pelatihan.pelatihan"
              class="form-text-area--text"
              name="Pelatihan"
              placeholder="Masukkan daftar disini"
              rows="5"
            />
          </div>
          <p v-show="showTrainingErrorMsg" class="form-text-area--message">
            {{ errors.training }}
          </p>
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
      <div class="registration__submit">
        <BaseButton class="registration__submit-btn" variant="secondary" label="Kembali" @click="onPrev" />
        <BaseButton class="registration__submit-btn" :variant="buttonQuestionnaireTwoVariant" :disabled="!isValidatedQuestionnaireTwo" label="Selanjutnya" @click="onSubmit" />
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
          data: null,
          photo: {
            path: null,
            original_name: null,
            source: null
          },
          pelatihan: null
        }
      },
      uploadFileSecret: this.$config.apiSecretUpload,
      showModalLevelDesa: false,
      showModalInfoVillage: false,
      villages,
      isShowTrainingImage: false,
      isShowCommunityImage: false,
      showTrainingErrorMsg: false,
      errors: {
        training: false,
        community: false
      }
    }
  },
  computed: {
    isValidatedQuestionnaireTwo () {
      const isCommunityValidated = this.literasi_digital.komunitas.data.length !== 0 && !this.errors.training
      const isTraningValidated = this.literasi_digital.pelatihan.data !== null && !this.errors.community

      return (isCommunityValidated && isTraningValidated)
    },
    buttonQuestionnaireTwoVariant () {
      if (this.isValidatedQuestionnaireTwo) {
        return 'primary'
      } else {
        return 'disabled'
      }
    }
  },
  watch: {
    'literasi_digital.komunitas.data' () {
      if (this.literasi_digital.komunitas.data.length === 0 || this.literasi_digital.komunitas.data.includes('Tidak ada komunitas')) {
        this.isShowTrainingImage = false

        const { komunitas: community } = this.files
        const { komunitas } = this.literasi_digital

        community.isAttached = false
        community.fileImage = null
        community.source = null
        community.uploadErrorMessage = null

        komunitas.photo.path = null
        komunitas.photo.original_name = null
        komunitas.photo.source = null
      } else {
        this.isShowTrainingImage = true
      }
    },
    'literasi_digital.pelatihan.data' () {
      if (this.literasi_digital.pelatihan.data === 'Belum pernah') {
        this.isShowCommunityImage = false
        this.$emit('onClickLevel', false)

        const { pelatihan: training } = this.files
        const { pelatihan } = this.literasi_digital

        training.isAttached = false
        training.fileImage = null
        training.source = null
        training.uploadErrorMessage = null

        pelatihan.pelatihan = null
        pelatihan.photo.path = null
        pelatihan.photo.original_name = null
        pelatihan.photo.source = null
      } else {
        this.isShowCommunityImage = true
        this.$emit('onClickLevel', true)
      }
    },
    'literasi_digital.pelatihan.pelatihan' () {
      const trainingValidation = /(?=.*[^A-Za-z0-9-.,_!@$&*?\s])/g
      if (trainingValidation.test(this.literasi_digital.pelatihan.pelatihan)) {
        this.showTrainingErrorMsg = true
        this.errors.training = 'Karakter yang diperbolehkan (-.,_!@$&*?)'
      } else {
        this.showTrainingErrorMsg = false
        this.errors.training = ''
      }
    }
  },
  methods: {
    onCommunityListSelected () {
      const elCommunityNone = document.getElementsByName('community-list-none')
      if (elCommunityNone[0].checked) {
        elCommunityNone[0].checked = false
        this.literasi_digital.komunitas.data.shift()
      }
    },
    onCommunityListNoneSelected () {
      const elComunnitySelected = document.querySelectorAll("input[name='comunnity-list']")
      const elComunnityNone = document.getElementsByName('community-list-none')
      if (elComunnityNone[0].checked) {
        elComunnitySelected.forEach((element) => {
          element.checked = false
        })
        this.literasi_digital.komunitas.data = ['Tidak ada komunitas']
      } else {
        this.literasi_digital.komunitas.data = []
      }
    },
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
        case ('komunitas'): {
          const elkomunitas = this.$refs.komunitas.files[0]
          if (elkomunitas) {
            const isValidFormat = ['image/png', 'image/jpeg'].includes(elkomunitas.type)
            const { komunitas } = this.files || {}
            if (isValidFormat) {
              if (elkomunitas.size > 1000000) {
                komunitas.isAttached = false
                komunitas.fileImage = null
                komunitas.source = null
                komunitas.uploadErrorMessage = 'Gambar anda melebihi ukuran maksimal'
              } else {
                komunitas.isAttached = true
                komunitas.fileImage = this.setFile(elkomunitas)
                komunitas.source = URL.createObjectURL(elkomunitas)
                komunitas.uploadErrorMessage = ''
              }
            } else {
              komunitas.isAttached = false
              komunitas.fileImage = null
              komunitas.uploadErrorMessage = 'Maaf file yang anda masukan tidak didukung'
            }
            this.submitFile(this.files.komunitas.fileImage)
              .then((response) => {
                const { source, original_name: originalName, path } = response || null
                this.literasi_digital.komunitas.photo.path = path
                this.literasi_digital.komunitas.photo.source = source
                this.literasi_digital.komunitas.photo.original_name = originalName
              })
              .catch(() => {
                komunitas.isAttached = false
                komunitas.fileImage = null
                komunitas.uploadErrorMessage = 'Gambar foto komunitas gagal diupload'
              })
          }
          break
        }
        case ('pelatihan'): {
          const elpelatihan = this.$refs.pelatihan.files[0]
          if (elpelatihan) {
            const isValidFormat = ['image/png', 'image/jpeg'].includes(elpelatihan.type)
            const { pelatihan } = this.files || {}
            if (isValidFormat) {
              if (elpelatihan.size > 1000000) {
                pelatihan.isAttached = false
                pelatihan.fileImage = null
                pelatihan.source = null
                pelatihan.uploadErrorMessage = 'Gambar anda melebihi ukuran maksimal'
              } else {
                pelatihan.isAttached = true
                pelatihan.fileImage = this.setFile(elpelatihan)
                pelatihan.source = URL.createObjectURL(elpelatihan)
                pelatihan.uploadErrorMessage = ''
              }
            } else {
              pelatihan.isAttached = false
              pelatihan.fileImage = null
              pelatihan.uploadErrorMessage = 'Maaf file yang anda masukan tidak didukung'
            }
            this.submitFile(this.files.pelatihan.fileImage)
              .then((response) => {
                const { source, original_name: originalName, path } = response || null
                this.literasi_digital.pelatihan.photo.path = path
                this.literasi_digital.pelatihan.photo.source = source
                this.literasi_digital.pelatihan.photo.original_name = originalName
              })
              .catch(() => {
                pelatihan.isAttached = false
                pelatihan.fileImage = null
                pelatihan.uploadErrorMessage = 'Gambar pelatihan gagal diupload'
              })
          }
          break
        }
      }
    },
    onSubmit () {
      this.$emit('onSubmit', this.literasi_digital)
    },
    onPrev () {
      this.$emit('onPrev')
    }
  }
}

</script>

<style lang="postcss">
@import './../Questionnaire.pcss';
@import '~/assets/css/Custom-checkbox.pcss';
</style>
