<template>
  <div id="join-info" class="join-info">
    <h4 class="join-info__heading">
      Jadi Bagian Desa Digital, Jadi Bagian Perubahan
    </h4>
    <p class="join-info__subheading">
      Bergabung sebagai desa dengan ikuti tahapan berikut.
    </p>
    <div class="join-info__infografik">
      <img
        class="max-w-max join-info__infografik-image"
        width="932"
        height="395"
        src="~/assets/images/InfoJoinDesa.svg"
        alt="Info Bergabung Desa"
      >
    </div>
  </div>
</template>

<style lang="postcss">
.join-info {
  background-image: url('~/assets/images/BackgroundGabungDesaMitra.svg');
  background-repeat: no-repeat;
  background-position-x: 5%;
  background-position-y: 75%;
  @apply py-6 px-8 flex flex-col items-center sm:py-10 lg:py-20;

  &__heading {
    @apply font-serif font-bold text-blue-gray-800 text-[24px] leading-[36px] text-center sm:(text-[37px] leading-[60px] mt-8);
  }

  &__subheading {
    @apply text-sm text-blue-gray-600 text-center mt-6 sm:(leading-[23px] mt-5);
  }

  &__switch {
    @apply h-[60px] max-w-full sm:max-w-[376px] rounded-[48px] bg-[#EBEEF3] my-8 flex;

    &--active {
      box-shadow: 0px 4px 12px rgba(0, 27, 61, 0.08);
      @apply bg-white rounded-[48px] w-[184px] sm:max-w-[184px] h-[52px] m-1 flex items-center justify-center transition-all delay-75;

      &-text {
        @apply px-5 py-4 text-blue-gray-800 text-[16px] leading-[19px] font-bold text-center;
      }
    }

    &--non-active {
      @apply rounded-[48px] w-[184px] sm:max-w-[184px] h-[52px] m-1 flex items-center justify-center cursor-pointer;

      &-text {
        @apply px-5 py-4 text-blue-gray-400 text-[16px] leading-[19px] text-center;
      }
    }
  }

  &__infografik {
    @apply w-full max-h-max overflow-auto my-8 flex items-center justify-start lg:justify-center;

    /* Scroll bar stylings */
    scrollbar-color: #E0E0E0 transparent;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      @apply w-5 h-5;
    }

    &::-webkit-scrollbar-track {
      @apply bg-transparent;
    }

    &::-webkit-scrollbar-thumb {
      @apply bg-gray-300 rounded-xl border-solid border-6 border-transparent bg-clip-content;
    }
    /* End of scroll bar stylings */

    &-image {
      width: 932px;
      height: 395px;
    }
  }

  &__cta {
    @apply w-full active:(w-[calc(100%-2px)]) sm:(w-auto active:(w-auto));
  }

}
</style>
