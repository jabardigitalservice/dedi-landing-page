<template>
  <div id="criteria-mitra" class="criteria-mitra">
    <div class="criteria-mitra__wrapper">
      <!-- Content Upper Section -->
      <div class="criteria-mitra__content">
        <div class="criteria-mitra__content-text">
          <h1 class="criteria-mitra__content-text-title">
            Kriteria Mitra Yang Dapat Mengikuti
          </h1>
          <p class="criteria-mitra__content-text-subtitle">
            Calon mitra yang ingin berkontribusi dalam pengembangan pontensi desa harus memenuhi
            <strong>5 ketentuan</strong> berikut:
          </p>
        </div>
        <div v-for="index in 2" :key="data[index-1].id" class="criteria-mitra__content-provision">
          <img class="criteria-mitra__content-provision-image" :src="data[index-1].image" :alt="data[index-1].textImg">
          <p class="criteria-mitra__content-provision-text">
            {{ data[index-1].text }}
          </p>
        </div>
      </div>
      <!-- Content Lower Section -->
      <div class="criteria-mitra__content">
        <div v-for="index in 3" :key="data[index+1].id" class="criteria-mitra__content-provision">
          <img class="criteria-mitra__content-provision-image" :src="data[index+1].image" :alt="data[index+1].textImg">
          <p class="criteria-mitra__content-provision-text">
            {{ data[index+1].text }}
            <em v-if="data[index+1].id === 5">Local Champion</em>
          </p>
        </div>
      </div>
      <div class="criteria-mitra__action">
        <BaseButton
          class="criteria-mitra__action-detail-btn"
          variant="secondary"
          label="Lihat Detail Kriteria Mitra Sayembara Desa Digital"
          @click="onShowDetailContent"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [{
        id: 1,
        image: require('@/assets/images/criteria/mitra/CriteriaMitraBusiness.svg'),
        textImg: 'Proses Bisnis',
        text: 'Memiliki Proses Bisnis Yang Berkelanjutan'
      },
      {
        id: 2,
        image: require('@/assets/images/criteria/mitra/CriteriaMitraAccess.svg'),
        textImg: 'Akses Dashboard',
        text: 'Menyepakati Pemberian Akses Dashboard dan Data'
      },
      {
        id: 3,
        image: require('@/assets/images/criteria/mitra/CriteriaMitraAdministrative.svg'),
        textImg: 'Prasyarat Administrasi',
        text: 'Memenuhi Prasyarat Administrasi'
      },
      {
        id: 4,
        image: require('@/assets/images/criteria/mitra/CriteriaMitraLocation.svg'),
        textImg: 'Lokasi Kerja',
        text: 'Memiliki Ajuan untuk Penempatan Lokasi Kerja'
      },
      {
        id: 5,
        image: require('@/assets/images/criteria/mitra/CriteriaMitraContact.svg'),
        textImg: 'Kontak',
        text: 'Memiliki Kontak dari'
      }
      ],
      showDetailCriteria: false
    }
  },
  methods: {
    onShowDetailContent () {
      this.$emit('on-click', true)
    }
  }
}

</script>

<style lang="postcss" scoped>
  @import './CriteriaMitra.pcss';
</style>
