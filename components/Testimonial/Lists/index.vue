<template>
  <div>
    <Card :testimonials="testimonials" />
  </div>
</template>

<script>
export default {
  props: {
    testimonials: {
      type: Array,
      default: () => []
    }
  }
}
</script>
