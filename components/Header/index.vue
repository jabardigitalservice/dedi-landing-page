<template>
  <div class="header">
    <div class="header__container wrapper">
      <img v-if="isXS" class="header__icon" src="~/assets/logo/logo-dedi.svg" alt="Logo Desa Digital" @click="$router.push('/')">
      <img v-if="isXS === false" class="header__icon-typo" src="~/assets/logo/logo-dedi-typo.svg" alt="Logo Desa Digital Typography" @click="$router.push('/')">
      <div v-if="isXS === null" class="header__icon-skeleton" />
      <div class="header__action">
        <BaseButton variant="tertiary" type="button" label="Tentang Desa Digital" @click="$router.push('/about')" />
        <BaseButton variant="secondary" type="button" label="Masuk" @click="$router.push('/login')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      initIsXS: null
    }
  },
  computed: {
    isXS: {
      get () {
        return this.initIsXS
      },
      set (value) {
        (value < 640) ? this.initIsXS = true : this.initIsXS = false
      }
    }
  },
  watch: {
    '$breakpoints.xs' (value) {
      this.initIsXS = value
    }
  },
  mounted () {
    this.isXS = window.screen.availWidth
  }
}
</script>

<style lang="postcss">
.header{
  box-shadow: 0px 4px 16px rgba(36, 45, 39, 0.06);
  @apply fixed backdrop-blur-sm bg-white opacity-85 w-full z-10;

  &__container {
    @apply h-[60px] flex items-center justify-between;
  }

  &__action{
    @apply flex items-center gap-[16px] sm:gap-6;
  }

  &__icon-skeleton {
    @apply h-8 w-6 sm:w-40 bg-white rounded-md;
  }

  &__icon{
    @apply cursor-pointer w-6 h-8;
  }

   &__icon-typo{
    @apply cursor-pointer h-8;
  }
}
</style>
