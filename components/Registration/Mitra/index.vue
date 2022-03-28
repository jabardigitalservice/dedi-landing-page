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
          <form class="registration-mitra__form" method="post" @submit.prevent="submitForm">
            <div class="registration-mitra__form-title">
              Daftar Mitra
            </div>
            <div v-if="isError" class="registration-mitra__form-error-message">
              <jds-section-message
                :show="isError"
                variant="error"
                :message="errorMessage"
              />
            </div>
            <div class="registration-mitra__form-info">
              <div class="registration-mitra__form-info--wrapper">
                <h4>Info Umum</h4>
                <div class="registration-mitra__form-info-name">
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
                <div class="registration-mitra__form-info-company">
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
                <div class="registration-mitra__form-info-email">
                  <BaseInput
                    v-model="form.email"
                    label="Email"
                    type="email"
                    :autofocus="true"
                    :error="isEmailError"
                    placeholder="Contoh: e-Fishery@gmail.com"
                  >
                    <template #icon-left>
                      <img class="text-gray-700" src="@/assets/icons/IconMail.svg" alt="email">
                    </template>
                  </BaseInput>
                </div>
              </div>
              <hr class="registration-mitra__form-info--line">
              <div class="registration-mitra__form-password">
                <h4>Kata Sandi</h4>
                <div class="registration-mitra__form-password--text">
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
                <div class="registration-mitra__form-password--text">
                  <BaseInput
                    v-model="form.password_confirm"
                    label="Ulang Kata Sandi"
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
                <div class="registration-mitra__form-password-message">
                  <jds-section-message
                    show
                    variant="info"
                    :message="infoPassword"
                  />
                </div>
              </div>
            </div>
            <div class="registration-mitra__form-button">
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
            <h4 class="registration-mitra__form-text--line">
              <span class="registration-mitra__form-text--color">atau</span>
            </h4>
          </form>
          <div class="registration-mitra__google-account">
            <BaseButton
              class="w-full"
            >
              <img src="~/assets/icons/IconGoogle.svg" alt="Google">
              <span class="font-sans text-bold text-gray-700">Masuk dengan Google</span>
            </BaseButton>
          </div>
          <div class="registration-mitra__login">
            Sudah punya akun?
            <nuxt-link to="/login" class="text-blue-600">
              Masuk disini
            </nuxt-link>
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
      const isRepeatPasswordValidated = this.form.password.length < 6 || this.form.password_confirm !== this.form.password
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
    }
  },
  watch: {
    'form.email' () {
      const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (!mailFormat.test(this.form.email)) {
        this.isEmailError = true
      } else {
        this.isEmailError = false
      }
    },
    'form.password' () {
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
      if (this.form.password_confirm !== this.form.password) {
        this.isPasswordConfirmError = true
      } else {
        this.isPasswordConfirmError = false
      }
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
          this.errorMessage = errors[Object.keys(errors)[0]]
          this.isError = !!this.errorMessage
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
    }
  }
}
</script>

<style lang="postcss">
.registration-mitra {

  &--position {
    @apply flex flex items-end relative sm:(bg-[#32E6F9]);
  }

  &__image {
    @apply hidden sm:(absolute block);
  }

  &__signup {
    @apply bg-white my-17.25 absolute top-0 p-4 sm:(p-8 my-[70px] mx-auto w-[640px] h-[620px] relative rounded-md);

    &--hidden {
      @apply hidden;
    }
  }

  &__form {

    &-title {
      @apply font-roboto font-bold text-[16px] leading-[22px] text-gray-800 pb-4
      sm:(pb-5);
    }

    &-error-message {
      @apply pb-4
      sm:(pb-5);
    }

    &-info {

      &-name, &-company, {
        @apply font-roboto text-[14px] leading-[16.41px] pb-4
        sm:(pb-5);
      }

      &-email {
        @apply font-roboto text-[14px] leading-[16.41px] pb-4
        sm:(pb-0)
      }

      &--line {
        @apply border-b-1 border-gray-200 mb-4 sm:(w-4 border-l-2 border-y-0 mb-0 h-[250px] mx-4);
      }
    }

    &-password {

      h4 {
        @apply font-roboto font-bold text-[16px] leading-[22px] text-green-700 pb-4;
      }

      &--text {
        @apply font-roboto text-[14px] leading-[16.41px] pb-4
        sm:(pb-5);
      }

      &-message {
        @apply pb-4
        sm:(pb-0);
      }
    }

    &-button {
      @apply mb-4
      sm:mb-5;
    }

    &-info {
      @apply sm:(grid grid-cols-[1fr,32px,1fr] pb-5);

      h4 {
        @apply font-roboto font-bold text-[16px] leading-[22px] text-green-700 pb-4;
      }
    }

    &-text {
      @apply py-4;

      &--line {
        @apply w-full border-b-1 border-solid border-gray-200 text-center leading-[1.5px] mt-3 mb-6 mx-0;
      }
      &--color {
        @apply font-sans font-normal text-[14px] leading-[0px] bg-white text-gray-500 px-2.5
        sm:(mb-3);
      }
    }
  }

  &__google-account {
    @apply mb-4
    sm:(mt-3 mb-5);
  }

  &__login {
    @apply font-sans font-normal text-gray-700 text-center text-sm pb-6;
  }

  &__notification {
    @apply grid grid-cols-1 justify-center;

    &-title {
      @apply font-roboto font-bold text-[16px] leading-[22px] text-gray-800 pb-4
      sm:(pb-5);
    }

    &-content {
      @apply flex flex-col justify-center items-center;

      &-image {
        @apply mb-4;
      }

      &-mailbox {
        @apply pb-4;
      }

      &-name {
        @apply font-sans font-bold text-base text-center text-gray-800;
      }

      &-info {
        @apply font-sans font-normal text-sm text-center text-gray-600 pb-4;
      }

      &-button {
        @apply w-full pb-8 text-center;
      }
    }

    &--hidden {
      @apply hidden;
    }
  }
}

/* Override Base Component style & design system */

.input-text__icon-left {
  @apply !bg-gray-100;
}

.registration-mitra__google-account .jds-button {
  @apply !bg-white !border-1 !border-gray-400;
}

.registration-mitra__google-account .jds-button--primary {
  @apply !border-1 !border-solid !border-gray-400;
}

.registration-mitra__form-password-message .jds-section-message {
  @apply !px-2 !py-1.5;
}

.registration-mitra__form-password-message .jds-section-message__content__text {
  @apply !text-[11px] !leading-[18px];
}

.registration-mitra__form-password--text .jds-popover,
.registration-mitra__form-password--text .jds-popover .jds-popover__activator {
  @apply !w-full;
}

.registration-mitra__form-password--text .jds-popover .input-text__wrapper-input {
  @apply !w-full md:!w-[292px];
}
</style>
