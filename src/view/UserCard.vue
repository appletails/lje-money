 <template>
  <div class="user_card">
    <div v-for="(card,i) in userCard" :key="i" class="card">
      <div v-for="pic in card" :key="pic" class="one" @click="getCard(pic)">
        <img :src="`http://www.crean.top/img/card/lje/${pic}.jpg`" alt="pic" class="pic">
        <p>{{pic}}</p>
      </div>
      <div class="other"></div>
      <div class="other"></div>
      <div class="other"></div>
    </div>
    <div class="big_card" v-if="show" @click="closeCard()">
      <div class="card_name">
        <img :src="`http://www.crean.top/img/card/lje/${bigCard}.jpg`" alt="pic" class="pic">
        <p>{{bigCard}}</p>
      </div>
    </div>
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
    }),
    userCard(){
      const vid = this.$route.query.vid
      if(!this.sixCard.length) return []
      return this.sixCard.filter( item => item.vid === vid)[0].hasCard
    }
  },
  components: {
    LineItem
  },
  methods: {
    getCard(cardName){
      this.show = true
      this.bigCard = cardName
    },
    closeCard(){
      this.bigCard = ''
      this.show = false
    }
  },
  data(){
    return {
      show: false,
      bigCard: ''
    }
  },
  created () {
    if(this.sixCard.length) return
    getSixCard().then(value=>{
      this.$store.commit('userCard',value.data)
    }).catch(e=>{
      this.$Modal.alert(e.message)
    })
  }
};
</script>

<style lang="less" scoped>
.user_card{
    font-size: .12rem;
    padding: .08rem;
    padding-top: 0;
    .card{
      .flex;
      .one{
        text-align: center;
        margin-top: .08rem;
        padding: .06rem;
        border: 1px solid @border;
        background-color: #fff;
        border-radius: .04rem;
        p{
          margin-top: .05rem;
        }
        .pic{
          border-radius: .04rem;
          width: .7rem;
          display: block;
        }
      }
      .other{
        width: .82rem;
      }
    }
}
.big_card{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
  .card_name{
    position: absolute;
    transform: translateX(-50%) translateY(-50%);
    top: 50%;
    left: 50%;
    border: 1px solid @border;
    background-color: #fff;
    padding: .15rem;
    text-align: center;
    border-radius: .04rem;
    p{
      margin-top: .1rem;
      font-size: .14rem;
    }
    .pic{
      border-radius: .04rem;
      width: 2rem;
    }
  }
}
</style>
