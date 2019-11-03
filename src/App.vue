<template>
  <div id="app" :style="{
    paddingTop: head ? '0.45rem' : 0,
    paddingBottom: foot ? '0.45rem' : 0
  }">
    <Header :title="title" :routeName="routeName" v-if="head" />
    <transition :name="fade">
      <router-view />
    </transition>
    <Footer v-if="head" />
    <Modal />
    <DrawBox />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  data(){
    return {
      fade: 'fadeIn',
      title: '',
      routeName: '',
      head: true,
      foot: true
    }
  },
  watch: {
    $route(to, from) {
      this.title = to.meta.title
      this.head = typeof to.meta.head === 'undefined' ? true : to.meta.head
      this.foot = typeof to.meta.foot === 'undefined' ? true : to.meta.foot
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
