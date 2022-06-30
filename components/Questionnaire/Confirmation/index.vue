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
            <div class="registration__form-content--container-title">
              Informasi Umum
            </div>
            <BaseInput
              v-model.trim="params.nama"
              class="mt-2"
              label="Nama Lengkap"
              type="text"
              autofocus
              autocomplete="name"
              placeholder="Cth: Agus Permadi"
              :error="!!(errors.name)"
              :error-message="errors.name"
              required
            />
            <BaseInput
              v-model.trim="params.posisi"
              class="mt-2"
              label="Jabatan"
              type="text"
              autofocus
              autocomplete="jabatan"
              placeholder="Cth: Kepala Desa Manyeti"
              :error="!!(errors.position)"
              :error-message="errors.position"
              required
            />
            <div class="grid grid-cols-5 mt-6">
              <div class="registration__form-col-image">
                <div
                  :class="{
                    'registration__form__image': true,
                    'registration__form__image--attached': file.isAttached
                  }"
                >
                  <object
                    v-if="file.source"
                    :data="file.source"
                    class="registration__form__image--attached-uploaded"
                    width="88"
                    height="88"
                  />
                  <img
                    v-else
                    height="22"
                    width="22"
                    src="@/assets/icons/IconPdf.svg"
                    alt="Surat Keterangan"
                  >
                </div>
              </div>
              <div class="registration__form-col-desc">
                <div class="registration__form__subtitle required">
                  Unggah SK Pengangkatan Kepala Desa
                </div>
                <div class="registration__form__placeholder">
                  File yang didukung adalah .pdf maksimal 10 Mb.
                </div>
                <div class="registration__form__button grid grid-cols-5">
                  <div class="col-span-1">
                    <button class="registration__form__button-btn text-sm" type="button" @click="$refs.letter.click()">
                      Unggah Surat
                      <jds-icon class="ml-1" size="10px" name="plus-bold" />
                    </button>
                    <input
                      ref="letter"
                      type="file"
                      hidden="true"
                      accept="application/pdf"
                      @change="onFileChange()"
                    >
                  </div>
                  <div class="col-span-4">
                    <div v-if="file.filePdf" class="registration__form__filename">
                      Filename: {{ file.filePdf.get('file').name }}
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
          </div>

          <div class="registration__form-content--container">
            <div class="registration__form-content--container-title">
              Alamat Desa
            </div>
            <div class="registration__form-content--container__form-group">
              <div class="input-text__label mt-2 required">
                Kabupaten/Kota
              </div>
              <jds-select
                v-model="cityId"
                class="w-full mt-2"
                name="kabupaten/kota"
                filterable
                options-header="Kabupaten/Kota"
                :options="optionsCity"
                placeholder="Masukkan nama Kabupaten/Kota"
              />
            </div>
            <div class="registration__form-content--container__form-group">
              <div class="input-text__label mt-2 required">
                Kecamatan
              </div>
              <jds-select
                v-model="districtId"
                :disabled="isDisabledOptionDistricts"
                class="w-full mt-2"
                name="Kecamatan"
                filterable
                options-header="Kecamatan"
                :options="optionsDistrict"
                placeholder="Masukkan nama Kecamatan"
              />
            </div>
            <div class="registration__form-content--container__form-group">
              <div class="input-text__label mt-2 required">
                Kelurahan/Desa
              </div>
              <jds-select
                v-model="villageId"
                :disabled="isDisabledOptionVillages"
                class="w-full mt-2"
                name="Kelurahan/Desa"
                filterable
                options-header="Kelurahan/Desa"
                :options="optionsVillage"
                placeholder="Masukkan nama Kelurahan/Desa"
                :error-message="errors.village"
              />
            </div>
          </div>

          <div class="registration__form-content--container">
            <div class="registration__form-content--container-title">
              Lainnya
            </div>
            <BaseInput
              v-model="params.nomor_telepon"
              class="mt-2"
              label="Nomor Handphone"
              type="number"
              min="0"
              autofocus
              autocomplete="handphone"
              placeholder="Cth: 0822 2068 9xxx"
              :error="!!(errors.phone)"
              :error-message="errors.phone"
              required
            />
            <BaseInput
              v-model="params.email"
              class="mt-2"
              label="Alamat Email"
              type="text"
              autofocus
              autocomplete="email"
              placeholder="Cth: agus.permadi@gmail.com"
              :error="!!(errors.email)"
              :error-message="errors.email"
              required
            />
          </div>
        </div>

        <div class="registration__submit">
          <BaseButton class="registration__submit-btn" variant="secondary" label="Batalkan" @click="$router.push('/')" />
          <BaseButton class="registration__submit-btn" label="Konfirmasi" :variant="buttonConfirmationVariant" @click="confirmData" />
        </div>
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
        filePdf: null,
        source: null,
        uploadErrorMessage: null
      },
      params: {
        nama: null,
        posisi: null,
        file: {
          path: null,
          original_name: null,
          source: null
        },
        nomor_telepon: null,
        email: null
      },
      uploadFileSecret: this.$config.apiSecretUpload,
      showModalInfoVillage: false,
      isConfirmEnable: false,
      cityId: null,
      districtId: null,
      villageId: null,
      listCity: [],
      listDistrict: [],
      listVillage: [],
      isDisabledOptionDistricts: true,
      isDisabledOptionVillages: true,
      errors: {
        name: null,
        position: null,
        village: null,
        phone: null,
        email: null
      }
    }
  },
  computed: {
    optionsCity () {
      let city = []
      if (Array.isArray(this.listCity) && this.listCity.length) {
        city = this.listCity.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
      }
      return city
    },
    optionsDistrict () {
      let districts = []
      if (Array.isArray(this.listDistrict) && this.listDistrict.length) {
        districts = this.listDistrict.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
      }
      return districts
    },
    optionsVillage () {
      let villages = []
      if (Array.isArray(this.listVillage) && this.listVillage.length) {
        villages = this.listVillage.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
      }
      return villages
    },
    isFormCompleted () {
      return !!((
        this.params.nama &&
        this.params.posisi &&
        this.params.file.source &&
        this.params.nomor_telepon &&
        this.params.email &&
        this.cityId &&
        this.districtId &&
        this.villageId &&
        !this.errors.name &&
        !this.errors.position &&
        !this.errors.village &&
        !this.errors.phone &&
        !this.errors.email
      ))
    },
    buttonConfirmationVariant () {
      if (this.isFormCompleted) {
        return 'primary'
      } else {
        return 'disabled'
      }
    }
  },
  watch: {
    cityId (newId, oldId) {
      if (newId && newId !== oldId) {
        this.isDisabledOptionDistricts = false
        this.districtId = null
        this.villageId = null
        this.fetchDistricts(newId)
      } else {
        this.isDisabledOptionDistricts = true
      }
    },
    districtId (newId, oldId) {
      if (newId && newId !== oldId) {
        this.isDisabledOptionVillages = false
        this.villageId = null
        this.fetchVillages(newId)
      } else {
        this.isDisabledOptionVillages = true
      }
    },
    villageId (newId, oldId) {
      if (newId && newId !== oldId) {
        this.checkVillage(newId)
      }
    },
    'params.nama' () {
      const nameValidation = /(?=.*[^A-Za-z0-9-.,_!@$&*?\s])/g
      if (nameValidation.test(this.params.nama)) {
        this.errors.name = 'Karakter yang diperbolehkan (-.,_!@$&*?)'
      } else if (this.params.nama.length < 3) {
        this.errors.name = 'Isian nama minimal 3 karakter.'
      } else {
        this.errors.name = ''
      }
    },
    'params.posisi' () {
      const roleValidation = /(?=.*[^A-Za-z0-9-.,_!@$&*?\s])/g
      if (roleValidation.test(this.params.posisi)) {
        this.errors.position = 'Karakter yang diperbolehkan (-.,_!@$&*?)'
      } else if (this.params.posisi.length < 1) {
        this.errors.position = 'Isian jabatan wajib diisi.'
      } else {
        this.errors.position = ''
      }
    },
    'params.nomor_telepon' () {
      this.params.nomor_telepon = this.basicNumberNormalization(this.params.nomor_telepon)

      if (this.params.nomor_telepon.length < 1) {
        this.errors.phone = 'Isian nomor telepon wajib diisi.'
      } else if (this.params.nomor_telepon.length < 9) {
        this.errors.phone = 'Isian nomor telepon minimal 9 digit.'
      } else if (this.params.nomor_telepon.length > 13) {
        this.errors.phone = 'Isian nomor telepon maksimal 13 digit.'
      } else if (!this.params.nomor_telepon.startsWith('08')) {
        this.errors.phone = 'Isian nomor telepon tidak valid.'
      } else {
        this.errors.phone = ''
      }
    },
    'params.email' () {
      // test format input text email using pattern
      const pattern = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      if (this.params.email.length < 1) {
        this.errors.email = 'Isian email wajib diisi.'
      } else if (this.params.email.length > 0 && !pattern.test(this.params.email)) {
        this.errors.email = 'Isian email tidak valid.'
      } else {
        this.errors.email = ''
      }
    }
  },
  mounted () {
    this.fetchCity()
  },
  methods: {
    async fetchCity () {
      try {
        const response = await this.$axios.get('/cities/suggestion')
        this.listCity = response.data.data || []
      } catch {
        this.listCity = []
      }
    },
    async fetchDistricts (cityId) {
      try {
        const response = await this.$axios.get(`/districts/suggestion?city_id=${cityId}`)
        this.listDistrict = response.data.data || []
      } catch {
        this.listDistrict = []
      }
    },
    async fetchVillages (districtId) {
      try {
        const response = await this.$axios.get(`/villages/suggestion?district_id=${districtId}`)
        this.listVillage = response.data.data || []
      } catch {
        this.listVillage = []
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
    onFileChange () {
      const elLetter = this.$refs.letter.files[0]
      if (elLetter) {
        const isValidFormat = ['application/pdf'].includes(elLetter.type)
        const maxAllowedSize = 10 * 1024 * 1024
        if (isValidFormat) {
          if (elLetter.size > maxAllowedSize) {
            this.file.isAttached = false
            this.file.filePdf = null
            this.file.source = null
            this.file.uploadErrorMessage = 'Gambar anda melebihi ukuran maksimal'
          } else {
            this.file.isAttached = true
            this.file.filePdf = this.setFile(elLetter)
            this.file.source = URL.createObjectURL(elLetter)
            this.file.uploadErrorMessage = ''
            this.submitFile(this.file.filePdf)
              .then((response) => {
                const { source, original_name: originalName, path } = response || null
                this.params.file.path = path
                this.params.file.source = source
                this.params.file.original_name = originalName
              })
              .catch(() => {
                this.file.isAttached = false
                this.file.filePdf = null
                this.file.source = null
                this.file.uploadErrorMessage = 'File SK gagal diupload'
              })
          }
        } else {
          this.file.isAttached = false
          this.file.filePdf = null
          this.file.uploadErrorMessage = 'Maaf file yang anda masukkan tidak didukung'
        }
      }
    },
    confirmData () {
      if (this.buttonConfirmationVariant === 'primary') {
        this.$store.dispatch('dialog/showDialog', {
          header: 'Konfirmasi Data',
          title: 'Apakah semua data sudah dipastikan telah sesuai?',
          btnRightVariant: 'primary',
          btnLeftVariant: 'secondary',
          btnLeftLabel: 'Cek Kembali',
          btnRightLabel: 'Ya, sudah sesuai',
          actionBtnRight: () => this.onConfirmData()
        })
      }
    },
    onConfirmData () {
      this.$emit('onSubmit', this.params, this.villageId)
      this.$store.dispatch('dialog/closeDialog')
    },
    async checkVillage (villageId) {
      try {
        await this.$axios.get(`/villages/${villageId}/check-registered`)
        this.errors.village = null
        this.$store.dispatch('toast/closeToast')
      } catch (error) {
        const { data } = error.response
        if (data?.error) {
          this.errors.village = data.error
          this.$store.dispatch('toast/showToast', {
            type: 'error',
            message: data.error
          })
        }
      }
    },
    basicNumberNormalization (phone) {
      phone = String(phone).trim()
      if (phone.startsWith('+62')) {
        phone = '0' + phone.slice(3)
      } else if (phone.startsWith('62')) {
        phone = '0' + phone.slice(2)
      }
      return phone.replace(/[- .]/g, '')
    }
  }
}

</script>

<style lang="postcss">
@import './../Questionnaire.pcss';

.jds-popover {
  @apply !block;

  &__content {
    @apply !z-10 w-full md:(w-[unset]);
  }
}

.jds-options__option-list {
  @apply max-h-[200px] min-h-min;
}

.jds-select,
.jds-popover__activator,
.jds-input-text {
  width: 100% !important;
}
</style>
