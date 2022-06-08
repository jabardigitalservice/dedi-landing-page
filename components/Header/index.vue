<template>
  <header id="header" class="header">
    <div class="header__container wrapper">
      <img class="header__icon" src="~/assets/logo/logo-dedi.svg" alt="Logo Desa Digital" @click="$router.push('/')">
      <img class="header__icon-typo" src="~/assets/logo/logo-dedi-typo.svg" alt="Logo Desa Digital Typography" @click="$router.push('/')">
      <div class="header__menu-icon--hidden">
        <BaseButton variant="tertiary-paddingless" @click="openSidebar">
          <template #icon>
            <jds-icon class="text-black" size="20px" name="menu-burger" />
          </template>
        </BaseButton>
      </div>
      <div class="header__action">
        <BaseButton variant="tertiary" type="button" label="Sayembara Desa Digital" @click="$router.push('/competition')" />
        <span class="text-gray-300">|</span>
        <BaseButton variant="tertiary" type="button" label="Tentang Desa Digital" @click="$router.push('/about')" />
      <!-- @Temporary hide login button -->
      <!-- <BaseButton variant="secondary" type="button" label="Masuk" @click="$router.push('/login')" /> -->
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    openSidebar () {
      this.$emit('open-sidebar', true)
    }
  }
}
</script>

<style lang="postcss">
.header {
  box-shadow: 0px 4px 16px rgba(36, 45, 39, 0.06);
  @apply fixed backdrop-filter backdrop-blur-[20px] bg-white bg-opacity-85 w-full z-10;

  &__container {
    @apply h-[60px] flex items-center justify-between;
  }

  &__action {
    @apply flex items-center gap-[16px] hidden sm:(gap-6 block);
  }

  &__icon-skeleton {
    @apply h-8 w-6 sm:w-40 bg-white rounded-md;
  }

  &__icon {
    @apply cursor-pointer w-6 h-8 sm:hidden;
  }

  &__icon-typo {
    @apply cursor-pointer h-8 hidden sm:block;
  }

  &__menu-icon--hidden {
    @apply sm:(hidden);
  }
}
</style>
