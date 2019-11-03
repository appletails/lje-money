<template>
  <div class="six_rank">
    <LineItem v-for="(item,i) in fiveRank" :key="i" :rank="i" :item="item" @click.native="showRank(item)">
      <span slot="more" v-if="hasGift(item)">查看奖励</span>
      <span slot="more" v-else>无奖励</span>
    </LineItem>
  </div>
</template>

<script>
import { getFiveRank } from '@/common/api'
import LineItem from "@/components/LineItem";
export default {
  components: {
    LineItem
  },
  computed: {
    fiveRank(){
      return this.$store.state.fiveRank
    },
    hasGift(){
      return function(item){
        let num = 0
        item.gift.forEach(value => {
          num += value.length
        });
        return num?true:false
      }
    }
  },
  methods: {
    showRank(item){
      if(!this.hasGift(item)) return
      this.$store.commit('drawShow',true)
      this.$store.commit('drawBox',{
        gift:item.gift,
        nick_name:item.nick_name,
        allMoney:item.all_money
      })
    }
  },
  created () {
    if(this.fiveRank.length) return
    getFiveRank()
      .then(value => {
        this.$store.commit('fiveRank',value.data)
      })
      .catch(e => {
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
