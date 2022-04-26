<template>
  <div id="registration" class="registration-questionnaire">
    <div class="registration--position">
      <img class="registration__image" src="~/assets/images/FooterBanner.svg" alt="footer banner">
      <div class="registration__questionnaire">
        <div v-if="!showModalLevelDesa">
          <QuestionnaireOne v-show="showLevelOne" @onClickLevel="validationQuestionnaireOne" @onSubmit="onNextLevelOne" />
          <QuestionnaireTwo v-show="showLevelTwo" @onClickLevel="validationQuestionnaireTwo" @onPrev="onPrev" @onSubmit="onNextLevelTwo" />
          <QuestionnaireThree v-show="showLevelThree" @onClickLevel="validationQuestionnaireThree" @onPrev="onPrevQuestionnaireThree" @onSubmit="onNextLevelThree" />
        </div>
        <ModalQuestionnaire v-else :chosen-level="params.level" :village-types="villages" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  villages
} from '@/constants/questionnaire.js'
export default {
  data () {
    return {
      params: {
        id: '32.09.21.2001', // @todo: remove this in next feature (id desa search)
        level: 1,
        properties: {
          fasilitas_desa: {
            akses_kendaraan: {
              data: [],
              photo: {
                path: null,
                original_name: null,
                source: null
              }
            },
            suplai_listrik: {
              data: '',
              photo: {
                path: null,
                original_name: null,
                source: null
              }
            },
            jaringan_telepon: {
              data: '',
              photo: {
                path: null,
                original_name: null,
                source: null
              },
              operator: ''
            },
            jaringan_internet: {
              data: '',
              photo: {
                path: null,
                original_name: null,
                source: null
              },
              website: ''
            }
          },
          literasi_digital: {
            komunitas: {
              data: [],
              photo: {
                path: null,
                original_name: null,
                source: null
              }
            },
            pelatihan: {
              data: '',
              photo: {
                path: null,
                original_name: null,
                source: null
              },
              pelatihan: ''
            }
          },
          tentang_bumdes: {
            sosial_media: {
              data: [],
              photo: {
                path: null,
                original_name: null,
                source: null
              }
            },
            bumdes: {
              data: '',
              photo: {
                path: null,
                original_name: null,
                source: null
              },
              bumdes: ''
            },
            komoditas: {
              data: '',
              photo: {
                path: null,
                original_name: null,
                source: null
              }
            }
          },
          potensi_desa: {
            data: '',
            potensi_dapat_dikembangkan: '',
            photo: {
              path: null,
              original_name: null,
              source: null
            }
          }
        }
      },
      isLevelOne: true,
      isLevelTwo: false,
      isLevelThree: false,
      isLevelFour: false,
      showLevelOne: true,
      showLevelTwo: false,
      showLevelThree: false,
      showModalLevelDesa: false,
      villages
    }
  },
  methods: {
    validationQuestionnaireOne (value) {
      this.isLevelTwo = value
    },
    validationQuestionnaireTwo (value) {
      this.isLevelThree = value
    },
    validationQuestionnaireThree (value) {
      this.isLevelFour = value
    },
    onNextLevelOne (value) {
      this.params.properties.fasilitas_desa = value
      if (this.isLevelTwo) {
        this.showLevelTwo = true
        this.showLevelOne = false
        this.params.level = 2
      } else {
        this.params.level = 1
        this.onSubmit()
      }
    },
    onNextLevelTwo (value) {
      this.params.properties.literasi_digital = value
      if (this.isLevelThree) {
        this.showLevelThree = true
        this.showLevelTwo = false
        this.params.level = 3
      } else {
        this.params.level = 2
        this.onSubmit()
      }
    },
    onNextLevelThree (properties) {
      this.params.properties.tentang_bumdes = properties.tentang_bumdes
      this.params.properties.potensi_desa = properties.potensi_desa
      if (this.isLevelFour) {
        this.showLevelThree = false
        this.params.level = 4
        this.onSubmit()
      } else {
        this.params.level = 3
        this.onSubmit()
      }
    },
    onPrev () {
      if (this.isLevelTwo) {
        this.showLevelTwo = false
        this.showLevelOne = true
      }
    },
    onPrevQuestionnaireThree () {
      if (this.isLevelThree) {
        this.showLevelThree = false
        this.showLevelTwo = true
      }
    },
    async onSubmit () {
      try {
        await this.$axios.post('/villages/questionnaire', this.params)
        this.showModalLevelDesa = true
      } catch (error) {
        this.$store.dispatch('toast/showToast', {
          type: 'error',
          message: 'Data gagal disimpan, periksa kembali data yang diinputkan'
        })
      }
    }
  }
}
</script>

<style lang="postcss">
@import './Questionnaire.pcss';
</style>
