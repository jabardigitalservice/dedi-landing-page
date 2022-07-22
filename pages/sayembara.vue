<template>
  <div>
    <CompetitionBanner />
    <CompetitionAbout />
    <CompetitionVillageCriteria />
    <CompetitionCriteriaMitra @on-click="showModalDetail" />
    <CompetitionFlow @onClickFlowDetail="onClickFlowDetail" />
    <CompetitionJoin @on-click-join="showQuestionnaire" />
    <ContactUs />
    <JoinDedi :show="modalOpen" @closeModal="closeModal" />
    <CompetitionCriteriaMitraDetail :show="modalDetail" @on-close-modal="onCloseModal" />
    <CompetitionFlowDetail :show="showModalCompetitionFlowDetail" @closeModalCompetitionFlowDetail="onClickFlowDetail" />
    <BaseToast />
  </div>
</template>

<script>
export default {
  name: 'Sayembara',
  data () {
    return {
      modalOpen: false,
      modalDetail: false,
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
    onCloseModal (value) {
      this.modalDetail = value
    },
    showModalDetail (value) {
      this.modalDetail = value
    },
    onClickFlowDetail (value) {
      this.showModalCompetitionFlowDetail = value
    },
    showQuestionnaire () {
      /**
       * Trigger to open questionnaire page.
       */
      this.$router.push({ path: '/registration', query: { option: 'desa' } })
    }
  }
}
</script>
