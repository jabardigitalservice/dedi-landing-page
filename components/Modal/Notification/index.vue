<template>
  <div id="notification" class="notification">
    <div class="notification__title">
      <h1>
        Kuisioner Desa Digital
      </h1>
    </div>
    <div class="notification__content">
      <div class="notification__content--position">
        <div class="notification__content-image">
          <img width="100px" height="82px" src="@/assets/images/Mailbox.svg" alt="mailbox">
        </div>
        <p class="notification__content-subtitle">
          Terima kasih telah mendaftar Desa Digital!
        </p>
        <p class="notification__content-message">
          Akun Desa Digital Anda akan ditinjau kembali oleh administrator untuk verfifikasi lebih lanjut.
        </p>
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
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang='postcss' scoped>
.notification {
  @apply w-screen h-screen px-4 pt-4 pb-6
  sm:(p-8 bg-white w-[680px] h-[642px] rounded-2xl);

   &__title > h1 {
    @apply font-roboto font-bold text-[16px] leading-[22px] text-gray-800 mb-4
    sm:(leading-[26px] mb-5);
  }

  &__content {
    @apply grid grid-rows-1 text-center h-full mt-4 mb-6
    sm:(h-[532px]);

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
      sm:(leading-[23px]);
    }
  }
}
</style>
