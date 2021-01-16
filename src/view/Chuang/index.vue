<template>
    <div class="main">
        <LineItem v-for="(item, i) in data" :key="i" :rank="i" :item="item" @click.native="showRank(item)" />
    </div>
</template>
<script>
import { getChuang } from './api'
import LineItem from "./components/LineItem";
export default {
    components: {
        LineItem
    },
    data () {
        return {
            data: []
        }
    },
  methods: {
    showRank(item) {
      this.$store.commit("drawShow", true);
      this.$store.commit("drawBox", {
        seven: item.list,
        nick_name: item.nick_name,
        allMoney: item.all_money,
      });
    },
  },
    created () {
        getChuang().then(res => {
            res = res.data
            if(res.status){
                this.$Modal.alert(res.msg)
            }
            this.data = res.data
        })
    }
}
</script>
<style lang="less" scoped>
.main{
    padding-top: .1rem;
}
</style>