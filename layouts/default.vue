<template>
  <div>
    <ModalJoinDedi />
    <ModalCriteriaMitra />
    <ModalCompetitionFlowDetail />
    <SidebarMobile :show="sidebarOpen" @close-sidebar="clsoeSidebar" />
    <Header @open-sidebar="openSidebar" />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'Default',
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
