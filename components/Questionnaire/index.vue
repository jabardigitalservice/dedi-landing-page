<template>
  <div id="registration" class="registration-questionnaire">
    <div class="registration--position">
      <img class="registration__image" src="~/assets/images/FooterBanner.svg" alt="footer banner">
      <div class="registration__questionnaire">
        <div v-if="!isConfirmed">
          <QuestionnaireConfirmation @onSubmit="confirmVillage" />
        </div>
        <div v-if="!showModalLevelDesa && isConfirmed">
          <QuestionnaireOne v-show="showLevelOne" @onClickLevel="validationQuestionnaireOne" @onSubmit="onNextLevelOne" />
          <QuestionnaireTwo v-show="showLevelTwo" @onClickLevel="validationQuestionnaireTwo" @onPrev="onPrev" @onSubmit="onNextLevelTwo" />
          <QuestionnaireThree v-show="showLevelThree" @onClickLevel="validationQuestionnaireThree" @onPrev="onPrevQuestionnaireThree" @onSubmit="onNextLevelThree" />
        </div>
        <div v-if="showModalLevelDesa && isConfirmed">
          <QuestionnaireCategory v-show="showCategory" :chosen-level="params.level" :village-types="villages" @onSubmit="onSubmit" />
          <QuestionnaireNotification v-show="showNotification" :level="params.level" :potency-villages="params.properties.potensi_desa.data" />
        </div>
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
        id: null,
        level: 1,
        properties: {
          pemohon: {
            nama: null,
            posisi: null,
            file: {
              path: null,
              original_name: null,
              source: null
            },
            nomor_telepon: null,
            email: null
          },
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
              data: null,
              photo: {
                path: null,
                original_name: null,
                source: null
              }
            },
            jaringan_telepon: {
              data: null,
              photo: {
                path: null,
                original_name: null,
                source: null
              },
              operator: null
            },
            jaringan_internet: {
              data: null,
              photo: {
                path: null,
                original_name: null,
                source: null
              },
              website: null
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
              data: null,
              photo: {
                path: null,
                original_name: null,
                source: null
              },
              pelatihan: null
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
              data: null,
              photo: {
                path: null,
                original_name: null,
                source: null
              },
              bumdes: null
            },
            komoditas: {
              data: null,
              photo: {
                path: null,
                original_name: null,
                source: null
              },
              produktivitas: null
            },
            ecommerce: {
              data: [],
              ecommerce_lainnya: null,
              distribusi: null
            },
            logistik: null
          },
          potensi_desa: {
            data: [],
            potensi_dapat_dikembangkan: null,
            photo: {
              path: null,
              original_name: null,
              source: null
            }
          }
        }
      },
      isConfirmed: false,
      isLevelOne: true,
      isLevelTwo: false,
      isLevelThree: false,
      isLevelFour: false,
      showLevelOne: true,
      showLevelTwo: false,
      showLevelThree: false,
      showModalLevelDesa: false,
      showNotification: false,
      showCategory: true,
      villages
    }
  },
  methods: {
    confirmVillage (params, villageId) {
      this.isConfirmed = true
      this.params.properties.pemohon = params
      this.params.id = villageId
    },
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
        this.showModalLevelDesa = false
      } else {
        this.params.level = 1
        this.showModalLevelDesa = true
      }
    },
    onNextLevelTwo (value) {
      this.params.properties.literasi_digital = value
      if (this.isLevelThree) {
        this.showLevelThree = true
        this.showLevelTwo = false
        this.params.level = 3
        this.showModalLevelDesa = false
      } else {
        this.params.level = 2
        this.showModalLevelDesa = true
      }
    },
    onNextLevelThree (properties) {
      this.params.properties.tentang_bumdes = properties.tentang_bumdes
      this.params.properties.potensi_desa = properties.potensi_desa
      if (this.isLevelFour) {
        this.showLevelThree = false
        this.params.level = 4
        this.showModalLevelDesa = true
      } else {
        this.params.level = 3
        this.showModalLevelDesa = true
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
        this.showCategory = false
        this.showNotification = true
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
