<template>
  <div id="criteria-mitra" class="wrapper criteria-mitra">
    <div class="criteria-mitra__wrapper">
      <div class="criteria-mitra__content">
        <div class="criteria-mitra__content-text">
          <h1 class="criteria-mitra__content-text-title">
            Kriteria Mitra Yang Dapat Mengikuti
          </h1>
          <p class="criteria-mitra__content-text-subtitle">
            Calon mitra yang ingin berkontribusi dalam pengembangan pontensi desa harus memenuhi
            <span class="criteria-mitra__content-text-subtitle--bold">5 ketentuan berikut:</span>
          </p>
        </div>
        <div
          v-for="item in CriteriaMitraContents"
          :key="item.id"
          class="criteria-mitra__content-provision"
        >
          <img class="criteria-mitra__content-provision-image" :src="item.image" :alt="item.textImg">
          <p v-if="item.id < 5" class="criteria-mitra__content-provision-text">
            {{ item.text }}
          </p>
          <p v-if="item.id === 5" class="criteria-mitra__content-provision-text">
            {{ item.text }} <span class="criteria-mitra__content-provision-text--italic">Local Champion</span>
          </p>
        </div>
      </div>
      <div class="criteria-mitra__action">
        <BaseButton class="criteria-mitra__action-detail-btn" variant="secondary" label="Lihat Detail Kriteria Mitra Syembara Desa Digital" @click="onShowDetailContent" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      CriteriaMitraContents: [
        {
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
      // @todo: to show info detail content
    }
  }
}
</script>

<style lang="postcss" scoped>
@import './CriteriaMitra.pcss';
</style>
