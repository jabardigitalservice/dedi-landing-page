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
      <div class="registration__form">
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

          <div class="registration__form-content--container">
            <p class="mb-3 required">
              Apakah desa tempat Bapak/Ibu tinggal dapat diakses oleh kendaraan?
            </p>
            <label v-for="(item, index) in optionsKendaraan" :key="index" class="custom-checkbox">
              {{ item.value }}
              <input
                v-model="fasilitas_desa.akses_kendaraan.data"
                type="checkbox"
                name="vehicle-list"
                :value="item.value"
                @change="onVechicleListSelected"
              >
              <span class="checkmark" />
            </label>
            <label class="custom-checkbox">
              Belum ada akses kendaraan
              <input
                type="checkbox"
                name="vehicle-list-none"
                value="Belum ada akses kendaraan"
                @change="onVechicleListNoneSelected"
              >
              <span class="checkmark" />
            </label>
            <div v-show="isShowVehicleImage" class="grid grid-cols-5 mt-4">
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
            <p class="mb-3 required">
              Apakah desa tempat Bapak/Ibu tinggal sudah terdapat suplai listrik?
            </p>
            <jds-radio-button-group
              id="listrik"
              v-model="fasilitas_desa.suplai_listrik.data"
              :items="optionsSuplaiListrik"
              value-key="value"
              placeholder-key="value"
              name="radio-button-group-listrik"
            />
            <div v-show="isShowElectrictImage" class="grid grid-cols-5 mt-4">
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
            <p class="mb-3 required">
              Apakah desa tempat Bapak/Ibu tinggal sudah terdapat jaringan telepon seluler?
            </p>
            <jds-radio-button-group
              id="seluler"
              v-model="fasilitas_desa.jaringan_telepon.data"
              :items="optionsSeluler"
              value-key="value"
              placeholder-key="value"
              name="radio-button-group-seluler"
            />
            <div v-show="isShowProviderImage">
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
              <div
                :class="{
                  'form-text-area' : true,
                  'form-text-area--error' : showErrorMsg
                }"
              >
                <textarea
                  v-model="fasilitas_desa.jaringan_telepon.operator"
                  class="form-text-area--text"
                  name="Daftar layanan telekomunikasi"
                  placeholder="Masukkan daftar disini"
                  rows="5"
                />
              </div>
              <p v-show="showErrorMsg" class="form-text-area--message">
                {{ errors.telephone }}
              </p>
            </div>
          </div>

          <div class="registration__form-content--container">
            <p class="mb-3 required">
              Apakah desa tempat Bapak/Ibu tinggal sudah terdapat akses internet?
            </p>
            <jds-radio-button-group
              id="internet"
              v-model="fasilitas_desa.jaringan_internet.data"
              :items="optionsInternet"
              value-key="value"
              placeholder-key="value"
              name="radio-button-group-internet"
            />
            <div v-show="isShowInternetImage">
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
              <div
                :class="{
                  'form-text-area' : true,
                  'form-text-area--error' : showInternetErrorMsg
                }"
              >
                <textarea
                  v-model="fasilitas_desa.jaringan_internet.website"
                  class="form-text-area--text"
                  name="Daftar website / aplikasi"
                  placeholder="Masukkan daftar disini"
                  rows="5"
                />
              </div>
              <p v-show="showInternetErrorMsg" class="form-text-area--message">
                {{ errors.internet }}
              </p>
            </div>
          </div>
        </div>

        <div class="registration__submit">
          <BaseButton class="registration__submit-btn" :variant="buttonQuestionnaireOneVariant" label="Selanjutnya" :disabled="!isValidatedQuestionnaire" @click="onSubmit" />
        </div>
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
          data: null,
          photo: {
            path: null,
            original_name: null,
            source: null
          }
        },
        jaringan_telepon: {
          data: null,
          photo: {
            path: null,
            original_name: null,
            source: null
          },
          operator: null
        },
        jaringan_internet: {
          data: null,
          photo: {
            path: null,
            original_name: null,
            source: null
          },
          website: null
        }
      },
      uploadFileSecret: this.$config.apiSecretUpload,
      showModalInfoVillage: false,
      villages,
      isShowVehicleImage: false,
      isShowElectrictImage: false,
      isShowProviderImage: false,
      isShowInternetImage: false,
      showErrorMsg: false,
      showInternetErrorMsg: false,
      errors: {
        telephone: null,
        internet: null
      }
    }
  },
  computed: {
    isValidatedQuestionnaire () {
      const isVehicleAccess = this.fasilitas_desa.akses_kendaraan.data.length !== 0
      const isPowerSupply = this.fasilitas_desa.suplai_listrik.data !== null
      const isTelephone = this.fasilitas_desa.jaringan_telepon.data !== null && !(this.errors.telephone)
      const isInternet = this.fasilitas_desa.jaringan_internet.data !== null && !(this.errors.internet)

      return (isVehicleAccess && isPowerSupply && isTelephone && isInternet)
    },
    buttonQuestionnaireOneVariant () {
      if (this.isValidatedQuestionnaire) {
        return 'primary'
      } else {
        return 'disabled'
      }
    }
  },
  watch: {
    'fasilitas_desa.akses_kendaraan.data' () {
      if (this.fasilitas_desa.akses_kendaraan.data.length === 0) {
        this.isShowVehicleImage = false

        const { kendaraan } = this.files
        const { akses_kendaraan: accessVehicle } = this.fasilitas_desa

        kendaraan.isAttached = false
        kendaraan.fileImage = null
        kendaraan.source = null
        kendaraan.uploadErrorMessage = null

        accessVehicle.photo.path = null
        accessVehicle.photo.original_name = null
        accessVehicle.photo.source = null
      } else {
        this.isShowVehicleImage = true
      }
    },
    'fasilitas_desa.suplai_listrik.data' () {
      if (this.fasilitas_desa.suplai_listrik.data === 'Belum ada listrik') {
        this.isShowElectrictImage = false

        const { listrik } = this.files
        const { suplai_listrik: electricity } = this.fasilitas_desa

        listrik.isAttached = false
        listrik.fileImage = null
        listrik.source = null
        listrik.uploadErrorMessage = null

        electricity.photo.path = null
        electricity.photo.original_name = null
        electricity.photo.source = null
      } else {
        this.isShowElectrictImage = true
      }
    },
    'fasilitas_desa.jaringan_telepon.data' () {
      if (this.fasilitas_desa.jaringan_telepon.data === 'Belum ada jaringan telepon seluler') {
        this.isShowProviderImage = false

        const { seluler } = this.files
        const { jaringan_telepon: phoneNetwork } = this.fasilitas_desa

        seluler.isAttached = false
        seluler.fileImage = null
        seluler.source = null
        seluler.uploadErrorMessage = null

        phoneNetwork.operator = null
        phoneNetwork.photo.path = null
        phoneNetwork.photo.original_name = null
        phoneNetwork.photo.source = null
      } else {
        this.isShowProviderImage = true
      }
    },
    'fasilitas_desa.jaringan_telepon.operator' () {
      const telephoneValidation = /(?=.*[^A-Za-z0-9-.,_!@$&*?\s])/g
      if (telephoneValidation.test(this.fasilitas_desa.jaringan_telepon.operator)) {
        this.showErrorMsg = true
        this.errors.telephone = 'Format isian tidak valid. Karakter yang diperbolehkan (.,_!@$&*?)'
      } else {
        this.showErrorMsg = false
        this.errors.telephone = ''
      }
    },
    'fasilitas_desa.jaringan_internet.data' () {
      if (this.fasilitas_desa.jaringan_internet.data === 'Belum ada jaringan internet') {
        this.isShowInternetImage = false
        this.$emit('onClickLevel', false)

        const { internet } = this.files
        const { jaringan_internet: interNetwork } = this.fasilitas_desa

        internet.isAttached = false
        internet.fileImage = null
        internet.source = null
        internet.uploadErrorMessage = null

        interNetwork.website = null
        interNetwork.photo.path = null
        interNetwork.photo.original_name = null
        interNetwork.photo.source = null
      } else {
        this.isShowInternetImage = true
        this.$emit('onClickLevel', true)
      }
    },
    'fasilitas_desa.jaringan_internet.website' () {
      const internetValidation = /(?=.*[^A-Za-z0-9-.,_!@$&*?\s])/g
      if (internetValidation.test(this.fasilitas_desa.jaringan_internet.website)) {
        this.showInternetErrorMsg = true
        this.errors.internet = 'Format isian tidak valid. Karakter yang diperbolehkan (.,_!@$&*?)'
      } else {
        this.showInternetErrorMsg = false
        this.errors.internet = ''
      }
    }
  },
  methods: {
    onVechicleListSelected () {
      const elVehicleNone = document.getElementsByName('vehicle-list-none')
      if (elVehicleNone[0].checked) {
        elVehicleNone[0].checked = false
        this.fasilitas_desa.akses_kendaraan.data.shift()
      }
    },
    onVechicleListNoneSelected () {
      const elVehicleSelected = document.querySelectorAll("input[name='vehicle-list']")
      const elVehicleNone = document.getElementsByName('vehicle-list-none')
      if (elVehicleNone[0].checked) {
        elVehicleSelected.forEach((element) => {
          element.checked = false
        })
        this.fasilitas_desa.akses_kendaraan.data = ['Belum ada akses kendaraan']
      } else {
        this.fasilitas_desa.akses_kendaraan.data = []
      }
    },
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
                this.fasilitas_desa.akses_kendaraan.photo.path = path
                this.fasilitas_desa.akses_kendaraan.photo.source = source
                this.fasilitas_desa.akses_kendaraan.photo.original_name = originalName
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
                this.fasilitas_desa.suplai_listrik.photo.path = path
                this.fasilitas_desa.suplai_listrik.photo.source = source
                this.fasilitas_desa.suplai_listrik.photo.original_name = originalName
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
                this.fasilitas_desa.jaringan_telepon.photo.path = path
                this.fasilitas_desa.jaringan_telepon.photo.source = source
                this.fasilitas_desa.jaringan_telepon.photo.original_name = originalName
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
                this.fasilitas_desa.jaringan_internet.photo.path = path
                this.fasilitas_desa.jaringan_internet.photo.source = source
                this.fasilitas_desa.jaringan_internet.photo.original_name = originalName
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
    onSubmit () {
      this.$emit('onSubmit', this.fasilitas_desa)
    }
  }
}

</script>

<style lang="postcss">
@import './../Questionnaire.pcss';
@import '~/assets/css/Custom-checkbox.pcss';
</style>
