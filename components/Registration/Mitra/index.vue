<template>
  <div id="registration-mitra" class="registration-mitra">
    <div class="bg-white my-17.25 sm:(p-8 mx-4 w-[680px] rounded-md)">
      <div class="">
        <form class="registration-mitra__form">
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
          <div class="sm:(grid grid-cols-[1fr,32px,1fr] pb-5)">
            <div class="registration-mitra__form-info">
              <h4>Info Umum</h4>
              <div class="registration-mitra__form-info-name">
                <BaseInput
                  label="Nama Lengkap"
                  type="text"
                  :autofocus="true"
                  placeholder="Agus Permadani"
                >
                  <template #icon-left>
                    <jds-icon name="user-outline" size="xs" class="text-gray-700" />
                  </template>
                </BaseInput>
              </div>
              <div class="registration-mitra__form-info-company">
                <BaseInput
                  label="Nama Perusahaan"
                  type="text"
                  :autofocus="true"
                  placeholder="e-Fishery"
                >
                  <template #icon-left>
                    <jds-icon name="home-outline" size="xs" class="text-gray-700" />
                  </template>
                </BaseInput>
              </div>
              <div class="registration-mitra__form-info-email">
                <BaseInput
                  label="Email"
                  type="email"
                  :autofocus="true"
                  placeholder="e-Fishery@gmail.com"
                >
                  <template #icon-left>
                    <jds-icon name="home-outline" size="xs" class="text-gray-700" />
                  </template>
                </BaseInput>
              </div>
            </div>
            <hr class="border-b-1 border-gray-200 mb-4 sm:(w-4 border-l-2 border-y-0 mb-0 h-[250px] mx-4)">
            <div class="registration-mitra__form-password">
              <h4>Kata Sandi</h4>
              <div class="registration-mitra__form-password--text">
                <BaseInput
                  label="Kata Sandi"
                  type="password"
                  :error="true"
                  :autofocus="true"
                >
                  <template #icon-left>
                    <jds-icon name="home-outline" size="xs" class="text-gray-700" />
                  </template>
                </BaseInput>
              </div>
              <div class="registration-mitra__form-password--text">
                <BaseInput
                  label="Ulang Kata Sandi"
                  type="password"
                  :autofocus="true"
                >
                  <template #icon-left>
                    <jds-icon name="home-outline" size="xs" class="text-gray-700" />
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
              label="Daftar Sekarang"
              disabled="true"
              type="submit"
            />
          </div>
          <h4 class="registration-mitra__form-text--line">
            <span class="registration-mitra__form-text--color">atau</span>
          </h4>
        </form>
      </div>
      <div class="registration-mitra__google-account">
        <BaseButton
          class="w-full"
        >
          <img src="~/assets/icons/IconGoogle.svg" alt="Google">
          <span class="font-sans text-bold text-gray-700">Masuk dengan Google</span>
        </BaseButton>
      </div>
      <div class="registration-mitra__create-account">
        Belum punya akun?
        <nuxt-link to="/register" class="text-blue-600">
          Daftar disini
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isError: true,
      errorMessage: '',
      infoPassword: 'Kata Sandi terdiri dari min. 6 karakter dengan kombinasi huruf besar atau kecil, angka, dan simbol.'
    }
  }
}

</script>

<style lang="postcss">
.registration-mitra {
  @apply pt-4 px-4;

  @screen sm {
    background-image: url('~/assets/images/FooterBanner.svg');
    background-position-x: 0%;
    background-position-y: 100%;

    @apply bg-no-repeat bg-cover w-full h-[calc(100vh-60px)] relative bg-[#32E6F9]
    sm:(inline-grid justify-center);
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
    }

    &-password {

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
      @apply mb-4 sm:mb-5;
    }

    &-button .jds-button {
      @apply font-sans font-bold bg-gray-200 text-gray-500 text-sm;
    }

    &-info, &-password {

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

  &__create-account {
    @apply font-sans font-normal text-gray-700 text-center text-sm pb-6;
  }
}

/* Override Base Component style */

.input-text__icon-left {
  @apply !bg-gray-100;
}

.registration-mitra__google-account .jds-button {
  @apply !bg-white !border-1 !border-gray-400;
}

.registration-mitra__google-account .jds-button--primary{
  @apply !border-1 !border-solid !border-gray-400;
}

.registration-mitra__form-password-message .jds-section-message {
  @apply !px-2 !py-1.5;
}
.registration-mitra__form-password-message .jds-section-message__content__text {
  @apply !text-[11px] !leading-[18px];
}
</style>
