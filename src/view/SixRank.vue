<template>
  <div class="six_rank">
    <LineItem v-for="(item,i) in sixRank" :key="i" :rank="i" :item="item" @click.native="showRank(item)" />
  </div>
</template>

<script>
import LineItem from "@/components/LineItem"
import { getSixRank } from '@/common/api'
export default {
  computed:{
    sixRank(){
      return this.$store.state.sixRank
    }
  },
  components: {
    LineItem
  },
  methods:{
    showRank(item){
      this.$store.commit('drawShow',true)
      this.$store.commit('drawBox',{
        data:item.list,
        nick_name:item.nick_name,
        allMoney:item.all_money
      })
    }
  },
  created(){
    if(this.sixRank.length) return
    getSixRank().then(value=>{
      this.$store.commit('sixRank',value.data)
    }).catch(e=>{
      this.$Modal.alert(e.message)
    })
  }
};
</script>

<style lang="less" scoped>
.six_rank{
    padding-top: .1rem;
}
</style>
