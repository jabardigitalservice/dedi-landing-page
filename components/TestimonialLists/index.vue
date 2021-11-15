<template>
  <div>
    <Card :testimonials="testimonials" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      testimonials: []
    }
  },
  async fetch () {
    const response = await this.$axios.get('/testimonials')
    this.testimonials = response.data.data
  }
}
</script>

<style>

</style>
