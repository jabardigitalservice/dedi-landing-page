<template>
  <div id="registration" class="registration-questionnaire">
    <div class="registration--position">
      <img class="registration__image" src="~/assets/images/FooterBanner.svg" alt="footer banner">
      <div class="registration__questionnaire">
        <div class="registration__questionnaire-body">
          <div class="registration__form" method="post">
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
                <p class="mb-3">
                  Apakah desa tempat Bapak/Ibu tinggal dapat diakses oleh kendaraan?
                </p>
                <jds-checkbox-group :options="optionsKendaraan" value-key="value" label-key="value" />
                <div class="grid grid-cols-5 mt-4">
                  <div class="registration__form-col-image">
                    <div
                      :class="{
                        'registration__form__image': true,
                        'registration__form__image--attached': isAttachedKendaraan
                      }"
                    >
                      <img
                        v-if="imageSource"
                        class="registration__form__image--attached-uploaded"
                        width="88"
                        height="88"
                        :src="imageSource"
                        alt="Avatar User Admin"
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
                      <button class="registration__form__button-btn" type="button" @click="$refs.file.click()">
                        Unggah Foto
                        <jds-icon class="ml-2" size="12px" name="plus-bold" />
                      </button>
                      <input
                        ref="file"
                        type="file"
                        hidden="true"
                        accept="image/png, image/jpeg, image/svg+xml"
                        @change="onFileChange"
                      >
                      <div v-if="fileImage">
                        Filename: {{ fileImage.get('file').name }}
                      </div>
                      <div v-else-if="uploadFileErrorMessage" class="text-red-700">
                        {{ uploadFileErrorMessage }}
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
                  :items="optionsSuplaiListrik"
                  value-key="value"
                  placeholder-key="value"
                  name="radio-button-group"
                />
                <div class="grid grid-cols-5 mt-4">
                  <div class="registration__form-col-image">
                    <div
                      :class="{
                        'registration__form__image': true,
                        'registration__form__image--attached': isAttachedListrik
                      }"
                    >
                      <img
                        v-if="imageSource"
                        class="registration__form__image--attached-uploaded"
                        width="88"
                        height="88"
                        :src="imageSource"
                        alt="Avatar User Admin"
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
                      <button class="registration__form__button-btn" type="button" @click="$refs.file.click()">
                        Unggah Foto
                        <jds-icon class="ml-2" size="12px" name="plus-bold" />
                      </button>
                      <input
                        ref="file"
                        type="file"
                        hidden="true"
                        accept="image/png, image/jpeg, image/svg+xml"
                        @change="onFileChange"
                      >
                      <div v-if="fileImage">
                        Filename: {{ fileImage.get('file').name }}
                      </div>
                      <div v-else-if="uploadFileErrorMessage" class="text-red-700">
                        {{ uploadFileErrorMessage }}
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
                  :items="optionsSeluler"
                  value-key="value"
                  placeholder-key="value"
                  name="radio-button-group"
                />
                <div class="grid grid-cols-5 mt-4">
                  <div class="registration__form-col-image">
                    <div
                      :class="{
                        'registration__form__image': true,
                        'registration__form__image--attached': isAttachedSeluler
                      }"
                    >
                      <img
                        v-if="imageSource"
                        class="registration__form__image--attached-uploaded"
                        width="88"
                        height="88"
                        :src="imageSource"
                        alt="Avatar User Admin"
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
                      <button class="registration__form__button-btn" type="button" @click="$refs.file.click()">
                        Unggah Foto
                        <jds-icon class="ml-2" size="12px" name="plus-bold" />
                      </button>
                      <input
                        ref="file"
                        type="file"
                        hidden="true"
                        accept="image/png, image/jpeg, image/svg+xml"
                        @change="onFileChange"
                      >
                      <div v-if="fileImage">
                        Filename: {{ fileImage.get('file').name }}
                      </div>
                      <div v-else-if="uploadFileErrorMessage" class="text-red-700">
                        {{ uploadFileErrorMessage }}
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
                <textarea class="form-text-area" name="Daftar layanan telekomunikasi" placeholder="Masukkan daftar disini" rows="5" />
              </div>

              <div class="registration__form-content--container">
                <p class="mb-3">
                  Apakah desa tempat Bapak/Ibu tinggal sudah terdapat akses internet?
                </p>
                <jds-radio-button-group
                  :items="optionsInternet"
                  value-key="value"
                  placeholder-key="value"
                  name="radio-button-group"
                />
                <div class="grid grid-cols-5 mt-4">
                  <div class="registration__form-col-image">
                    <div
                      :class="{
                        'registration__form__image': true,
                        'registration__form__image--attached': isAttachedInternet
                      }"
                    >
                      <img
                        v-if="imageSource"
                        class="registration__form__image--attached-uploaded"
                        width="88"
                        height="88"
                        :src="imageSource"
                        alt="Avatar User Admin"
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
                      <button class="registration__form__button-btn" type="button" @click="$refs.file.click()">
                        Unggah Foto
                        <jds-icon class="ml-2" size="12px" name="plus-bold" />
                      </button>
                      <input
                        ref="file"
                        type="file"
                        hidden="true"
                        accept="image/png, image/jpeg, image/svg+xml"
                        @change="onFileChange"
                      >
                      <div v-if="fileImage">
                        Filename: {{ fileImage.get('file').name }}
                      </div>
                      <div v-else-if="uploadFileErrorMessage" class="text-red-700">
                        {{ uploadFileErrorMessage }}
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
                <textarea class="form-text-area" name="Daftar website / aplikasi" placeholder="Masukkan daftar disini" rows="5" />
              </div>
            </div>

            <div class="registration__submit">
              <BaseButton class="registration__submit-btn" label="Selanjutnya" @click="onNext" />
            </div>
          </div>
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
      optionsKendaraan: [
        {
          value: 'Motor'
        },
        {
          value: 'Mobil'
        },
        {
          value: 'Kendaraan Umum (Bus/Elf)'
        },
        {
          value: 'Belum ada akses kendaraan'
        }
      ],
      optionsSuplaiListrik: [
        {
          value: 'Belum ada listrik'
        },
        {
          value: 'Ada listrik tapi sering mati'
        },
        {
          value: 'Ada listrik dan stabil'
        }
      ],
      optionsSeluler: [
        {
          value: 'Belum ada jaringan telepon seluler'
        },
        {
          value: 'Ada, namun jaringan belum stabil'
        },
        {
          value: 'Ada jaringan seluler yang stabil'
        }
      ],
      optionsInternet: [
        {
          value: 'Belum ada jaringan internet'
        },
        {
          value: 'Sudah ada jaringan internet namun lambat dan hanya di beberapa tempat'
        },
        {
          value: 'Sudah ada jaringan internet yang stabil'
        }
      ],
      isAttachedKendaraan: false,
      isAttachedListrik: false,
      isAttachedSeluler: false,
      isAttachedInternet: false,
      imageSource: null,
      fileImage: null,
      uploadFileErrorMessage: '',
      params: {
        // @todo: add params
      }
    }
  },
  methods: {
    onClickInfo () {
      // @todo: show modal information level desa digital
    },
    submitFile (image) {
      return new Promise((resolve, reject) => {
        this.$axios.post('/files/upload', image, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          const { data } = response.data
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    setFile (value) {
      const formData = new FormData()
      formData.append('file', value)
      this.fileImage = formData
      this.imageSource = URL.createObjectURL(value)
    },
    onFileChange () {
      if (this.$refs.file.files[0]) {
        const isValidFormat = ['image/png', 'image/jpeg'].includes(this.$refs.file.files[0].type)
        if (isValidFormat) {
          if (this.$refs.file.files[0].size > 1000000) {
            this.fileImage = null
            this.uploadFileErrorMessage = 'Gambar anda melebihi ukuran maksimal'
            this.isAttachedKendaraan = false
            this.imageSource = null
          } else {
            this.uploadFileErrorMessage = ''
            this.isAttachedKendaraan = true
            this.setFile(this.$refs.file.files[0])
          }
        } else {
          this.fileImage = null
          this.uploadFileErrorMessage = 'Maaf file yang anda masukan tidak didukung'
          this.isAttachedKendaraan = false
        }
      } else {
        this.fileImage = null
        this.isAttachedKendaraan = false
      }
    },
    onNext () {
      // @todo: make next function
    }
  }
}

</script>

<style lang="postcss">
@import './../Questionnaire.pcss';
</style>
