<template>
  <div class="six_rank">
    <LineItem v-for="(item,i) in fiveBirthday" :key="i" :rank="i" :item="item" @click.native="showRank(item)"/>
  </div>
</template>

<script>
import LineItem from "@/components/LineItem"
import { getFiveBirthday } from '@/common/api'
export default {
  computed:{
    fiveBirthday(){
      return this.$store.state.fiveBirthday
    }
  },
  components: {
    LineItem
  },
  methods: {
    showRank(item){
      this.$store.commit('drawShow',true)
      this.$store.commit('drawBox',{
        moneyList:item.money,
        nick_name:item.nick_name,
        allMoney:item.all_money
      })
    }
  },
  created () {
    if(this.fiveBirthday.length) return
    getFiveBirthday()
      .then(value => {
        this.$store.commit('fiveBirthday',value.data)
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
