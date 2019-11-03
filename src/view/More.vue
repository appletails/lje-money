<template>
  <div class="more">
    <div class="main">
      <router-link
        tag="div"
        v-for="(item,i) in routerConfig"
        :key="i"
        :class="['box',item.meta.color]"
        :to="item.path"
      >{{item.meta.title}}</router-link>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title";
import routerConfig from "@/router/router.config";
export default {
  components: {
    Title
  },
  data() {
    return {
      routerConfig
    };
  }
};
</script>

<style lang="less" scoped>
.more {
  .flex(@justify:space-around;);
  min-height: calc(100vh - 0.9rem);
  .main {
    padding: 0.4rem;
    .flex(@justify:center;);
    .box {
      width: 1rem;
      height: 1.2rem;
      border-radius: 4px;
      border-bottom-right-radius: 0.3rem;
      background-color: @color1;
      font-size: 0.14rem;
      padding: 0.2rem;
      margin: 0.1rem;
      color: #fff;
      &.color2 {
        background-color: @color2;
      }
      &.color3 {
        background-color: @color3;
      }
    }
  }
}
</style>
