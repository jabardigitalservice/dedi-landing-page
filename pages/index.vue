<template>
  <div>
    <HeroBanner @clickCTA="onClickCTA" />
    <VillagePartner />
    <Testimonial />
    <JoinInfo />
    <ContactUs />
    <JoinDedi :show="modalOpen" @closeModal="closeModal" />
    <Announcement :show="showAnnouncement" @on-close-modal="onTriggerAnnouncement" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      modalOpen: false,
      showAnnouncement: false
    }
  },
  mounted () {
    window.addEventListener('load', () => {
      this.showAnnouncement = true
    })
  },
  methods: {
    showModal (value) {
      this.modalOpen = value
    },
    closeModal (value) {
      this.modalOpen = value
    },
    onClickCTA () {
      this.$router.push({ path: '/registration', query: { option: 'desa' } })
    },
    onTriggerAnnouncement (value) {
      this.showAnnouncement = value
    }
  }
}
</script>
