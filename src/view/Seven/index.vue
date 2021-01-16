<template>
  <div>
    <input type="text" placeholder="请输入昵称" @change="change()" v-model="value" class="input"/>
    <LineItem v-for="(item, i) in show" :key="i" :rank="i" :item="item" @click.native="showRank(item)" />
  </div>
</template>
<script>
import { getSeven } from "./api";
import LineItem from "./components/LineItem";
export default {
  components: {
    LineItem,
  },
  data() {
    return {
        value: '',
        data: [],
        show: []
    };
  },
  methods: {
    showRank (item) {
      this.$store.commit("drawShow", true);
      this.$store.commit("drawBox", {
        seven: item.project,
        nick_name: item.nickName,
        allMoney: item.allAmount,
      });
    },
    change () {
      this.show = this.data.filter(item => item.nickName.indexOf(this.value) != -1)
    }
  },
  created() {
    getSeven().then((res) => {
      res = res.data;
      if (res.status) {
        this.$Modal.alert(res.msg);
      }
      this.data = res.data;
      this.show = res.data;
    });
  },
};
</script>
<style lang="less" scoped>
.input{
  width: 3.6rem;
  display: block;
  padding: .1rem;
  border-radius: .04rem;
  margin: .1rem auto;
  border: none;
  &:focus{
    outline: none;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>