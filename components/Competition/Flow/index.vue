<template>
  <div id="competition-flow" class="competition-flow">
    <div class="competition-flow__wrapper">
      <div class="competition-flow__title">
        <h1>Alur Sayembara Desa Digital</h1>
      </div>
      <div class="competition-flow__main">
        <img
          height="361"
          width="1090"
          class="competition-flow__main--img"
          src="~/assets/images/competition/AlurSayembara.svg"
          alt="Alur Sayembara"
        >
      </div>
      <div class="competition-flow__button">
        <BaseButton
          class="competition-flow__button-btn"
          variant="secondary"
          type="button"
          label="Lihat Detail Alur Sayembara Desa Digital"
          @click="onClickDetail"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompetitionFlow',
  methods: {
    onClickDetail () {
      this.$emit('onClickFlowDetail', true)
    }
  }
}
</script>

<style lang="postcss" scoped>
  .competition-flow {
    @apply w-full h-full;
    background: linear-gradient(to bottom, #FFFFFF 0%, #F9F9F9 50%, #F4F4F4 100%);

    &__wrapper {
      @apply max-w-7xl mx-auto px-4 py-6 md:(px-6 py-10) lg:(py-20 px-0);
    }

    &__title {
      h1 {
        @apply text-[40px] leading-normal text-blue-gray-800 text-center font-font-serif font-bold;
      }
    }

    &__main {
      @apply w-full h-full overflow-x-auto flex items-center justify-start my-[40px] lg:(justify-center);

      /* Scroll bar stylings */
      scrollbar-color: #E0E0E0 transparent;
      scrollbar-width: thin;

      &::-webkit-scrollbar{
        @apply w-5 h-5;
      }

      &::-webkit-scrollbar-track {
        @apply bg-transparent;
      }

      &::-webkit-scrollbar-thumb {
        @apply bg-gray-300 rounded-xl border-solid border-6 border-transparent bg-clip-content;
      }
      /* End of scroll bar stylings */

      &--img {
        @apply h-[323px] max-w-max md:(h-[361px] w-full);
      }
    }

    &__button {
      @apply flex justify-center w-full;

      &-btn {
        @apply w-full md:(w-auto);
      }
    }
  }

</style>
