<template>
  <div>
    <AboutBanner />
    <Potency />
    <Achievement />
    <DevelopmentStage />
    <ThreePillars />
    <Team />
    <TheySaid />
    <ContactUs />
    <JoinDedi :show="modalOpen" @closeModal="closeModal" />
  </div>
</template>

<script>
export default {
  name: 'PageAbout',
  data () {
    return {
      modalOpen: false
    }
  },
  methods: {
    showModal (value) {
      this.modalOpen = value
    },
    closeModal (value) {
      this.modalOpen = value
    }
  }
}
</script>

<style>

</style>
