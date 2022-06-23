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
          <BaseButton
            v-for="(button, index) in buttons"
            :key="index"
            :class="{
              'header-mobile__submenu': true,
              'header-mobile__submenu--actived': activeRoute === button.value
            }"
            variant="tertiary"
            type="button"
            :label="button.label"
            @click="onClickMenu(button.value)"
          />
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
      isLogin: false,
      buttons: [
        {
          value: 'index',
          label: 'Beranda'
        },
        {
          value: 'sayembara',
          label: 'Sayembara Desa Digital'
        },
        {
          value: 'about',
          label: 'Tentang Desa Digital'
        }]
    }
  },
  computed: {
    activeRoute () {
      return this.$route.name
    }
  },
  methods: {
    onCloseSidebar (closeOn) {
      if (closeOn !== 'overlay' || window.innerWidth < 640) {
        this.$emit('close-sidebar', false)
      }
    },
    onClickMenu (menu) {
      switch (menu) {
        case 'sayembara':
          this.$router.push('/sayembara')
          break
        case 'about':
          this.$router.push('/about')
          break
        default:
          this.$router.push('/')
          break
      }
      this.onCloseSidebar()
    }
  }
}
</script>

<style lang="postcss" scoped>
@import './SidebarMobile.pcss';
</style>
