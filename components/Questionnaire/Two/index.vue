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
                    Apakah komunitas tersebut pernah mengadakan program atau pelatihan tentang teknologi digital?
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
              <div class="registration__submit">
                <BaseButton class="registration__submit-btn" variant="secondary" label="Kembali" @click="onPreviousPage" />
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
  watch: {
    'params.properties.literasi_digital.pelatihan.data' () {
      if (this.params.properties.literasi_digital.pelatihan.data === 'Belum pernah') {
        this.params.level = 2
      } else {
        this.params.level = 3
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
                this.params.properties.literasi_digital.komunitas.photo.path = path
                this.params.properties.literasi_digital.komunitas.photo.source = source
                this.params.properties.literasi_digital.komunitas.photo.original_name = originalName
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
                this.params.properties.literasi_digital.pelatihan.photo.path = path
                this.params.properties.literasi_digital.pelatihan.photo.source = source
                this.params.properties.literasi_digital.pelatihan.photo.original_name = originalName
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
      if (this.params.level === 2) {
        // @todo: continue to create validation for questionnaire three
        this.showModalLevelDesa = true
      } else {
        // @todo: continue to questionnaire three on next pull request
        this.showModalLevelDesa = false
      }
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
