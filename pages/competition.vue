<template>
  <div>
    <CompetitionBanner @onClickCTA="showModal" />
    <CompetitionAbout />
    <CompetitionVillageCriteria />
    <CompetitionCriteriaMitra @onClick="showModalDetail" />
    <ContactUs />
    <JoinDedi :show="modalOpen" @closeModal="closeModal" />
    <CriteriaMitra :show="modalDetail" @onCloseModal="onCloseModal" />
  </div>
</template>

<script>
export default {
  name: 'PageCompetition',
  data () {
    return {
      modalOpen: false,
      modalDetail: false
    }
  },
  methods: {
    showModal (value) {
      this.modalOpen = value
    },
    closeModal (value) {
      this.modalOpen = value
    },
    onCloseModal (value) {
      this.modalDetail = value
    },
    showModalDetail (value) {
      this.modalDetail = value
    }
  }
}
</script>
