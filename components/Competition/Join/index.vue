<template>
  <div id="competition-join" class="competition-join">
    <div class="competition-join__main">
      <div class="competition-join__content">
        <div class="competition-join__box-title">
          <h3 class="competition-join__title">
            Bersiap Untuk <span class="competition-join__title--green">Ciptakan Perubahan</span>
          </h3>
          <h3 class="competition-join__title">
            Melalui Sayembara Desa Digital
          </h3>
        </div>
        <div class="competition-join__action">
          <BaseButton label="Bergabung Sekarang" @click="onClickJoin" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickJoin () {
      this.$emit('on-click-join', true)
    }
  }
}
</script>

<style lang="postcss" scoped>
.competition-join {
  @apply relative my-6 px-4 w-full
  sm:(px-8)
  md:(my-10)
  lg:(px-0)
  xl:(my-20);

  &__main {
    background-image: url('~/assets/images/CompetitionJoinDedi.svg');
    background-position-x: 50%;
    background-position-y: 100%;
    @apply bg-blue-170 bg-no-repeat bg-cover max-w-[955px] h-full py-[20px] relative rounded-[30px]
    lg:(bg-contain mx-auto);
  }

  &__content {
    @apply relative px-4 text-center;
  }

  &__box-title {
    @apply mt-[17px] mb-8
    md:(my-12);
  }

  &__title {
    @apply font-serif text-[28px] leading-[44px] font-bold text-blue-gray-700
    md:(text-[36px] leading-[56px]);

    &--green {
      @apply text-green-700;
    }
  }

  &__action {
    @apply md:(pb-12);
  }
}
</style>
