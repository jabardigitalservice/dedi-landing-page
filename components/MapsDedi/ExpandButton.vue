<template>
  <svg width="26" height="90" viewBox="0 0 26 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M21.1438 9.0358L0 0V90L21.1438 80.9642C24.0893 79.7054 26 76.811 26 73.6078V16.3922C26 13.189 24.0893 10.2946 21.1438 9.0358Z" :fill="backgroundFill" />
    </g>
    <defs>
      <filter
        id="filter0_b_2754_110350"
        x="-22"
        y="-22"
        width="70"
        height="134"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImage" stdDeviation="11" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_2754_110350" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_2754_110350" result="shape" />
      </filter>
    </defs>
  </svg>
</template>
<script>
export default {
  props: {
    backgroundFill: {
      type: String,
      default: '#069550'
    }
  }
}
</script>
