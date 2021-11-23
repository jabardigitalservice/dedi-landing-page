<template>
  <div class="container">
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
