 <template>
  <div class="user_card">
    <div v-for="(card, level) in userCard" :key="level" class="card">
      <div class="level">
        <span>{{ level }}（{{ card.length }}/{{ levelNum[level] }}）</span>
      </div>
      <div v-for="pic in card" :key="pic" class="one" @click="getCard(level, pic)">
        <img :src="`http://www.crean.top/img/card/helloween/${level}/${pic}.jpg`" alt="pic" class="pic">
        <p>{{ pic }}</p>
      </div>
      <div class="other"></div>
      <div class="other"></div>
      <div class="other"></div>
    </div>
    <div class="big_card" v-if="show" @click="closeCard()">
      <div class="card_name">
        <img :src="`http://www.crean.top/img/card/helloween/${bigLevel}/${bigCard}.jpg`" alt="pic" class="pic">
        <p>{{bigCard}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import LineItem from "@/components/LineItem"
import { getSixCard } from '@/common/api'
export default {
  computed: {
    helloweenData(){
      return this.$store.state.hellow.helloweenData
    },
    userCard(){
      const i = this.$route.query.index
      if(!this.helloweenData.length) return []
      return this.helloweenData[i].cards
    }
  },
  components: {
    LineItem
  },
  methods: {
    getCard(level, cardName){
      this.show = true
      this.bigLevel = level
      this.bigCard = cardName
    },
    closeCard(){
      this.bigCard = ''
      this.bigLevel = ''
      this.show = false
    }
  },
  data(){
    return {
      show: false,
      bigLevel: '',
      bigCard: '',
      levelNum: {
        N: 13,
        R: 13,
        SR: 13,
        SSR: 13,
        UR: 2
      }
    }
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
      .level{
        width: 100%;
        line-height: 2;
        text-align: center;
        span{
          margin: .08rem auto;
          border: 1px solid @border;
          display: block;
          width: 1.2rem;
          border-radius: .04rem;
          background-color: #fff;
          font-size: .14rem;
        }
      }
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
