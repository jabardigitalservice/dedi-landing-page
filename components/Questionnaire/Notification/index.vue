<template>
  <div id="notification" class="notification">
    <div class="notification__title">
      <h1>
        Kuisioner Desa Digital
      </h1>
    </div>
    <div
      v-show="showContent"
      class="notification__content"
    >
      <div class="notification__content--position">
        <div class="notification__content-image">
          <img width="100px" height="82px" src="@/assets/images/Mailbox.svg" alt="mailbox">
        </div>
        <p class="notification__content-subtitle">
          Terima kasih telah mendaftar Desa Digital!
        </p>
        <div v-if="level < 4" class="notification__content--container">
          <p class="notification__content-message">
            Desa Anda masuk dalam <strong>kategori Desa {{ level }}.0.</strong> {{ message }}
          </p>
          <div class="notification__content-info">
            <jds-section-message
              show
              name="info"
              variant="info"
              :message="info"
            />
          </div>
          <div class="notification__content-action">
            <BaseButton
              class="md:(max-w-[280px])"
              label="Kembali ke Beranda"
              variant="primary"
              type="button"
              @click="onHome"
            />
          </div>
        </div>
        <div v-if="level === 4" class="notification__content--container">
          <div class="notification__content-message">
            <p>
              {{ message }}
            </p>
            <p>
              Form harus diisi sebelum <span class="notification__content-message--bold">tanggal 02/05/2022 pukul 17:00 WIB.</span> Jika terpilih, Tim Desa Digital akan menghubungi Anda untuk proses selanjutnya.
            </p>
          </div>
          <div class="notification__content-info">
            <div class="notification__content-info--warning">
              <jds-icon class="notification__content-info--icon" name="warning" size="sm" />
              <div class="notification__content-info--text">
                <strong>Perhatian!</strong> {{ info }}
              </div>
            </div>
          </div>
          <div class="notification__content-action">
            <div v-show="showPotencyAction">
              <div class="notification__content-action-potency">
                <BaseButton
                  v-show="showAgriculture"
                  variant="primary"
                  type="button"
                  class="notification__content-action-potency--btn"
                  @click="showAgricultureForm"
                >
                  Isi Form Potensi Pertanian
                  <jds-icon
                    name="open-new-tab"
                    size="14px"
                    class="pl-2"
                  />
                </BaseButton>
                <BaseButton
                  v-show="showEfishery"
                  variant="primary"
                  type="button"
                  class="notification__content-action-potency--btn"
                  @click="showFisheryForm"
                >
                  Isi Form Potensi Perikanan
                  <jds-icon
                    name="open-new-tab"
                    size="14px"
                    class="pl-2"
                  />
                </BaseButton>
              </div>
              <h4 class="registration-mitra__form-text--line">
                <span class="registration-mitra__form-text--color">atau</span>
              </h4>
            </div>
            <BaseButton
              class="md:(max-w-[280px])"
              label="Kembali ke Beranda"
              variant="secondary"
              type="button"
              @click="onHome"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { optionsNotification } from '@/constants/questionnaire.js'
export default {
  props: {
    level: {
      type: Number,
      default: null
    },
    potencyVillages: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      optionsNotification,
      message: '',
      info: '',
      urlPotencyEfisheryForm: this.$config.urlPotencyEfisheryForm,
      urlPotencyArgicultureForm: this.$config.urlPotencyArgicultureForm
    }
  },
  computed: {
    showContent () {
      if (!isNaN(this.level)) {
        this.showNotif()
        return true
      } else {
        return false
      }
    },
    showPotencyAction () {
      if (this.potencyVillages.includes('Perikanan') || this.potencyVillages.includes('Pertanian')) {
        return true
      } else {
        return false
      }
    },
    showEfishery () {
      if (this.potencyVillages.includes('Perikanan')) {
        return true
      } else {
        return false
      }
    },
    showAgriculture () {
      if (this.potencyVillages.includes('Pertanian')) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    onHome () {
      this.$router.push('/')
    },
    showNotif () {
      for (const notifVillage of this.optionsNotification) {
        if (notifVillage.level === this.level) {
          this.message = notifVillage.message
          this.info = notifVillage.info
        }
      }
    },
    showAgricultureForm () {
      // @todo: replace link google with actual link form
      window.open(this.urlPotencyArgicultureForm)
    },
    showFisheryForm () {
      // @todo: replace link google with actual link form
      window.open(this.urlPotencyEfisheryForm)
    }
  }
}
</script>

<style lang='postcss' scoped>
.notification {
  @apply my-17.25 grid grid-rows-1 p-4
  sm:(my-[30px] bg-white p-8 mx-auto bg-white w-[680px] max-h-[640px] rounded-2xl);

   &__title > h1 {
    @apply font-roboto font-bold text-[16px] leading-[22px] text-gray-800 mb-4
    sm:(leading-[26px] mb-5);
  }

  &__content {
    @apply grid grid-rows-1 text-center h-full mt-4 mb-6;

    &--container {
      @apply pb-4 flex flex-col justify-center items-center;
    }

    &--position {
      @apply my-auto;
    }

    &-image {
      @apply inline-flex justify-center;
    }

    &-subtitle {
      @apply font-serif font-bold text-[16px] leading-[22px] text-green-700 pt-4 pb-2
      sm:(text-[21px] leading-[34px]);
    }

    &-message {
      @apply text-center font-sans font-normal text-[14px] leading-[20px] text-gray-800 pb-4
      sm:(leading-[23px] max-w-[439px]);

      &--bold {
        @apply text-green-700 font-bold;
      }
    }

    &-info {
      @apply pb-4 max-w-[483px] text-left;

      &--warning {
         @apply flex justify-items-start mb-3 px-2.5 py-2 bg-yellow-50 border border-yellow-800 rounded-lg w-max;
      }

      &--icon {
        @apply text-yellow-800;
      }

      &--text {
        @apply text-[12px] leading-[23px] ml-4;
      }
    }

    &-action {

      &-potency {
        @apply w-full pb-4 inline-flex gap-4;

        &-btn {
          @apply w-full active:(w-[calc(100%-2px)])
          md:(w-[unset] active:w-[unset]);
        }
      }
    }
  }
}
</style>
