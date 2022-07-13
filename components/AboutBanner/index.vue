<template>
  <div id="about-banner" class="wrapper">
    <div class="about-banner">
      <div class="about-banner__wrapper">
        <div class="about-banner__info">
          <h2 class="about-banner__info-title">
            Meniadakan Batasan Untuk
          </h2>
          <h2 class="about-banner__info-subtitle">
            Membawa Perubahan
          </h2>
          <p class="about-banner__info-desc">
            Perluas jangkauan, kembangkan kapasitas masyarakat, dan
            maksimalkan potensi desa.
          </p>
          <div class="about-banner__info-cta">
            <BaseButton class="about-banner__info-cta-btn" label="Cek Level Desa" @click="onClickCTA" />
          </div>
        </div>
        <img class="about-banner__image" src="~/assets/images/AboutBanner.png" alt="About Banner">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentBannerAbout',
  methods: {
    onClickCTA () {
      this.$emit('onClickCTA')
    }
  }
}
</script>
<style lang="postcss" scoped>
.about-banner {
  @apply pt-[60px] pb-6 lg:(pb-[unset]);

  &__wrapper {
    @apply flex flex-col-reverse lg:(flex-row justify-between items-center);
  }

  &__info {
    @apply block lg:(w-[443px]) xl:(w-[unset]);

    &-title {
      @apply font-serif text-center text-[20px] leading-[40px]
      text-blue-gray-700 font-bold mt-6
      lg:(mt-[unset] text-left text-[24px] leading-[45px])
      xl:(text-[38px]);
    }

    &-subtitle {
      @apply font-serif text-center text-[20px] leading-[40px]
      text-blue-gray-700 font-bold
      lg:(mt-[unset] text-left text-[40px] leading-[46.88px])
      xl:(text-[56px] leading-[65.63px]);
    }

    &-desc {
      @apply text-blue-gray-500 text-center w-full mt-6
      lg:(text-left leading-[26px])
      xl:(w-[70%]);
    }

    &-cta {
      @apply mt-6 lg:(mt-8);

      &-btn {
        @apply w-full active:(w-[calc(100%-2px)])
        lg:(w-[unset] active:w-[unset]);
      }
    }
  }

  &__image {
    @apply w-full lg:(w-[549px] h-[435px]) xl:(w-[696px] h-[522px]);
  }
}
</style>
