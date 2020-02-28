<template>
  <div id="app" :style="{
    paddingTop: head ? '0.45rem' : 0
  }">
    <Header :title="title" :routeName="routeName" v-if="head" />
    <transition :name="fade">
      <router-view />
    </transition>
    <Modal />
    <DrawBox />
  </div>
</template>

<script>
import Header from "./components/Header"
export default {
  name: "App",
  components: {
    Header
  },
  data(){
    return {
      fade: 'fadeIn',
      title: '',
      routeName: '',
      head: false
    }
  },
  watch: {
    $route(to, from) {
      this.title = to.meta.title
      this.head = typeof to.meta.head === 'undefined' ? true : to.meta.head
      this.routeName = to.name
      this.fade = to.meta.index < from.meta.index ? "fadeOut" : "fadeIn"
    }
  },
  beforeUpdate() {
    this.$Modal.remove();
    this.$store.commit('drawShow',false)
  }
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html {
  min-height: 100vh;
  min-width: 100vw;
  background-color: @bgColor;
  color: @font;
}
a {
  color: @font;
  text-decoration: none;
}
</style>
