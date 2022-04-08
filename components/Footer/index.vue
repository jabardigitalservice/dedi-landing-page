<template>
  <div id="footer" class="footer">
    <div class="footer__container wrapper">
      <div class="footer__info">
        <img width="166" height="36" src="~/assets/logo/logo-footer.svg" alt="Logo Desa Digital">
        <a href="https://g.page/jabarcommandcenter?share" class="footer__info-location">
          <img height="24" width="22" src="~/assets/icons/Location.svg" alt="Icon Location">
          <div>
            <div class="footer__info-title">Head Office</div>
            <div class="footer__info-desc">Jabar Command Center (Gedung Setda B Lt. II)</div>
            <div class="footer__info-desc">Jln. Diponegoro No. 22</div>
            <div class="footer__info-desc">Bandung Jawa Barat 40115</div>
          </div>
        </a>
        <div class="footer__info-phone">
          <img height="24" width="22" src="~/assets/icons/Phone.svg" alt="Icon Phone">
          <div>
            <div class="footer__info-title">
              Telepon/whatsapp
            </div>
            <div class="footer__info-desc">
              +62 22 423248
            </div>
          </div>
        </div>
        <div class="footer__info-logo">
          <img class="self-start" height="46" width="136" src="~/assets/logo/logo-diskom.png" alt="Logo Diskom">
          <img class="self-start" height="46" width="137" src="~/assets/logo/logo-dpm.png" alt="Logo DPM">
        </div>
      </div>
      <div class="footer__sitemap">
        <div class="footer__sitemap-title" @click="isOpenSitemap = !isOpenSitemap">
          <div class="footer__sitemap-heading">
            Sitemap
          </div>
          <JdsIcon
            :class="{
              'footer__social-media-icon': true,
              'footer__social-media-icon--open': isOpenSitemap,
              'footer__social-media-icon--close': !isOpenSitemap,
            }"
            name="chevron-down"
            size="20px"
          />
        </div>
        <div
          :class="{
            'footer__sitemap-text': true,
            'footer__sitemap-text--open': isOpenSitemap,
            'footer__sitemap-text--close': !isOpenSitemap
          }"
        >
          <a v-scroll-to="{ el: '#header' }" class="footer__sitemap-text-item">
            <span class="footer__sitemap-text-title">Tentang Desa Digital</span>
          </a>
          <a v-scroll-to="{ el: '#village-partner' }" class="footer__sitemap-text-item">
            <span class="footer__sitemap-text-title">Data Perkembangan Desa Digital</span>
          </a>
          <a v-scroll-to="{ el: '#testimonial' }" class="footer__sitemap-text-item">
            <span class="footer__sitemap-text-title">Testimoni User</span>
          </a>
          <a v-scroll-to="{ el: '#join-info' }" class="footer__sitemap-text-item">
            <span class="footer__sitemap-text-title">Cara Bergabung</span>
          </a>
          <a v-scroll-to="{ el: '#contact-us' }" class="footer__sitemap-text-item">
            <span class="footer__sitemap-text-title">Kontak Kami</span>
          </a>
        </div>
      </div>
      <div class="footer__social-media">
        <div class="footer__social-media-title" @click="isOpenSM = !isOpenSM">
          <h3 class="footer__social-media-heading">
            Media Sosial
          </h3>
          <JdsIcon
            :class="{
              'footer__social-media-icon': true,
              'footer__social-media-icon--open': isOpenSM,
              'footer__social-media-icon--close': !isOpenSM,
            }"
            name="chevron-down"
            size="20px"
          />
        </div>
        <div
          :class="{
            'footer__social-media-logo': true,
            'footer__social-media-logo--open': isOpenSM,
            'footer__social-media-logo--close': !isOpenSM
          }"
        >
          <a href="#" class="footer__social-media-logo-item">
            <img width="24" height="24" src="~/assets/logo/logo-facebook.svg" alt="Logo Facebook">
            <span class="footer__social-media-logo-item-text">Facebook</span>
          </a>
          <a href="#" class="footer__social-media-logo-item">
            <img width="24" height="24" src="~/assets/logo/logo-youtube.svg" alt="Logo Facebook">
            <span class="footer__social-media-logo-item-text">Youtube</span>
          </a>
          <a href="#" class="footer__social-media-logo-item">
            <img width="24" height="24" src="~/assets/logo/logo-instagram.svg" alt="Logo Facebook">
            <span class="footer__social-media-logo-item-text">Instagram</span>
          </a>
          <a href="#" class="footer__social-media-logo-item">
            <img width="24" height="24" src="~/assets/logo/logo-twitter.svg" alt="Logo Facebook">
            <span class="footer__social-media-logo-item-text">Twitter</span>
          </a>
        </div>
      </div>
    </div>
    <div class="footer__copyright wrapper">
      <div class="footer__copyright-container">
        <img width="206" height="21" src="~/assets/logo/logo-jds.svg" alt="Logo Jabar Digital Service">
        <span class="footer__copyright-text">Copyright © {{ new Date().getFullYear() }}. All Rights Reserved</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpenSM: false,
      isOpenSitemap: false
    }
  }
}
</script>

<style lang="postcss" scoped>
.footer {
  @apply bg-[#3CBF80];

  &__container {
    @apply grid grid-cols-1 gap-6 pt-6 sm:(grid-cols-2) md:(grid-cols-3);
  }

  &__info {
    @apply flex flex-col gap-6 items-start;

    &-title {
      @apply font-bold text-xs leading-[18px] text-white sm:leading-[19px];
    }

    &-desc {
      @apply font-roboto text-sm text-white sm:(font-sans leading-[23px]);
    }

    &-location {
      @apply flex items-start gap-1;
    }

    &-phone {
      @apply flex items-start gap-1;
    }

    &-logo {
      @apply flex gap-8 flex-wrap;
    }
  }

  &__sitemap {
    @apply flex flex-col mt-2;

    &-title {
      @apply flex justify-between items-center cursor-pointer sm:(pointer-events-none);
    }

    &-heading {
      @apply font-roboto text-[21px] leading-[34px] text-white font-bold ;
    }

    &-icon {
      @apply text-white transition-all sm:!hidden;

      &--open {
        @apply transform rotate-0;
      }

      &--close {
        @apply transform -rotate-90;
      }
    }

    &-text {
      @apply grid grid-cols-1 gap-6 pt-6 transition-all ease-in-out duration-700 overflow-hidden sm:gap-5;

      &-title {
        @apply text-white text-sm font-roboto sm:(font-sans leading-[23px]);
      }

      &-item {
        @apply flex gap-3 items-center cursor-pointer;
      }

      &--open {
        @apply max-h-xs;
      }

      &--close {
        @apply max-h-0 pt-0 sm:(max-h-xs pt-6);
      }
    }
  }

  &__social-media {
    @apply flex flex-col mt-2;

    &-title {
      @apply flex justify-between items-center cursor-pointer sm:(pointer-events-none);
    }

    &-heading {
      @apply font-roboto text-[21px] leading-[34px] text-white font-bold ;
    }

    &-icon {
      @apply text-white transition-all sm:!hidden;

      &--open {
        @apply transform rotate-0;
      }

      &--close {
        @apply transform -rotate-90;
      }
    }

    &-logo {
      @apply grid grid-cols-2 gap-6 pt-6 sm:gap-5 transition-all ease-in-out duration-700 overflow-hidden;

      &-item {
        @apply flex gap-3 items-center;

        &-text {
          @apply text-white text-sm font-roboto sm:(font-sans font-medium leading-[23px]);
        }
      }

      &--open {
        @apply max-h-xs;
      }

      &--close {
        @apply max-h-0 pt-0 sm:(max-h-xs pt-6);
      }
    }
  }

  &__copyright {
    @apply border-t-1 border-[#4CD894] sm:col-span-3 mt-6;

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
