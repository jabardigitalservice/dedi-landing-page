<template>
  <div id="team" class="team">
    <div class="wrapper">
      <div class="team__upper">
        <div>
          <h1>Inilah Kami,</h1>
          <h1 class="mt-2">
            Tim Pembawa Perubahan
          </h1>
          <p>
            Memberikan akses layanan informasi yang menjangkau hingga pelosok desa merupakan tantangan tersendiri bagi
            Dinas Komunikasi dan Informatika (DISKOMINFO) Jawa Barat. Memiliki Wilayah rural yang luas, yaitu mencapai
            5.312 desa, Diskominfo Jabar harus bisa menjamin agar manfaat teknologi dapat dirasakan oleh masyarakat
            secara merata sehingga kesenjangan digital dapat diatasi.
          </p>
        </div>
        <div>
          <img height="371" width="auto" src="~assets/images/about/Map_Tentang_Dedi.svg" alt="Map Tentang Desa Digital">
        </div>
      </div>
      <div class="team__lower">
        <div>
          <img height="473" width="auto" src="~assets/images/about/Tim_Pengembang_Dedi.png" alt="Tim Pengembang Desa Digital">
        </div>
        <div>
          <p>
            Sebagai sebuah Unit Pelaksana Teknis Pengelola Layanan Digital, Data, dan Informasi Geospatial - Jabar
            Digital Service hadir untuk membantu mewujudkan desa-desa di Jawa Barat yang mandiri secara digital lewat
            implementasi program Desa Digital. Unit dibawah Diskominfo Jawa Barat ini ciptakan inovasi untuk kembangkan
            potensi desa melalui semangat kolaborasi.
          </p>
          <div class="team__lower-cta">
            <BaseButton class="team__lower-cta-btn" variant="secondary" @click="onClickCTA">
              Kunjungi Jabar Digital Service
              <jds-icon name="open-new-tab" size="14px" class="pl-2" />
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentTeam',
  methods: {
    onClickCTA () {
      window.open('https://digitalservice.jabarprov.go.id/', '_blank')
    }
  }
}
</script>

<style lang="postcss">
  .team {
    background-image: url(~/assets/images/about/Background_About_Team.svg);
    background-repeat: no-repeat;
    background-size: auto;
    background-position: 100% 80%;

    @apply w-full h-full py-6
      md: (pt-15 pb-30)
      xl: (py-8);

    h1 {
      @apply text-[28px] font-serif font-bold text-blue-gray-800
      md: (text-[32px])
      lg: (text-[42px]);
    }

    &__upper {
      @apply w-full h-full flex flex-col
      md: (flex-row justify-between items-center gap-12)
      lg: (flex-row justify-between items-center gap-15);

      p {
        @apply w-full h-full pt-6 text-blue-gray-500
        md: (w-[460px])
        lg: (w-[586px])
      }

      img {
        @apply py-6 sm: (py-0);
      }
    }

    &__lower {
      @apply w-full h-full flex flex-col-reverse
      md: (flex-row justify-between items-center gap-12)
      lg: (flex-row justify-between items-center gap-15);

      p {
        @apply w-full h-full pt-6 text-blue-gray-500
        md: (w-[478px])
        lg: (w-[595px])
      }

      &-cta {
        @apply w-full my-6;

        &-btn {
          @apply w-full active:(w-[calc(100%-2px)])
          md:(w-[unset] active:w-[unset]);
        }
      }
    }
  }
</style>
