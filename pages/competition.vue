<template>
  <div>
    <CompetitionBanner @onClickCTA="showModal" />
    <CompetitionAbout />
    <CompetitionVillageCriteria />
    <CompetitionCriteriaMitra />
    <CompetitionFlow @onClickFlowDetail="onClickFlowDetail" />
    <ContactUs />
    <JoinDedi :show="modalOpen" @closeModal="closeModal" />
    <CompetitionFlowDetail :show="showModalCompetitionFlowDetail" @closeModalCompetitionFlowDetail="onClickFlowDetail" />
    <BaseToast />
  </div>
</template>

<script>
export default {
  name: 'PageCompetition',
  data () {
    return {
      modalOpen: false,
      showModalCompetitionFlowDetail: false
    }
  },
  methods: {
    showModal (value) {
      this.modalOpen = value
    },
    closeModal (value) {
      this.modalOpen = value
    },
    onClickFlowDetail (value) {
      this.showModalCompetitionFlowDetail = value
    }
  }
}
</script>
