<template>
  <div id="questionnaire" class="questionnaire">
    <div class="questionnaire__title">
      <h1>Kuisioner Desa Digital</h1>
    </div>
    <div
      v-if="showContent"
      class="questionnaire__content"
    >
      <div class="questionnaire__content-text">
        <p class="questionnaire__content-subtitle">
          Desa Anda Masuk Kategori
        </p>
        <p class="questionnaire__content-village-level">
          {{ village }}
        </p>
        <p class="questionnaire__content-info">
          Agar desa Anda mendapatkan manfaat lebih besar. Yuk daftarkan desa Anda ke Desa Digital!
        </p>
      </div>
      <div class="questionnaire__content-image">
        <img
          width="379px"
          height="323px"
          :src="villageImage"
          class="questionnaire__content-image"
          alt="Desa Digital"
        >
      </div>
    </div>
    <div class="questionnaire__action">
      <BaseButton
        class="questionnaire__action-signup"
        label="Daftar Sekarang"
      />
      <nuxt-link
        to="/"
        class="questionnaire__action-cancel"
      >
        Nanti Saja
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    villageTypes: {
      type: Array,
      default: () => []
    },
    chosenLevel: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      village: '',
      villageImage: ''
    }
  },
  computed: {
    showContent () {
      if (Array.isArray(this.villageTypes)) {
        this.showVillage()
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    showVillage () {
      for (const village of this.villageTypes) {
        if (village.level === this.chosenLevel) {
          this.village = village.village
          this.villageImage = village.image
        }
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.questionnaire {
  @apply grid grid-rows-1 p-4
  sm:(p-8 bg-white w-[680px] h-[486px] rounded-2xl);

  &__title > h1 {
    @apply font-roboto font-bold text-[16px] leading-[22px] text-gray-800 pb-4
    sm:(leading-[26px] pb-5);
  }

  &__content {
    @apply border border-green-700 rounded-xl text-center mb-4
    sm:(text-left mb-5 grid grid-cols-2);

    &-text {
      @apply mx-[43.5px] sm:(ml-6 mr-0);
    }

    &-subtitle {
      @apply font-sans font-normal text-[14px] leading-[23px] text-blue-gray-500 pt-4 pb-2;
    }

    &-village-level {
      @apply font-roboto font-bold text-[28px] leading-[45px] text-blue-gray-800 pb-2;
    }

    &-info {
      @apply font-sans font-normal text-[14px] leading-[23px] text-blue-gray-500 pt-2 pb-4;
    }

    &-image {
      @apply rounded-y-xl flex justify-end sm:(rounded-r-xl);
    }
  }

  &__action {
    @apply text-center;

    &-signup {
      @apply w-full mb-4;
    }

    &-cancel {
      @apply font-sans font-bold text-sm text-green-700;
    }
  }
}
</style>
