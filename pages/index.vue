<template>
  <div>
    <HeroBanner @clickCTA="showModal" />
    <MapsDedi />
    <TestimonialLists />
    <JoinInfo @clickCTA="showModal" />
    <ContactUs />
    <JoinDedi :show="modalOpen" @closeModal="closeModal" />
  </div>
</template>
<script>
export default {
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
