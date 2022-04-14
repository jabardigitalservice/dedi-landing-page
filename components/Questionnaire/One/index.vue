<template>
  <div id="registration" class="registration-questionnaire">
    <div class="registration--position">
      <img class="registration__image" src="~/assets/images/FooterBanner.svg" alt="footer banner">
      <div class="registration__questionnaire">
        <div v-if="!showModalLevelDesa">
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

                <!-- @todo: remove this section container in next feature (id desa search) -->
                <div class="registration__form-content--container">
                  <jds-input-text v-model="params.id" placeholder="ID Desa" />
                </div>

                <div class="registration__form-content--container">
                  <p class="mb-3">
                    Apakah desa tempat Bapak/Ibu tinggal dapat diakses oleh kendaraan?
                  </p>
                  <jds-checkbox-group
                    v-model="params.properties.fasilitas_desa.akses_kendaraan.data"
                    :options="optionsKendaraan"
                    value-key="value"
                    label-key="value"
                  />
                  <div class="grid grid-cols-5 mt-4">
                    <div class="registration__form-col-image">
                      <div
                        :class="{
                          'registration__form__image': true,
                          'registration__form__image--attached': files.kendaraan.isAttached
                        }"
                      >
                        <img
                          v-if="files.kendaraan.source"
                          class="registration__form__image--attached-uploaded"
                          width="88"
                          height="88"
                          :src="files.kendaraan.source"
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
                        Unggah foto jalan/akses kendaraan
                      </div>
                      <div class="registration__form__placeholder">
                        File yang didukung adalah .jpg, .jpeg dan .png
                      </div>
                      <div class="registration__form__button">
                        <button class="registration__form__button-btn" type="button" @click="$refs.kendaraan.click()">
                          Unggah Foto
                          <jds-icon class="ml-2" size="12px" name="plus-bold" />
                        </button>
                        <input
                          ref="kendaraan"
                          type="file"
                          hidden="true"
                          accept="image/png, image/jpeg, image/svg+xml"
                          @change="onFileChange('kendaraan')"
                        >
                        <div v-if="files.kendaraan.fileImage" class="registration__form__filename">
                          Filename: {{ files.kendaraan.fileImage.get('file').name }}
                        </div>
                        <div v-else-if="files.kendaraan.uploadErrorMessage" class="registration__form__filename-error">
                          {{ files.kendaraan.uploadErrorMessage }}
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
                    Apakah desa tempat Bapak/Ibu tinggal sudah terdapat suplai listrik?
                  </p>
                  <jds-radio-button-group
                    id="listrik"
                    v-model="params.properties.fasilitas_desa.suplai_listrik.data"
                    :items="optionsSuplaiListrik"
                    value-key="value"
                    placeholder-key="value"
                    name="radio-button-group-listrik"
                  />
                  <div class="grid grid-cols-5 mt-4">
                    <div class="registration__form-col-image">
                      <div
                        :class="{
                          'registration__form__image': true,
                          'registration__form__image--attached': files.listrik.isAttached
                        }"
                      >
                        <img
                          v-if="files.listrik.source"
                          class="registration__form__image--attached-uploaded"
                          width="88"
                          height="88"
                          :src="files.listrik.source"
                          alt="Foto Suplai Listrik"
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
                        Unggah foto tiang listrik/peralatan elektronik yang sedang menyala
                      </div>
                      <div class="registration__form__placeholder">
                        File yang didukung adalah .jpg, .jpeg dan .png
                      </div>
                      <div class="registration__form__button">
                        <button class="registration__form__button-btn" type="button" @click="$refs.listrik.click()">
                          Unggah Foto
                          <jds-icon class="ml-2" size="12px" name="plus-bold" />
                        </button>
                        <input
                          ref="listrik"
                          type="file"
                          hidden="true"
                          accept="image/png, image/jpeg, image/svg+xml"
                          @change="onFileChange('listrik')"
                        >
                        <div v-if="files.listrik.fileImage" class="registration__form__filename">
                          Filename: {{ files.listrik.fileImage.get('file').name }}
                        </div>
                        <div v-else-if="files.listrik.uploadErrorMessage" class="registration__form__filename-error">
                          {{ files.listrik.uploadErrorMessage }}
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
                    Apakah desa tempat Bapak/Ibu tinggal sudah terdapat jaringan telepon seluler?
                  </p>
                  <jds-radio-button-group
                    id="seluler"
                    v-model="params.properties.fasilitas_desa.jaringan_telepon.data"
                    :items="optionsSeluler"
                    value-key="value"
                    placeholder-key="value"
                    name="radio-button-group-seluler"
                  />
                  <div class="grid grid-cols-5 mt-4">
                    <div class="registration__form-col-image">
                      <div
                        :class="{
                          'registration__form__image': true,
                          'registration__form__image--attached': files.seluler.isAttached
                        }"
                      >
                        <img
                          v-if="files.seluler.source"
                          class="registration__form__image--attached-uploaded"
                          width="88"
                          height="88"
                          :src="files.seluler.source"
                          alt="Foto Seluler"
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
                        Unggah foto tiang telepon/ screenshoot handphone untuk mengetahui kualitas sinyal
                      </div>
                      <div class="registration__form__placeholder">
                        File yang didukung adalah .jpg, .jpeg dan .png
                      </div>
                      <div class="registration__form__button">
                        <button class="registration__form__button-btn" type="button" @click="$refs.seluler.click()">
                          Unggah Foto
                          <jds-icon class="ml-2" size="12px" name="plus-bold" />
                        </button>
                        <input
                          ref="seluler"
                          type="file"
                          hidden="true"
                          accept="image/png, image/jpeg, image/svg+xml"
                          @change="onFileChange('seluler')"
                        >
                        <div v-if="files.seluler.fileImage" class="registration__form__filename">
                          Filename: {{ files.seluler.fileImage.get('file').name }}
                        </div>
                        <div v-else-if="files.seluler.uploadErrorMessage" class="registration__form__filename-error">
                          {{ files.seluler.uploadErrorMessage }}
                        </div>
                        <div v-else class="registration__form__filename">
                          Belum ada file terpilih.
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="mb-3">
                    Tuliskan daftar penyedia layanan telekomunikasi yang ada di sekitar anda (Telkomsel/XL/Tri/dan lain-lain)
                  </p>
                  <textarea
                    v-model="params.properties.fasilitas_desa.jaringan_telepon.operator"
                    class="form-text-area"
                    name="Daftar layanan telekomunikasi"
                    placeholder="Masukkan daftar disini"
                    rows="5"
                  />
                </div>

                <div class="registration__form-content--container">
                  <p class="mb-3">
                    Apakah desa tempat Bapak/Ibu tinggal sudah terdapat akses internet?
                  </p>
                  <jds-radio-button-group
                    id="internet"
                    v-model="params.properties.fasilitas_desa.jaringan_internet.data"
                    :items="optionsInternet"
                    value-key="value"
                    placeholder-key="value"
                    name="radio-button-group-internet"
                  />
                  <div class="grid grid-cols-5 mt-4">
                    <div class="registration__form-col-image">
                      <div
                        :class="{
                          'registration__form__image': true,
                          'registration__form__image--attached': files.internet.isAttached
                        }"
                      >
                        <img
                          v-if="files.internet.source"
                          class="registration__form__image--attached-uploaded"
                          width="88"
                          height="88"
                          :src="files.internet.source"
                          alt="Foto Jaringan Internet"
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
                        Unggah foto modem/wifi/screenshoot handphone untuk mengetahui kualitas data (LTE/3G)
                      </div>
                      <div class="registration__form__placeholder">
                        File yang didukung adalah .jpg, .jpeg dan .png
                      </div>
                      <div class="registration__form__button">
                        <button class="registration__form__button-btn" type="button" @click="$refs.internet.click()">
                          Unggah Foto
                          <jds-icon class="ml-2" size="12px" name="plus-bold" />
                        </button>
                        <input
                          ref="internet"
                          type="file"
                          hidden="true"
                          accept="image/png, image/jpeg, image/svg+xml"
                          @change="onFileChange('internet')"
                        >
                        <div v-if="files.internet.fileImage" class="registration__form__filename">
                          Filename: {{ files.internet.fileImage.get('file').name }}
                        </div>
                        <div v-else-if="files.internet.uploadErrorMessage" class="registration__form__filename-error">
                          {{ files.internet.uploadErrorMessage }}
                        </div>
                        <div v-else class="registration__form__filename">
                          Belum ada file terpilih.
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="mb-3">
                    Tuliskan daftar website atau aplikasi yang sering diakses
                  </p>
                  <textarea
                    v-model="params.properties.fasilitas_desa.jaringan_internet.website"
                    class="form-text-area"
                    name="Daftar website / aplikasi"
                    placeholder="Masukkan daftar disini"
                    rows="5"
                  />
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
  optionsKendaraan,
  optionsSuplaiListrik,
  optionsSeluler,
  optionsInternet,
  villages
} from '@/constants/questionnaire.js'
export default {
  data () {
    return {
      infoProgram: 'Program Desa Digital memiliki beberapa tingkatan/level, yuk cari tahu level desamu.',
      optionsKendaraan,
      optionsSuplaiListrik,
      optionsSeluler,
      optionsInternet,
      files: {
        kendaraan: {
          isAttached: false,
          fileImage: null,
          source: null,
          uploadErrorMessage: null
        },
        listrik: {
          isAttached: false,
          fileImage: null,
          source: null,
          uploadErrorMessage: null
        },
        seluler: {
          isAttached: false,
          fileImage: null,
          source: null,
          uploadErrorMessage: null
        },
        internet: {
          isAttached: false,
          fileImage: null,
          source: null,
          uploadErrorMessage: null
        }
      },
      params: {
        id: '32.09.21.2001', // @todo: remove this in next feature (id desa search)
        level: 1,
        properties: {
          fasilitas_desa: {
            akses_kendaraan: {
              data: [],
              photo: {
                path: null,
                original_name: null,
                source: null
              }
            },
            suplai_listrik: {
              data: '',
              photo: {
                path: null,
                original_name: null,
                source: null
              }
            },
            jaringan_telepon: {
              data: '',
              photo: {
                path: null,
                original_name: null,
                source: null
              },
              operator: ''
            },
            jaringan_internet: {
              data: '',
              photo: {
                path: null,
                original_name: null,
                source: null
              },
              website: ''
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
    'params.properties.fasilitas_desa.jaringan_internet.data' () {
      if (this.params.properties.fasilitas_desa.jaringan_internet.data === 'Belum ada jaringan internet') {
        this.params.level = 1
      } else {
        this.params.level = 2
      }
    }
  },
  methods: {
    onClickInfo () {
      this.showModalInfoVillage = true
    },
    onCloseModal () {
      this.showModalInfoVillage = false
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
        case ('kendaraan'): {
          const elKendaraan = this.$refs.kendaraan.files[0]
          if (elKendaraan) {
            const isValidFormat = ['image/png', 'image/jpeg'].includes(elKendaraan.type)
            const { kendaraan } = this.files || {}
            if (isValidFormat) {
              if (elKendaraan.size > 1000000) {
                kendaraan.isAttached = false
                kendaraan.fileImage = null
                kendaraan.source = null
                kendaraan.uploadErrorMessage = 'Gambar anda melebihi ukuran maksimal'
              } else {
                kendaraan.isAttached = true
                kendaraan.fileImage = this.setFile(elKendaraan)
                kendaraan.source = URL.createObjectURL(elKendaraan)
                kendaraan.uploadErrorMessage = ''
              }
            } else {
              kendaraan.isAttached = false
              kendaraan.fileImage = null
              kendaraan.uploadErrorMessage = 'Maaf file yang anda masukan tidak didukung'
            }
            this.submitFile(this.files.kendaraan.fileImage)
              .then((response) => {
                const { source, original_name: originalName, path } = response || null
                this.params.properties.fasilitas_desa.akses_kendaraan.photo.path = path
                this.params.properties.fasilitas_desa.akses_kendaraan.photo.source = source
                this.params.properties.fasilitas_desa.akses_kendaraan.photo.original_name = originalName
              })
              .catch(() => {
                kendaraan.isAttached = false
                kendaraan.fileImage = null
                kendaraan.uploadErrorMessage = 'Gambar foto jalan/akses kendaraan gagal diupload'
              })
          }
          break
        }
        case ('listrik'): {
          const elListrik = this.$refs.listrik.files[0]
          if (elListrik) {
            const isValidFormat = ['image/png', 'image/jpeg'].includes(elListrik.type)
            const { listrik } = this.files || {}
            if (isValidFormat) {
              if (elListrik.size > 1000000) {
                listrik.isAttached = false
                listrik.fileImage = null
                listrik.source = null
                listrik.uploadErrorMessage = 'Gambar anda melebihi ukuran maksimal'
              } else {
                listrik.isAttached = true
                listrik.fileImage = this.setFile(elListrik)
                listrik.source = URL.createObjectURL(elListrik)
                listrik.uploadErrorMessage = ''
              }
            } else {
              listrik.isAttached = false
              listrik.fileImage = null
              listrik.uploadErrorMessage = 'Maaf file yang anda masukan tidak didukung'
            }
            this.submitFile(this.files.listrik.fileImage)
              .then((response) => {
                const { source, original_name: originalName, path } = response || null
                this.params.properties.fasilitas_desa.suplai_listrik.photo.path = path
                this.params.properties.fasilitas_desa.suplai_listrik.photo.source = source
                this.params.properties.fasilitas_desa.suplai_listrik.photo.original_name = originalName
              })
              .catch(() => {
                listrik.isAttached = false
                listrik.fileImage = null
                listrik.uploadErrorMessage = 'Gambar tiang listrik/peralatan elektronik gagal diupload'
              })
          }
          break
        }
        case ('seluler'): {
          const elSeluler = this.$refs.seluler.files[0]
          if (elSeluler) {
            const isValidFormat = ['image/png', 'image/jpeg'].includes(elSeluler.type)
            const { seluler } = this.files || {}
            if (isValidFormat) {
              if (elSeluler.size > 1000000) {
                seluler.isAttached = false
                seluler.fileImage = null
                seluler.source = null
                seluler.uploadErrorMessage = 'Gambar anda melebihi ukuran maksimal'
              } else {
                seluler.isAttached = true
                seluler.fileImage = this.setFile(elSeluler)
                seluler.source = URL.createObjectURL(elSeluler)
                seluler.uploadErrorMessage = ''
              }
            } else {
              seluler.isAttached = false
              seluler.fileImage = null
              seluler.uploadErrorMessage = 'Maaf file yang anda masukan tidak didukung'
            }
            this.submitFile(this.files.seluler.fileImage)
              .then((response) => {
                const { source, original_name: originalName, path } = response || null
                this.params.properties.fasilitas_desa.jaringan_telepon.photo.path = path
                this.params.properties.fasilitas_desa.jaringan_telepon.photo.source = source
                this.params.properties.fasilitas_desa.jaringan_telepon.photo.original_name = originalName
              })
              .catch(() => {
                seluler.isAttached = false
                seluler.fileImage = null
                seluler.uploadErrorMessage = 'Gambar tiang telepon/ screenshoot handphone gagal diupload'
              })
          }
          break
        }
        case ('internet'): {
          const elInternet = this.$refs.internet.files[0]
          if (elInternet) {
            const isValidFormat = ['image/png', 'image/jpeg'].includes(elInternet.type)
            const { internet } = this.files || {}
            if (isValidFormat) {
              if (elInternet.size > 1000000) {
                internet.isAttached = false
                internet.fileImage = null
                internet.source = null
                internet.uploadErrorMessage = 'Gambar anda melebihi ukuran maksimal'
              } else {
                internet.isAttached = true
                internet.fileImage = this.setFile(elInternet)
                internet.source = URL.createObjectURL(elInternet)
                internet.uploadErrorMessage = ''
              }
            } else {
              internet.isAttached = false
              internet.fileImage = null
              internet.uploadErrorMessage = 'Maaf file yang anda masukan tidak didukung'
            }
            this.submitFile(this.files.internet.fileImage)
              .then((response) => {
                const { source, original_name: originalName, path } = response || null
                this.params.properties.fasilitas_desa.jaringan_internet.photo.path = path
                this.params.properties.fasilitas_desa.jaringan_internet.photo.source = source
                this.params.properties.fasilitas_desa.jaringan_internet.photo.original_name = originalName
              })
              .catch(() => {
                internet.isAttached = false
                internet.fileImage = null
                internet.uploadErrorMessage = 'Gambar modem/wifi/screenshoot handphone gagal diupload'
              })
          }
          break
        }
      }
    },
    async onSubmit () {
      if (this.params.level === 1) {
        try {
          await this.$axios.post('/villages/questionnaire', this.params)
          this.showModalLevelDesa = true
        } catch (error) {
          this.$store.dispatch('toast/showToast', {
            type: 'error',
            message: 'Data gagal disimpan, periksa kembali data yang diinputkan'
          })
        }
      } else {
        // @todo: continue to quissionaire two on next pull request
        this.showModalLevelDesa = false
      }
    }
  }
}

</script>

<style lang="postcss">
@import './../Questionnaire.pcss';
</style>
