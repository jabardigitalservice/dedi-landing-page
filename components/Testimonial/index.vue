<template>
  <div id="testimonial">
    <div class="testimonial wrapper">
      <img
        class="testimonial__image"
        width="356"
        height="497"
        src="~/assets/images/Testimonials.svg"
        alt="Testimonials"
      >
      <div class="testimonial__content">
        <h3 class="testimonial__content-title">
          Testimonial
        </h3>
        <h4 class="testimonial__content-subtitle">
          Kata Mereka Tentang Desa Digital
        </h4>
        <div class="testimonial__content-box-desc">
          <p class="testimonial__content-description">
            Manfaat Desa Digital telah dirasakan oleh berbagai pihak.
          </p>
          <div class="testimonial__content-box-text">
            <p class="testimonial__content-text">
              Testimoni dari
            </p>
            <div class="testimonial__content-box-chips">
              <BaseChipsGroup class="testimonial__content-box-chips-group-chips" mandatory :values="listChips" @onChange="onClickChips" />
            </div>
          </div>
        </div>
        <CardTestimonials v-if="testimonialIsReady" :testimonials="testimonials" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      listChips: [
        {
          label: 'Semua',
          value: 'semua'
        },
        {
          label: 'Masyarakat',
          value: 'masyarakat'
        },
        {
          label: 'Mitra',
          value: 'mitra'
        }
      ],
      testimonials: [],
      testimonialIsReady: false,
      meta: [],
      query: {
        type: null,
        is_active: true
      }
    }
  },
  async fetch () {
    const response = await this.$axios.get('/testimonials', { params: this.query })
    const { data, meta } = response.data
    this.testimonials = data
    this.meta = meta
  },
  '$fetchState.pending' (val) {
    this.testimonialIsReady = false
    if (!val) {
      setTimeout(() => {
        this.testimonialIsReady = true
      }, 1000)
    }
  },
  mounted () {
    setTimeout(() => {
      this.testimonialIsReady = true
    }, 1000)
  },
  methods: {
    onClickChips (value) {
      this.query.type = value === 'semua' ? null : value
      this.$fetch()
    }
  }
}
</script>
<style lang="postcss">
.testimonial {
  background-image: url('~/assets/images/BackgroundTestimonial.svg');
  background-position-x: 150px;
  background-position-y: 80%;

  @screen sm {
    background-position-x: 400px;
  }

  @screen md {
    background-position-x: 550px;
  }

  @screen lg {
    background-position-x: 600px;
  }

  @screen xl {
    background-position-x: 750px;
  }

  @apply py-6 bg-no-repeat 2md:(flex items-start py-10) xl:(h-[660px] max-w-[1280px] py-20);

  &__image {
    @apply hidden 2md:(block);
  }

  &__content {
    @apply flex flex-col text-center overflow-hidden
    2md:(pl-11.5 flex-1 text-left)
    lg:(pl-8);

    &-box-chips {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      @apply block overflow-x-scroll sm:(inline-flex overflow-x-hidden);

      &::-webkit-scrollbar{
        @apply hidden;
      }

      &-group-chips {
        @apply !flex-nowrap;
      }
    }

    &-title {
      @apply font-serif text-[32px] leading-[41px] font-bold text-blue-gray-800
      sm:(text-[37px] leading-[60px]);
    }

    &-subtitle {
      @apply font-serif text-[24px] leading-[31px] font-bold text-blue-gray-700 mt-2
      sm:(mt-0 text-xl leading-[34px]);
    }

    &-box-desc {
      @apply mt-6 mb-8 sm:(mt-7) xl:(mb-10 grid grid-cols-2 items-baseline);
    }

    &-box-text {
      @apply mt-4 lg:(inline-flex items-baseline) xl:(justify-end);
    }

    &-description {
      @apply font-sans text-sm leading-5 font-normal text-blue-gray-700 sm:(leading-[23px]) xl:(w-[367px]);
    }

    &-text {
      @apply mb-3.5 font-sans text-sm leading-[23px] font-normal text-blue-gray-700
      sm:(mt-0 pr-5 inline) lg:(mb-0);
    }
  }
}
</style>
