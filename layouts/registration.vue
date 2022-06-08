<template>
  <div>
    <SidebarMobile :show="sidebarOpen" @close-sidebar="clsoeSidebar" />
    <Header @open-sidebar="openSidebar" />
    <Nuxt />
    <FooterRegistration class="hidden md:(block)" />
  </div>
</template>

<script>
export default {
  name: 'Registration',
  data () {
    return {
      sidebarOpen: false
    }
  },
  methods: {
    openSidebar (value) {
      this.sidebarOpen = value
    },
    clsoeSidebar (value) {
      this.sidebarOpen = value
    }
  }
}
</script>
