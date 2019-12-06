<template>
    <svg :style="{width:width}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.56 25.46">
        <polygon :fill="color" points="15.56 2.83 12.73 0 0 12.73 2.83 15.56 12.73 25.46 15.56 22.63 5.66 12.73 15.56 2.83"/>
    </svg>
</template>
<script>
export default {
  name: 'IconBack',
  props: {
    color: {
        type: String,
        default: '#303133'
    },
    width: {
        type: [String, Number],
        default: '0.12rem'
    }
  }
}
</script>