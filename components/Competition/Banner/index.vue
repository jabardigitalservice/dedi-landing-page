<template>
  <div class="wrapper">
    <div class="competition-banner">
      <div class="competition-banner__wrapper">
        <div class="competition-banner__info">
          <div class="competition-banner__info-title">
            Bersiap Untuk
          </div>
          <div class="competition-banner__info-title">
            <span class="text-green-700">Ciptakan Perubahan</span> Melalui
            <span class="competition-banner__info-title_extend">Sayembara Desa Digital</span>
          </div>
          <div class="competition-banner__info-subtitle">
            Sayembara Desa Digital
          </div>
          <p class="competition-banner__info-desc">
            Jadi bagian dari Desa Digital sebagai desa penerima manfaat ataupun sebagai mitra dari desa.
          </p>
          <div class="competition-banner__info-cta">
            <BaseButton class="competition-banner__info-cta-btn" label="Bergabung Sekarang" @click="onClickCTA" />
          </div>
        </div>
        <img
          class="competition-banner__image"
          src="~/assets/images/competition/Supergraphic_Syaembara_Desa_Digital.png"
          alt="Competition Banner"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentBanner',
  methods: {
    onClickCTA () {
      this.$emit('onClickCTA', true)
    }
  }
}
</script>
<style lang="postcss" scoped>
.competition-banner {
  @apply pt-[60px] pb-6 lg:(pb-[unset]);

  &__wrapper {
    @apply flex flex-col
    md:(px-6 py-10 grid grid-cols-2 gap-8)
    lg:(px-[unset] py-[unset] grid grid-cols-2 justify-between items-center gap-20);
  }

  &__info {
    @apply col-span-1 lg:(w-[443px]) xl:(w-[unset]);

    &-title {
      @apply font-serif text-left text-[30px] leading-[48px]
      text-blue-gray-700 font-bold
      lg:(text-left text-[32px] leading-[52px]);

      &_extend {
        @apply md:(hidden);
      }
    }

    &-subtitle {
      @apply font-serif text-left text-[30px] leading-[48px]
      text-blue-gray-700 font-bold mt-[2px] hidden
      md:(flex)
      lg:(text-left text-[48px] leading-[79px]);
    }

    &-desc {
      @apply text-blue-gray-500 text-left w-full my-6;
    }

    &-cta {
      &-btn {
        @apply w-full active:(w-[calc(100%-2px)])
        lg:(w-[unset] active:w-[unset]);
      }
    }
  }

  &__image {
    @apply col-span-1 my-6 md:(w-[527px] h-[auto]) lg:(w-[624px] h-[auto] my-[unset]);
  }
}
</style>
