<template>
  <div class="registration__questionnaire-body">
    <div class="registration__form">
      <div class="registration__form-title">
        Kuisioner Desa Digital
      </div>
      <div v-show="!isShowNextQuestionnaire" class="registration__form-content">
        <div class="registration__form-content--container">
          <p class="mb-3 required">
            Dari pilihan berikut, sosial media apa yang dikelola secara resmi oleh perangkat desa Bapak/Ibu?
          </p>
          <label v-for="(item, index) in optionsSocialMedia" :key="index" class="custom-checkbox">
            {{ item.value }}
            <input
              v-model="properties.tentang_bumdes.sosial_media.data"
              type="checkbox"
              name="social-media-list"
              :value="item.value"
              @change="onSocialMediaListSelected"
            >
            <span class="checkmark" />
          </label>
          <label class="custom-checkbox">
            Tidak ada
            <input
              type="checkbox"
              name="social-media-list-none"
              value="Tidak ada"
              @change="onSocialMediaNoneSelected"
            >
            <span class="checkmark" />
          </label>
          <div v-show="isShowUploadSocialMedia" class="grid grid-cols-5 mt-4">
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
          <p class="mb-3 required">
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
          <div v-show="isShowBumdes" class="grid grid-cols-5 mt-4">
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
          <p v-show="isShowBumdes" class="mb-3">
            Tuliskan nama BUMDes yang ada di desa Bapak/Ibu
          </p>
          <div
            v-show="isShowBumdes"
            :class="{
              'form-text-area' : true,
              'form-text-area--error' : showBumdesErrorMsg
            }"
          >
            <textarea
              v-model.trim="properties.tentang_bumdes.bumdes.bumdes"
              class="form-text-area--text"
              name="Nama BUMDes"
              placeholder="Masukkan disini"
              rows="3"
            />
          </div>
          <p v-show="showBumdesErrorMsg" class="form-text-area--message">
            {{ errors.bumdes }}
          </p>
        </div>

        <div v-show="isShowBumdes" class="registration__form-content--container">
          <p class="mb-3">
            Jika ada, komoditas apa yang dikelola/diproduksi oleh BUMDes di desa Bapak/Ibu?
          </p>
          <div
            v-show="isShowBumdes"
            :class="{
              'form-text-area' : true,
              'form-text-area--error' : showComodityErrorMsg
            }"
          >
            <textarea
              v-model.trim="properties.tentang_bumdes.komoditas.data"
              class="form-text-area--text"
              name="Daftar komoditas"
              placeholder="Masukkan disini"
              rows="3"
            />
          </div>
          <p v-show="showComodityErrorMsg" class="form-text-area--message">
            {{ errors.comodity }}
          </p>
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

        <div v-show="isShowBumdes" class="registration__form-content--container">
          <p class="mb-3 required">
            Apakah komoditas yang dikelola/produksi masih aktif pada BUMDes Bapak/Ibu?
          </p>
          <jds-radio-button-group
            v-model="properties.tentang_bumdes.komoditas.produktivitas"
            :items="optionsKomoditas"
            value-key="value"
            placeholder-key="value"
            name="radio-button-group-komoditas"
          />
        </div>

        <div v-show="isShowBumdes" class="registration__form-content--container">
          <p class="mb-3 required">
            Jika aktif apakah pendistribusian produk BUMDes sudah tergabung pada e-commerce (penjualan sistem elektronik)?
          </p>
          <jds-radio-button-group
            v-model="properties.tentang_bumdes.ecommerce.distribusi"
            :items="optionsDistribusi"
            value-key="value"
            placeholder-key="value"
            name="radio-button-group-distribusi"
          />
        </div>

        <div v-show="isShowBumdes" class="registration__form-content--container">
          <p class="mb-3 required">
            Jika sudah, platform e-commerce apa yang telah bergabung?
          </p>
          <label v-for="(item, index) in optionsECommerce" :key="index" class="custom-checkbox">
            {{ item.value }}
            <input
              v-model="properties.tentang_bumdes.ecommerce.data"
              type="checkbox"
              name="e-commerce-list"
              :value="item.value"
              @change="onECommerceListSelected"
            >
            <span class="checkmark" />
          </label>
          <div
            v-show="isShowOtherECommerce"
            :class="{
              'form-text-area' : true,
              'form-text-area--error' : showEcommerceErrorMsg
            }"
          >
            <textarea
              v-model.trim="properties.tentang_bumdes.ecommerce.ecommerce_lainnya"
              class="form-text-area--text"
              name="E-Commerce Lainnya"
              placeholder="Masukkan E-Commerce lainnya disini"
              rows="2"
            />
          </div>
          <p v-show="showEcommerceErrorMsg" class="form-text-area--message">
            {{ errors.ecommerce }}
          </p>
        </div>

        <div v-show="isShowBumdes" class="registration__form-content--container">
          <p class="mb-3 required">
            Apakah desa Bapak/Ibu sudah terjangkau kurir logistik?
          </p>
          <jds-radio-button-group
            v-model="properties.tentang_bumdes.logistik"
            :items="optionsLogistik"
            value-key="value"
            placeholder-key="value"
            name="radio-button-group-logistik"
          />
        </div>
      </div>

      <div v-show="isShowNextQuestionnaire" class="registration__form-content">
        <div class="registration__form-content--container">
          <p class="mb-3 required">
            Apakah desa tempat Bapak/Ibu tinggal memiliki potensi yang dapat dikembangkan?
          </p>
          <div class="custom-info-warning">
            <jds-icon class="custom-info-warning__icon" name="warning" size="sm" />
            <div class="custom-info-warning__text">
              Pilih maksimal <strong>3 potensi</strong> yang menurut anda paling unggul di desa anda.
            </div>
          </div>
          <label class="custom-checkbox">
            Belum ada potensi
            <input
              type="checkbox"
              name="potency-list-none"
              value="Belum ada potensi"
              @change="onPotencyNoneSelected"
            >
            <span class="checkmark" />
          </label>
          <label v-for="(item, index) in optionsPotency" :key="index" class="custom-checkbox">
            {{ item.value }}
            <input
              v-model="properties.potensi_desa.data"
              type="checkbox"
              name="potency-list"
              :value="item.value"
              @change="onPotencyListSelected"
            >
            <span class="checkmark" />
          </label>
          <div
            v-show="isShowOtherPotency"
            :class="{
              'form-text-area' : true,
              'form-text-area--error' : showOtherPotencyErrorMsg
            }"
          >
            <textarea
              v-model.trim="properties.potensi_desa.potensi_lainnya"
              class="form-text-area--text"
              name="Potensi Lainnya"
              placeholder="Masukkan potensi lainnya disini"
              rows="4"
            />
          </div>
          <p v-show="showOtherPotencyErrorMsg" class="form-text-area--message">
            {{ errors.otherPotency }}
          </p>
        </div>

        <div v-show="isShowPotency" class="registration__form-content--container">
          <p class="mb-3">
            Jika ada, ceritakan potensi yang dapat dikembangkan dari desa tempat Bapak/Ibu tinggal?
          </p>
          <div
            :class="{
              'form-text-area' : true,
              'form-text-area--error' : showPotencyErrorMsg
            }"
          >
            <textarea
              v-model.trim="properties.potensi_desa.potensi_dapat_dikembangkan"
              class="form-text-area--text"
              name="Daftar potensi"
              placeholder="Masukkan disini"
              rows="4"
            />
          </div>
          <p v-show="showPotencyErrorMsg" class="form-text-area--message">
            {{ errors.potency }}
          </p>
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
        <BaseButton
          v-if="!isShowNextQuestionnaire"
          class="registration__submit-btn"
          label="Selanjutnya"
          :variant="buttonQuestionnaireVariant"
          :disabled="!isQuestionnaireThreeCompleted"
          @click="onNextQuestionnaire"
        />
        <BaseButton
          v-else
          class="registration__submit-btn"
          label="Selanjutnya"
          :variant="buttonQuestionnairePotencyVariant"
          :disabled="!isPotencyCompleted"
          @click="onSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  optionsSocialMedia,
  optionsBumdes,
  optionsKomoditas,
  optionsDistribusi,
  optionsECommerce,
  optionsLogistik,
  optionsPotency,
  villages
} from '@/constants/questionnaire.js'
export default {
  data () {
    return {
      optionsSocialMedia,
      optionsBumdes,
      optionsKomoditas,
      optionsDistribusi,
      optionsECommerce,
      optionsLogistik,
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
            data: null,
            photo: {
              path: null,
              original_name: null,
              source: null
            },
            bumdes: null
          },
          komoditas: {
            data: null,
            photo: {
              path: null,
              original_name: null,
              source: null
            },
            produktivitas: null
          },
          ecommerce: {
            data: [],
            ecommerce_lainnya: null,
            distribusi: null
          },
          logistik: null
        },
        potensi_desa: {
          data: [],
          potensi_lainnya: null,
          potensi_dapat_dikembangkan: null,
          photo: {
            path: null,
            original_name: null,
            source: null
          }
        }
      },
      uploadFileSecret: this.$config.apiSecretUpload,
      showModalLevelDesa: false,
      isShowNextQuestionnaire: false,
      isShowPotency: false,
      isShowUploadSocialMedia: false,
      isShowBumdes: false,
      isShowOtherECommerce: false,
      isShowOtherPotency: false,
      socialMediaNoneOption: [],
      villages,
      showBumdesErrorMsg: false,
      showComodityErrorMsg: false,
      showEcommerceErrorMsg: false,
      showPotencyErrorMsg: false,
      showOtherPotencyErrorMsg: false,
      errors: {
        bumdes: null,
        comodity: null,
        ecommerce: null,
        otherPotency: null,
        potency: null
      }
    }
  },
  computed: {
    isBumdesCompleted () {
      const { komoditas, ecommerce, logistik } = this.properties.tentang_bumdes
      return !!((
        (komoditas.produktivitas && !this.errors.comodity) &&
        (ecommerce.data.length && !this.errors.ecommerce) &&
        ecommerce.distribusi &&
        logistik
      ))
    },
    isQuestionnaireThreeCompleted () {
      const { sosial_media: socialMedia, bumdes } = this.properties.tentang_bumdes
      if (this.isShowBumdes) {
        return !!((
          socialMedia.data.length &&
          (bumdes.data && !this.errors.bumdes) &&
          this.isBumdesCompleted
        ))
      } else {
        return !!((
          socialMedia.data.length &&
          (bumdes.data && !this.errors.bumdes)
        ))
      }
    },
    isPotencyCompleted () {
      const { data } = this.properties.potensi_desa
      return !!((
        data.length && !this.errors.potency && !this.errors.otherPotency
      ))
    },
    buttonQuestionnaireVariant () {
      return this.isQuestionnaireThreeCompleted ? 'primary' : 'disabled'
    },
    buttonQuestionnairePotencyVariant () {
      return this.isPotencyCompleted ? 'primary' : 'disabled'
    }
  },
  watch: {
    'properties.potensi_desa.data' (data) {
      if (data.length === 0 || data.includes('Belum ada potensi')) {
        this.$emit('onClickLevel', false)
        this.isShowPotency = false
        const { potensi_desa: potensi } = this.properties
        const { potency } = this.files

        potensi.potensi_dapat_dikembangkan = null
        potensi.photo.path = null
        potensi.photo.original_name = null
        potensi.photo.source = null

        potency.isAttached = false
        potency.fileImage = null
        potency.source = null
      } else {
        this.$emit('onClickLevel', true)
        this.isShowPotency = true
      }
    },
    'properties.tentang_bumdes.sosial_media.data' (data) {
      if (data.length > 0 && !data.includes('Tidak ada')) {
        this.isShowUploadSocialMedia = true
      } else {
        this.isShowUploadSocialMedia = false
        const { sosial_media: socialMediaData } = this.properties.tentang_bumdes
        const { socialMedia } = this.files

        socialMediaData.photo.path = null
        socialMediaData.photo.original_name = null
        socialMediaData.photo.source = null

        socialMedia.isAttached = false
        socialMedia.fileImage = null
        socialMedia.source = null
      }
    },
    'properties.tentang_bumdes.bumdes.data' (value) {
      if (value === 'Tidak memiliki BUMDes') {
        this.isShowBumdes = false
        const { bumdes, komoditas } = this.properties.tentang_bumdes
        const { bumdes: fileBumdes, komoditas: fileKomoditas } = this.files

        bumdes.photo.path = null
        bumdes.photo.original_name = null
        bumdes.photo.source = null
        bumdes.bumdes = null

        komoditas.photo.path = null
        komoditas.photo.original_name = null
        komoditas.photo.source = null
        komoditas.data = null

        fileBumdes.isAttached = false
        fileBumdes.fileImage = null
        fileBumdes.source = null

        fileKomoditas.isAttached = false
        fileKomoditas.fileImage = null
        fileKomoditas.source = null
      } else {
        this.isShowBumdes = true
      }
    },
    'properties.tentang_bumdes.bumdes.bumdes' () {
      const bumdesValidation = /(?=.*[^A-Za-z0-9-.,_!@$&*?\s])/g
      if (bumdesValidation.test(this.properties.tentang_bumdes.bumdes.bumdes)) {
        this.showBumdesErrorMsg = true
        this.errors.bumdes = 'Karakter yang diperbolehkan (-.,_!@$&*?)'
      } else {
        this.showBumdesErrorMsg = false
        this.errors.bumdes = ''
      }
    },
    'properties.tentang_bumdes.komoditas.data' () {
      const comodityValidation = /(?=.*[^A-Za-z0-9-.,_!@$&*?\s])/g
      if (comodityValidation.test(this.properties.tentang_bumdes.komoditas.data)) {
        this.showComodityErrorMsg = true
        this.errors.comodity = 'Karakter yang diperbolehkan (-.,_!@$&*?)'
      } else {
        this.showComodityErrorMsg = false
        this.errors.comodity = ''
      }
    },
    'properties.tentang_bumdes.ecommerce.ecommerce_lainnya' () {
      const ecommerceValidation = /(?=.*[^A-Za-z0-9-.,_!@$&*?\s])/g
      if (ecommerceValidation.test(this.properties.tentang_bumdes.ecommerce.ecommerce_lainnya)) {
        this.showEcommerceErrorMsg = true
        this.errors.ecommerce = 'Karakter yang diperbolehkan (-.,_!@$&*?)'
      } else {
        this.showEcommerceErrorMsg = false
        this.errors.ecommerce = ''
      }
    },
    'properties.potensi_desa.potensi_lainnya' () {
      const otherPotencyValidation = /(?=.*[^A-Za-z0-9-.,_!@$&*?\s])/g
      if (otherPotencyValidation.test(this.properties.potensi_desa.potensi_lainnya)) {
        this.showOtherPotencyErrorMsg = true
        this.errors.otherPotency = 'Karakter yang diperbolehkan (-.,_!@$&*?)'
      } else {
        this.showOtherPotencyErrorMsg = false
        this.errors.otherPotency = ''
      }
    },
    'properties.potensi_desa.potensi_dapat_dikembangkan' () {
      const PotencyValidation = /(?=.*[^A-Za-z0-9-.,_!@$&*?\s])/g
      if (PotencyValidation.test(this.properties.potensi_desa.potensi_dapat_dikembangkan)) {
        this.showPotencyErrorMsg = true
        this.errors.potency = 'Karakter yang diperbolehkan (-.,_!@$&*?)'
      } else {
        this.showPotencyErrorMsg = false
        this.errors.potency = ''
      }
    }
  },
  methods: {
    onSocialMediaListSelected () {
      const elSocialMediaNone = document.getElementsByName('social-media-list-none')
      if (elSocialMediaNone[0].checked) {
        elSocialMediaNone[0].checked = false
        this.properties.tentang_bumdes.sosial_media.data.shift()
      }
    },
    onSocialMediaNoneSelected () {
      const elSocialMediaSelected = document.querySelectorAll("input[name='social-media-list']")
      const elSocialMediaNone = document.getElementsByName('social-media-list-none')
      if (elSocialMediaNone[0].checked) {
        elSocialMediaSelected.forEach((element) => {
          element.checked = false
        })
        this.properties.tentang_bumdes.sosial_media.data = ['Tidak ada']
      }
    },
    onECommerceListSelected () {
      const elECommerceList = document.querySelectorAll("input[name='e-commerce-list']")

      elECommerceList.forEach((element) => {
        if (element.value === 'Lainnya' && element.checked) {
          this.isShowOtherECommerce = true
        } else {
          this.isShowOtherECommerce = false
          this.properties.tentang_bumdes.ecommerce.ecommerce_lainnya = null
        }
      })
    },
    onPotencyListSelected () {
      const elSocialMediaList = document.querySelectorAll("input[name='potency-list']")
      const elSocialMediaChecked = document.querySelectorAll("input[name='potency-list']:checked")
      const elSocialMediaNone = document.getElementsByName('potency-list-none')
      if (elSocialMediaNone[0].checked) {
        elSocialMediaNone[0].checked = false
        this.properties.potensi_desa.data.shift()
      }

      if (elSocialMediaChecked.length > 3) {
        this.$store.dispatch('toast/showToast', {
          type: 'error',
          message: 'Harap pilih maksimal 3 potensi'
        })
      }

      elSocialMediaList.forEach((element) => {
        if (element.value === 'Lainnya' && element.checked) {
          this.isShowOtherPotency = true
        } else {
          this.isShowOtherPotency = false
          this.properties.potensi_desa.potensi_lainnya = null
        }
      })
    },
    onPotencyNoneSelected () {
      const elSocialMediaSelected = document.querySelectorAll("input[name='potency-list']")
      const elSocialMediaNone = document.getElementsByName('potency-list-none')
      if (elSocialMediaNone[0].checked) {
        elSocialMediaSelected.forEach((element) => {
          element.checked = false
        })
        this.properties.potensi_desa.data = ['Belum ada potensi']
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
        case ('socialMedia'): {
          const elSocialMedia = this.$refs.socialMedia.files[0]
          if (elSocialMedia) {
            const isValidFormat = ['image/png', 'image/jpeg'].includes(elSocialMedia.type)
            const maxAllowedSize = 5 * 1024 * 1024
            const { socialMedia } = this.files || {}
            if (isValidFormat) {
              if (elSocialMedia.size > maxAllowedSize) {
                socialMedia.isAttached = false
                socialMedia.fileImage = null
                socialMedia.source = null
                socialMedia.uploadErrorMessage = 'Gambar anda melebihi ukuran maksimal'
              } else {
                socialMedia.isAttached = true
                socialMedia.fileImage = this.setFile(elSocialMedia)
                socialMedia.source = URL.createObjectURL(elSocialMedia)
                socialMedia.uploadErrorMessage = ''
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
            } else {
              socialMedia.isAttached = false
              socialMedia.fileImage = null
              socialMedia.uploadErrorMessage = 'Maaf file yang anda masukan tidak didukung'
            }
          }
          break
        }
        case ('bumdes'): {
          const elBumdes = this.$refs.bumdes.files[0]
          if (elBumdes) {
            const isValidFormat = ['image/png', 'image/jpeg'].includes(elBumdes.type)
            const maxAllowedSize = 5 * 1024 * 1024
            const { bumdes } = this.files || {}
            if (isValidFormat) {
              if (elBumdes.size > maxAllowedSize) {
                bumdes.isAttached = false
                bumdes.fileImage = null
                bumdes.source = null
                bumdes.uploadErrorMessage = 'Gambar anda melebihi ukuran maksimal'
              } else {
                bumdes.isAttached = true
                bumdes.fileImage = this.setFile(elBumdes)
                bumdes.source = URL.createObjectURL(elBumdes)
                bumdes.uploadErrorMessage = ''
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
            } else {
              bumdes.isAttached = false
              bumdes.fileImage = null
              bumdes.uploadErrorMessage = 'Maaf file yang anda masukan tidak didukung'
            }
          }
          break
        }
        case ('komoditas'): {
          const elKomoditas = this.$refs.komoditas.files[0]
          if (elKomoditas) {
            const isValidFormat = ['image/png', 'image/jpeg'].includes(elKomoditas.type)
            const maxAllowedSize = 5 * 1024 * 1024
            const { komoditas } = this.files || {}
            if (isValidFormat) {
              if (elKomoditas.size > maxAllowedSize) {
                komoditas.isAttached = false
                komoditas.fileImage = null
                komoditas.source = null
                komoditas.uploadErrorMessage = 'Gambar anda melebihi ukuran maksimal'
              } else {
                komoditas.isAttached = true
                komoditas.fileImage = this.setFile(elKomoditas)
                komoditas.source = URL.createObjectURL(elKomoditas)
                komoditas.uploadErrorMessage = ''
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
            } else {
              komoditas.isAttached = false
              komoditas.fileImage = null
              komoditas.uploadErrorMessage = 'Maaf file yang anda masukan tidak didukung'
            }
          }
          break
        }
        case ('potency'): {
          const elPotency = this.$refs.potency.files[0]
          if (elPotency) {
            const isValidFormat = ['image/png', 'image/jpeg'].includes(elPotency.type)
            const maxAllowedSize = 5 * 1024 * 1024
            const { potency } = this.files || {}
            if (isValidFormat) {
              if (elPotency.size > maxAllowedSize) {
                potency.isAttached = false
                potency.fileImage = null
                potency.source = null
                potency.uploadErrorMessage = 'Gambar anda melebihi ukuran maksimal'
              } else {
                potency.isAttached = true
                potency.fileImage = this.setFile(elPotency)
                potency.source = URL.createObjectURL(elPotency)
                potency.uploadErrorMessage = ''
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
            } else {
              potency.isAttached = false
              potency.fileImage = null
              potency.uploadErrorMessage = 'Maaf file yang anda masukan tidak didukung'
            }
          }
          break
        }
      }
    },
    onNextQuestionnaire () {
      if (this.isQuestionnaireThreeCompleted && !this.isShowNextQuestionnaire) {
        this.isShowNextQuestionnaire = true
      }
    },
    onSubmit () {
      if (this.isPotencyCompleted) {
        this.$emit('onSubmit', this.properties)
      }
    },
    onPreviousPage () {
      if (this.isShowNextQuestionnaire) {
        this.isShowNextQuestionnaire = false
      } else {
        this.$emit('onPrev')
      }
    }
  }
}

</script>

<style lang="postcss">
@import './../Questionnaire.pcss';
@import '~/assets/css/Custom-checkbox.pcss';

.custom-info-warning {
  @apply flex mb-4 px-4 py-2 bg-yellow-50 border border-yellow-800 rounded-lg w-max;

  &__icon {
    @apply text-yellow-800;
  }

  &__text {
    @apply text-sm italic ml-4;
  }
}
</style>
