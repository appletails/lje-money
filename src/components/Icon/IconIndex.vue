<template>
    <svg :style="{width:width}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <rect width="7" height="7" :style="{fill: color}" />
        <rect x="9" width="7" height="7" :style="{fill: color}" />
        <rect y="9" width="7" height="7" :style="{fill: color}" />
        <rect x="9" y="9" width="7" height="7" :style="{fill: color}" />
    </svg>
</template>
<script>
export default {
  name: 'IconIndex',
  props: {
    color: {
        type: String,
        default: '#303133'
    },
    width: {
        type: [String, Number],
        default: '0.13rem'
    }
  }
}
</script>