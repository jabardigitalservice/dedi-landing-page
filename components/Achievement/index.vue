<template>
  <div id="achievement" class="achievement">
    <div class="wrapper">
      <h1>Sudah Diakui Hingga Kancah Internasional</h1>
      <div class="achievement__main">
        <CardAchievement />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentAchievement'
}
</script>

<style lang="postcss">
  .achievement {
    @apply w-full h-full py-6 bg-[#FCFCFC]
    md: (py-15)
    xl: (pt-30 pb-15);

    h1 {
      @apply w-full h-full text-[28px] text-center leading-[42px] font-serif font-bold text-blue-gray-800
      md: (w-1/2 text-[32px] text-left leading-[50px])
      lg: (text-[42px] leading-15);
    }

    &__main {
      @apply w-full h-full;
    }
  }
</style>
