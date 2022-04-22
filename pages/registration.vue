<template>
  <div>
    <RegistrationMitra v-if="opsiRegistrasi === 'mitra'" />
    <Questionnaire v-if="opsiRegistrasi === 'desa'" />
    <BaseToast />
  </div>
</template>

<script>
export default {
  layout: 'registration',
  data () {
    return {
      opsiRegistrasi: 'desa'
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
