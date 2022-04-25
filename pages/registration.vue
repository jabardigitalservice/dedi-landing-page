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
      opsiRegistrasi: null
    }
  },
  mounted () {
    if (this.$route.query?.option) {
      this.opsiRegistrasi = this.$route.query.option
    } else {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
