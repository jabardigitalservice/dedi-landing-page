<template>
  <div class="py-6 wrapper">
    <div class="text-center font-serif font-bold text-[32px] leading-[40.96px] text-blue-gray-800">
      Testimonial
    </div>
    <div class="text-center font-serif font-bold text-2xl leading-[30.72px] text-blue-gray-700 mt-2">
      Dari Para Pengguna Desa Digital
    </div>
    <p class="mt-6 text-gray-700 text-sm text-center">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim aenean justo, adipiscing in lacinia mauris mauris vel.
    </p>
    <div class="text-center text-sm leading-[23px] text-gray-700 mt-4">
      Testimoni Dari
    </div>
    <div class="flex gap-6">
      <BaseChips active @click="onClickChips">
        Semua
      </BaseChips>
      <BaseChips value="masyarakat" @click="onClickChips">
        Masyarakat
      </BaseChips>
      <BaseChips value="mitra" @click="onClickChips">
        Mitra
      </BaseChips>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      testimonials: [],
      query: {
        type: null
      }
    }
  },
  async fetch () {
    const response = await this.$axios.get('/testimonials', { params: this.query })
    this.testimonials = response.data
  },
  methods: {
    onClickChips (value) {
      // console.log(value)
      this.query.type = value
      this.$fetch()
    }
  }
}
</script>

<style>

</style>
