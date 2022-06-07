<template>
  <div id="registration-mitra" class="registration-mitra">
    <div class="registration-mitra--position">
      <img class="registration-mitra__image" src="~/assets/images/FooterBanner.svg" alt="footer banner">
      <div class="registration-mitra__signup">
        <div
          :class="{
            'registration-mitra__signup--hidden' : isSuccessSubmit
          }
          "
        >
          <div class="registration-mitra__signup--body">
            <form class="registration-mitra__signup-form" method="post" @submit.prevent="submitForm">
              <div class="registration-mitra__signup-form-title">
                Daftar Mitra
              </div>
              <div v-if="showErrorMessage" class="registration-mitra__signup-form-error-message">
                <jds-section-message
                  show
                  variant="error"
                  :message="errorMessage"
                />
              </div>
              <div class="registration-mitra__signup-form-info">
                <div class="registration-mitra__signup-form-info--wrapper">
                  <h4>Info Umum</h4>
                  <div class="registration-mitra__signup-form-info-name">
                    <BaseInput
                      v-model="form.name"
                      label="Nama Lengkap"
                      type="text"
                      autofocus
                      autocomplete="name"
                      :error="isFullnameError"
                      placeholder="Agus Permadani"
                    >
                      <template #icon-left>
                        <jds-icon name="user-outline" size="xs" class="text-gray-700" />
                      </template>
                    </BaseInput>
                  </div>
                  <div class="registration-mitra__signup-form-info-company">
                    <BaseInput
                      v-model="form.company"
                      label="Nama Perusahaan"
                      type="text"
                      :autofocus="true"
                      :error="isCompanyError"
                      placeholder="e-Fishery"
                    >
                      <template #icon-left>
                        <img class="text-gray-700" src="@/assets/icons/IconCompany.svg" alt="company">
                      </template>
                    </BaseInput>
                  </div>
                  <div class="registration-mitra__signup-form-info-email">
                    <BaseInput
                      v-model="form.email"
                      label="Email"
                      type="email"
                      :autofocus="true"
                      :error="isEmailError || isErrorEmailMessage"
                      :error-message="emailErrorMessage"
                      placeholder="Contoh: e-Fishery@gmail.com"
                    >
                      <template #icon-left>
                        <img class="text-gray-700" src="@/assets/icons/IconMail.svg" alt="email">
                      </template>
                    </BaseInput>
                  </div>
                </div>
                <hr class="registration-mitra__signup-form-info--line">
                <div class="registration-mitra__signup-form-password">
                  <h4>Kata Sandi</h4>
                  <div class="registration-mitra__signup-form-password--text">
                    <jds-popover
                      :value="isDropdownOpen"
                      :options="popoverOptions"
                    >
                      <template #activator>
                        <BaseInput
                          v-model="form.password"
                          label="Kata Sandi"
                          type="password"
                          :error="isPasswordError"
                          :autofocus="true"
                          placeholder="Masukkan kata sandi"
                          @input="toggleDropdown"
                          @blur="closeDropdown"
                          @focus="onFocusDropdown"
                        >
                          <template #icon-left>
                            <img class="text-gray-700" src="@/assets/icons/IconKey.svg" alt="key  ">
                          </template>
                        </BaseInput>
                      </template>
                      <BaseTooltip
                        :level="levelPassword"
                        :is-dropdown="isDropdownOpen"
                      />
                    </jds-popover>
                  </div>
                  <div class="registration-mitra__signup-form-password--text">
                    <BaseInput
                      v-model="form.password_confirm"
                      label="Ulangi Kata Sandi"
                      type="password"
                      :error="isPasswordConfirmError"
                      :autofocus="true"
                      placeholder="Masukkan kata sandi"
                    >
                      <template #icon-left>
                        <img class="text-gray-700" src="@/assets/icons/IconKey.svg" alt="key">
                      </template>
                    </BaseInput>
                  </div>
                  <div class="registration-mitra__signup-form-password-message">
                    <jds-section-message
                      show
                      variant="info"
                      :message="infoPassword"
                    />
                  </div>
                </div>
              </div>
              <div class="registration-mitra__signup-form-button">
                <BaseButton
                  class="w-full"
                  :disabled="isFormValidation"
                  :label="buttonLabel"
                  :variant="buttonVariant"
                  type="submit"
                  :loading="isLoading"
                  text-loading="Mendaftarkan Akun"
                />
              </div>
              <h4 class="registration-mitra__signup-form-text--line">
                <span class="registration-mitra__signup-form-text--color">atau</span>
              </h4>
            </form>
            <div class="registration-mitra__signup-google-account">
              <BaseButton
                class="w-full"
                @click="googleLogin"
              >
                <img src="~/assets/icons/IconGoogle.svg" alt="Google">
                <span class="font-sans text-bold text-gray-700">Masuk dengan Google</span>
              </BaseButton>
            </div>
            <div v-show="isLogin" class="registration-mitra__login">
              Sudah punya akun?
              <nuxt-link to="/login" class="text-blue-600">
                Masuk disini
              </nuxt-link>
            </div>
          </div>
        </div>
        <div
          :class="{
            'registration-mitra__notification' : true,
            'registration-mitra__notification--hidden' : !isSuccessSubmit
          }
          "
        >
          <div class="registration-mitra__notification-title">
            Daftar Mitra
          </div>
          <div class="registration-mitra__notification-content">
            <div class="registration-mitra__notification-content-image">
              <img width="100px" height="82px" src="@/assets/images/Mailbox.svg" alt="mailbox">
            </div>
            <p class="registration-mitra__notification-content-name">
              Sampurasun, {{ form.name }}!
            </p>
            <p class="registration-mitra__notification-content-info">
              Pengajuan akun Mitra Desa Digital Anda sedang dalam proses verifikasi.
              Kami akan mengirimkan email konfirmasi segera jika anda lolos verifikasi.
            </p>
            <div class="registration-mitra__notification-content-button">
              <BaseButton
                class="w-full md:(max-w-[280px])"
                label="Alihkan ke Email"
                variant="secondary"
                type="button"
                @click="redirectEmail"
              />
            </div>
            <div class="registration-mitra__login">
              Sudah punya akun?
              <nuxt-link to="/login" class="text-blue-600">
                Masuk disini
              </nuxt-link>
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
      isError: false,
      errorMessage: '',
      infoPassword: 'Kata Sandi terdiri dari min. 6 karakter dengan kombinasi huruf besar atau kecil, angka, dan simbol.',
      isFullnameError: false,
      isCompanyError: false,
      isEmailError: false,
      isPasswordError: false,
      isPasswordConfirmError: false,
      isLoading: false,
      isDropdownOpen: false,
      levelPassword: 'default',
      isSuccessSubmit: false,
      isErrorEmailMessage: false,
      emailErrorMessage: '',
      isLogin: false,
      form: {
        name: '',
        email: '',
        company: '',
        password: '',
        password_confirm: ''
      },
      popoverOptions: {
        strategy: 'absolute',
        placement: 'bottom-start',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [
                60,
                38
              ]
            }
          }
        ]
      }
    }
  },
  computed: {
    isFormValidation () {
      const isFullnameValidated = this.form.name === '' || this.form.name === null
      const isCompanyValidated = this.form.company === '' || this.form.company === null
      const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      const isEmailValidated = this.form.email === '' || this.form.email === null || !mailFormat.test(this.form.email)
      const level = this.levelPassword
      let isPasswordValidated = false
      /**
       * This conditional is used to pass validation password when the minimum password level is medium
       */
      switch (level) {
        case 'default':
        case 'low':
          isPasswordValidated = (this.form.password.length < 6 && this.form.password !== this.form.password_confirm) || true
          break
        case 'medium':
        case 'strong':
          isPasswordValidated = (this.form.password.length < 6 && this.form.password !== this.form.password_confirm) || false
          break
        default:
          isPasswordValidated = false
      }
      const isRepeatPasswordValidated = this.form.password_confirm.length < 6 || this.form.password !== this.form.password_confirm
      return isFullnameValidated || isCompanyValidated || isEmailValidated || isPasswordValidated || isRepeatPasswordValidated || this.isLoading
    },
    buttonVariant () {
      if (!this.isFormValidation && !this.isLoading) {
        return 'primary'
      } else {
        return 'disabled'
      }
    },
    buttonLabel () {
      if (!this.isLoading) {
        return 'Daftar Sekarang'
      } else {
        return ''
      }
    },
    showErrorMessage () {
      return this.isError || this.isFullnameError || this.isCompanyError || this.isEmailError || this.isPasswordError || this.isPasswordConfirmError
    }
  },
  watch: {
    'form.name' () {
      this.isFullnameError = false
    },
    'form.company' () {
      this.isCompanyError = false
    },
    'form.email' () {
      this.isEmailError = false
      const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (!mailFormat.test(this.form.email)) {
        this.isErrorEmailMessage = true
        this.emailErrorMessage = 'Email tidak valid'
      } else {
        this.isErrorEmailMessage = false
        this.emailErrorMessage = ''
      }
    },
    'form.password' () {
      this.isPasswordError = false
      // eslint-disable-next-line prefer-regex-literals
      const strongPassword = new RegExp('(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])')
      // eslint-disable-next-line prefer-regex-literals
      const mediumPassword = new RegExp('(?=.{6,})(?=.*[a-z|A-Z])(?=.*[0-9])')
      // eslint-disable-next-line prefer-regex-literals
      const lowPassword = new RegExp('(?=.{6,})(?=.*[a-z|A-Z|^A-Za-z0-9])|(?=.{1,})(?=.*[a-z|A-Z|^A-Za-z0-9])')
      if (strongPassword.test(this.form.password)) {
        this.levelPassword = 'strong'
        this.isDropdownOpen = true
      } else if (mediumPassword.test(this.form.password)) {
        this.levelPassword = 'medium'
        this.isDropdownOpen = true
      } else if (lowPassword.test(this.form.password)) {
        this.levelPassword = 'low'
        this.isDropdownOpen = true
      } else {
        this.levelPassword = 'default'
        this.isDropdownOpen = false
      }
    },
    'form.password_confirm' () {
      this.isPasswordConfirmError = false
      if (this.form.password_confirm !== this.form.password) {
        this.errorMessage = 'Kata sandi yang diinputkan tidak sesuai'
        this.isPasswordConfirmError = true
      } else {
        this.errorMessage = ''
        this.isPasswordConfirmError = false
      }
    }
  },
  mounted () {
    const urlParams = window.location.hash
    if (urlParams) {
      const queryparams = urlParams.split('#')[1]
      const params = queryparams.split('&')
      let pair = null
      const data = []
      params.forEach(function (d) {
        pair = d.split('=')
        data.push({ key: pair[0], value: pair[1] })
      })
      const token = params[1].split('=')[1]
      this.fetchUser(token)
    }
  },
  methods: {
    async submitForm () {
      this.isLoading = true
      const dataForm = { ...this.form }
      try {
        await this.$axios.post('auth/users/sign-up', dataForm, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        this.isSuccessSubmit = true
      } catch (error) {
        if (error.response?.status === 401) {
          this.isError = true
          this.errorMessage = error.response.data?.error
        }
        if (error.response?.status === 422) {
          const errors = error.response.data?.errors
          switch (Object.keys(errors)[0]) {
            case ('name'):
              this.errorMessage = errors[Object.keys(errors)[0]]
              this.isFullnameError = !!this.errorMessage
              break
            case ('company'):
              this.errorMessage = errors[Object.keys(errors)[0]]
              this.isCompanyError = !!this.errorMessage
              break
            case ('email'):
              this.errorMessage = errors[Object.keys(errors)[0]]
              this.isEmailError = !!this.errorMessage
              break
            case ('password'):
              this.errorMessage = errors[Object.keys(errors)[0]]
              this.isPasswordError = !!this.errorMessage
              break
            case ('password_confirm'):
              this.errorMessage = errors[Object.keys(errors)[0]]
              this.isPasswordConfirmError = !!this.errorMessage
              break
          }
        }
        if (!error.response) {
          this.isError = true
          this.errorMessage = 'Mohon maaf server sedang dalam gangguan'
        }
      }
      this.isLoading = false
    },
    toggleDropdown () {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    closeDropdown () {
      this.isDropdownOpen = false
    },
    onFocusDropdown (value) {
      if (value.length >= 1) {
        this.isDropdownOpen = true
      } else {
        this.isDropdownOpen = false
      }
    },
    fetchUser (token) {
      try {
        this.$axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
          .then(({ data }) => {
            this.form.name = data.name
            this.form.email = data.email
          })
      } catch (err) {
        if (err.response?.status === 401) {
          this.error = true
          this.errorMessage = err.response.data?.error
        }
        if (!err.response) {
          this.error = true
          this.errorMessage = 'Mohon maaf server sedang dalam gangguan'
        }
      }
    },
    async googleLogin () {
      try {
        await this.$auth.loginWith('google')
      } catch (err) {
        if (err.response?.status === 401) {
          this.error = true
          this.errorMessage = err.response.data?.error
        }
        if (!err.response) {
          this.error = true
          this.errorMessage = 'Mohon maaf server sedang dalam gangguan'
        }
      }
    },
    redirectEmail () {
      window.location.href = 'https://mail.google.com/ '
    }
  }
}
</script>

<style lang="postcss">
@import './RegistrationMitra.pcss';
</style>
