<template>
  <transition name="fade-sidebar" mode="in-out">
    <section
      :class="{
        'header-mobile': true,
        'header-mobile--show': show,
        'header-mobile--hide': !show,
      }"
      @click.self="onCloseSidebar('overlay')"
    >
      <div
        class="header-mobile__wrapper"
      >
        <div class="header-mobile__title">
          <img width="160" height="32" src="~/assets/logo/logo-dedi-typo.svg" alt="Logo Desa Digital Typography">
          <BaseButton variant="tertiary-paddingless" @click="onCloseSidebar">
            <template #icon>
              <img height="20" width="20" src="~/assets/icons/IconTimesBlack.svg" alt="Icon Times">
            </template>
          </BaseButton>
        </div>
        <div class="header-mobile__menu">
          <BaseButton class="header-mobile__submenu" variant="tertiary" type="button" label="Beranda" @click="$router.push('/')" />
          <BaseButton class="header-mobile__submenu" variant="tertiary" type="button" label="Sayembara Desa Digital" @click="$router.push('/sayembara')" />
          <BaseButton class="header-mobile__submenu" variant="tertiary" type="button" label="Tentang Desa Digital" @click="$router.push('/about')" />
        </div>
        <!-- The login button is temporarily hidden -->
        <div v-show="isLogin" class="header-mobile__login">
          <BaseButton
            class="w-full"
            variant="secondary"
            type="button"
            label="Masuk"
            :disabled="true"
            @click="$router.push('/login')"
          />
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    onCloseSidebar (closeOn) {
      if (closeOn !== 'overlay' || window.innerWidth < 640) {
        this.$emit('close-sidebar', false)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
@import './SidebarMobile.pcss';
</style>
