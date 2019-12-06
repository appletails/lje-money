<template>
  <svg class="loading_icon" :style="{width:width}" :fill="color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.71 9.12">
    <circle cx="4.16" cy="1" r="1" />
    <circle cx="4.16" cy="8.5" r="0.62" />
    <circle cx="1.51" cy="2.1" r="0.3" />
    <circle cx="6.81" cy="7.4" r="0.71" />
    <circle cx="0.41" cy="4.75" r="0.41" />
    <circle cx="7.91" cy="4.75" r="0.8" />
    <circle cx="1.51" cy="7.4" r="0.51" />
    <circle cx="6.81" cy="2.1" r="0.9" />
  </svg>
</template>
<script>
export default {
  name: "IconLoading",
  props: {
    color: {
      type: String,
      default: "#2db7f5"
    },
    width: {
      type: [String, Number],
      default: "0.2rem"
    }
  }
};
</script>
<style lang="less" scoped>
.loading_icon{
  animation: dash 2s linear infinite;
}
@keyframes dash {
  0%{
    transform: rotate(0deg)
  }
  100%{
    transform: rotate(360deg)
  }
}
</style>
