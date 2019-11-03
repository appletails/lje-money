<template>
  <div class="six_rank">
    <LineItem v-for="(item,i) in sixCard" :key="i" :rank="i" :item="item" @click.native="showCard(item)">
      <span slot="money">{{item.cardNum}}/48</span>
      <span slot="more" v-if="item.cardNum">查卡</span>
      <span slot="more" v-else>无卡</span>
    </LineItem>
  </div>
</template>

<script>
import LineItem from "@/components/LineItem"
import { getSixCard } from '@/common/api'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      sixCard: state => state.userCard
    })
  },
  components: {
    LineItem
  },
  methods: {
    showCard(item){
      if ( !item.cardNum ) return
      this.$router.push({path:'/UserCard',query:{vid:item.vid}})
    }
  },
  created(){
    if(!this.sixCard.length)
    getSixCard().then(value=>{
      this.$store.commit('userCard',value.data)
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
