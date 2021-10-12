<template>
  <div class="header">
    <div class="header__container">
      <img v-if="$breakpoints.xs" class="header__icon" src="~/assets/logo/logo-dedi.svg" alt="Logo Desa Digital" @click="$router.push('/')">
      <img v-else src="~/assets/logo/logo-dedi-typo.svg" alt="Logo Desa Digital Typography" @click="$router.push('/')">
      <div class="header__action">
        <NuxtLink to="/about" class="header__about">
          Tentang Desa Digital
        </NuxtLink>
        <BaseButton variant="secondary" type="button" label="Masuk" @click="$router.push('/login')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="postcss">
.header{
  box-shadow: 0px 4px 16px rgba(36, 45, 39, 0.06);
  @apply fixed backdrop-blur-sm bg-white opacity-85 w-full;

  &__container{
    @apply px-4 sm:px-8 h-[60px] flex items-center justify-between max-w-screen-xl xl:(mx-auto p-0);
  }

  &__action{
    @apply flex items-center gap-[16px] sm:gap-6;
  }

  &__icon{
    @apply cursor-pointer w-6 h-8;
  }

  &__about{
    @apply text-green-700 cursor-pointer font-bold text-size-14px px-[16px] py-[14px]
    sm:(px-[8px] py-[10px]);
  }
}
</style>
