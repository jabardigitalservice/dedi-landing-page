<template>
  <div>
    <RegistrationMitra />
  </div>
</template>

<script>
export default {
  layout: 'registration',
  data () {
    return {
      opsiRegistrasi: null
    }
  },
  mounted () {
    if (this.$store.state.registration) {
      this.opsiRegistrasi = this.$store.state.registration
    }
  }
}
</script>

<style>

</style>
