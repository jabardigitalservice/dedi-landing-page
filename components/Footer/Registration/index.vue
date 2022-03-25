<template>
  <div id="footer" class="footer">
    <div class="footer__copyright wrapper">
      <div class="footer__copyright-container">
        <img width="206" height="21" src="~/assets/logo/logo-jds.svg" alt="Logo Jabar Digital Service">
        <span class="footer__copyright-text">Copyright © {{ new Date().getFullYear() }}. All Rights Reserved</span>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.footer {
  @apply bg-[#3CBF80];

  &__copyright {
    @apply border-t-1 border-[#4CD894] sm:col-span-3;

    &-text {
      @apply text-sm text-white;
    }

    &-container {
      @apply w-full h-[60px]
      flex flex-col justify-center items-center gap-1 sm:(justify-between gap-0 flex-row);
    }
  }
}
</style>
