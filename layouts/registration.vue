<template>
  <div>
    <SidebarMobile :show="sidebarOpen" @close-sidebar="closeSidebar" />
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
    closeSidebar (value) {
      this.sidebarOpen = value
    }
  }
}
</script>
