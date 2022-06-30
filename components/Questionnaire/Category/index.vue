<template>
  <div id="category" class="category">
    <div class="category__title">
      <h1>Kuisioner Desa Digital</h1>
    </div>
    <div
      v-if="showContent"
      class="category__content"
    >
      <div class="category__content-text">
        <p class="category__content-subtitle">
          Desa Anda Masuk Kategori
        </p>
        <p class="category__content-village-level">
          {{ village }}
        </p>
        <p class="category__content-info">
          Agar desa Anda mendapatkan manfaat lebih besar. Yuk daftarkan desa Anda ke Desa Digital!
        </p>
      </div>
      <div class="category__content-image">
        <img
          width="379px"
          height="323px"
          :src="villageImage"
          class="category__content-image"
          alt="Desa Digital"
        >
      </div>
    </div>
    <div class="category__action">
      <div class="category__action-signup">
        <BaseButton
          class="category__action-signup--size"
          label="Daftar Sekarang"
          @click="onSubmitCategory"
        />
        <BaseButton
          class="category__action-signup--size"
          variant="secondary"
          label="Kembali"
          @click="onPrevious"
        />
      </div>
      <div class="category__action-cancel">
        <nuxt-link
          to="/"
        >
          Nanti Saja
        </nuxt-link>
      </div>
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
    },
    onSubmitCategory () {
      this.$emit('onSubmit')
    },
    onPrevious () {
      this.$emit('on-previous-questionnaire')
    }
  }
}
</script>

<style lang="postcss" scoped>
.category {
  @apply grid grid-rows-1 p-4
  md:(p-8 mt-6 bg-white w-[680px] h-[476px] rounded-2xl);

  &__title > h1 {
    @apply font-roboto font-bold text-[16px] leading-[22px] text-gray-800 pb-4
    md:(leading-[26px] pb-5);
  }

  &__content {
    @apply border border-green-700 rounded-xl text-center mb-4
    md:(text-left mb-5 grid grid-cols-2);

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
      @apply mb-4 flex flex-col items-center gap-4 sm:(items-stretch flex-row-reverse justify-center);

      &--size {
        @apply w-[290px] py-3.5 px-4 !important
        sm:(py-2.5 !important);
      }
    }

    &-cancel {
      @apply font-sans font-bold text-sm text-green-700;
    }
  }
}
</style>
