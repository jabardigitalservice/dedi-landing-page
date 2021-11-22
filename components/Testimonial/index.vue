<template>
  <div class="wrapper">
    <div class="testimonial">
      <img
        class="testimonial__image"
        width="358"
        height="497"
        src="~/assets/images/Testimonials.svg"
        alt="Testimonials"
      >
      <div class="testimonial__content">
        <h3 class="testimonial__content-title">
          Testimonial
        </h3>
        <h4 class="testimonial__content-subtitle">
          Dari Para Pengguna Desa Digital
        </h4>
        <div class="mt-6 mb-8 sm:(mt-7) xl:(mb-10 grid grid-cols-2 items-end)">
          <p class="testimonial__content-description">
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Enim aenean justo, adipiscing in lacinia mauris mauris vel.
          </p>
          <div class="mt-4 lg:(inline-flex items-baseline) xl:(justify-end)">
            <p class="testimonial__content-text">
              Testimoni dari
            </p>
            <BaseChipsGroup mandatory :values="listChips" @onChange="onClickChips" />
          </div>
        </div>
        <TestimonialLists :testimonials="testimonials" />
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
      meta: [],
      query: {
        type: null
      }
    }
  },
  async fetch () {
    const response = await this.$axios.get('/testimonials', { params: this.query })
    const { ...data } = response.data
    this.testimonials = data.data
    this.meta = data.meta
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

  @apply py-6 bg-no-repeat max-w-[1280px] sm:(grid grid-cols-[max-content,1fr] py-10) xl:(h-[660px] py-20);

  &__image {
    @apply hidden sm:(block);
  }

  &__content {
    @apply flex flex-col text-center
    sm:(pl-11.5 max-w-[30vw] text-left)
    md:(max-w-[39vw])
    lg:(pl-8 max-w-[55vw])
    xl:(pl-4 max-w-[890px]);

    &-title {
      @apply font-serif text-[32px] leading-[41px] font-bold text-blue-gray-800
      sm:(text-[37px] leading-[60px]);
    }

    &-subtitle {
      @apply font-serif text-[24px] leading-[31px] font-bold text-blue-gray-700 mt-2
      sm:(mt-0 text-xl leading-[34px]);
    }

    &-description {
      @apply font-sans text-sm leading-5 font-normal text-gray-700 sm:(leading-[23px]) xl:(w-[367px]);
    }

    &-text {
      @apply mb-3.5 font-sans text-sm leading-[23px] font-normal text-gray-700
      sm:(mt-0 pr-5 inline) lg:(mb-0);
    }
  }
}
</style>
