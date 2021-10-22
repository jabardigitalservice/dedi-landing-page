<template>
  <div class="contact-us">
    <div class="contact-us__main">
      <div class="relative px-4 pt-[100px]">
        <div class="flex flex-col gap-1">
          <h3 class="contact-us__title">
            Ingin Tahu Lebih Detail Tentang
          </h3>
          <h3 class="contact-us__title">
            Desa Digital
          </h3>
        </div>
        <div class="contact-us__cta">
          <BaseButton class="contact-us__cta-btn" @click="onClickCTA">
            <template #icon>
              <img src="~/assets/icons/Whatsapp.svg" alt="Icon Whatsapp">
            </template>
            Hubungi Tim Kami Via Whatsapp
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickCTA () {
      window.open('https://api.whatsapp.com/send?phone=6281312848205', '_blank')
    }
  }
}
</script>

<style lang="postcss">
.contact-us {
  @apply h-[406px];

  &__main {
    background-image: url('~/assets/images/FooterBanner.png');
    @apply bg-no-repeat bg-cover w-full h-full relative;

    &::before {
      content: "";
      background-image: url('~/assets/images/MotifFooter.png');
      background-size: calc(max(100%, 1440px)) auto;
      @apply bg-no-repeat w-full h-full absolute top-0 left-0;
    }
  }

  &__title {
    @apply text-[20px] leading-[28px]
    text-center font-serif font-bold text-blue-gray-700
    sm:(text-[28px] leading-[35.84px]);
  }

  &__cta {
    @apply mt-6 sm:(mt-8 flex justify-center);

    &-btn {
      @apply w-full active:(w-[calc(100%-2px)])
      sm:(w-auto active:(w-auto));
    }
  }
}
</style>
