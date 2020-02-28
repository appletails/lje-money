<template>
  <div class="year">
    <div class="title">
      <div class="header">一个简单的口袋消息年度报告</div>
      <div class="msgs">经过一年的努力营业，<span class="pink">{{name}}</span>一共在口袋发出了<span class="blue">{{allMsgNum}}</span>条消息</div>
    </div>
    <div class="cont">
      <div class="info"><span class="red">！</span>1-4月口袋数据部分缺失</div>
      <div class="info"><span class="red">！</span>不包括数据缺失和消息被删除的部分</div>
      <div class="info"><span class="red">！</span>不包括数据缺失和消息被删除的部分</div>
      <div class="info"><span class="red">！</span>不包括数据缺失和消息被删除的部分</div>
    </div>
    <e-line
      class="line"
      color="#46b3e6"
      title="成员每月发言总次数"
      :data="year"/>
    <div class="cont">
      <span class="zi">{{bastDay[0].date.m}}月{{bastDay[0].date.d}}日</span>是今年最早营业的一天，<span class="zi">{{bastDay[0].date.h}}点{{bastDay[0].date.min}}分</span>就开始营业了；
      <span class="zi2">{{bastDay[1].date.m}}月{{bastDay[1].date.d}}日</span>这天很努力，直到<span class="zi2">{{bastDay[1].date.h}}点{{bastDay[1].date.min}}分</span>还在坚持营业
    </div>
    <e-pie
      title="各类消息占比(总量 | 比例)"
      class="msg"
      :data="yearData" />
    <div class="cont">
      这一年中平均每个月有<span class="blue">{{mouthSort.average}}</span>人来你的房间留言，<span class="zi">{{mouthSort.max.name}}</span>达到最大值，有<span class="blue">{{mouthSort.max.value}}</span>来留言，
      最少的时候也有<span class="blue">{{mouthSort.min.value}}</span>人来访
    </div>
    <e-line
      class="line"
      color="#64ccda"
      title="口袋房间每月访客量"
      :data="monthIdList"/>
    <div class="cont">
      这一年共有<span class="blue">{{otherIdol.length}}</span>位成员来你的房间留言了<span class="org">{{allOtherIdolNum}}</span>次
    </div>
    <e-bar
      class="idol_com"
      color="#fa877f"
      type="all"
      title="成员留言排行"
      :style="{height: (otherIdol.length + 1) * 0.36 + 'rem'}"
      :data="otherIdol"/>
    <div class="cont">
      这一年共有<span class="blue">{{jujuSay.length}}</span>位聚聚来你的房间留言了<span class="org">{{allJujuSayNum}}</span>次，其中<span class="blue">{{replay.length}}</span>名聚聚共被翻牌了<span class="org">{{allReplayNum}}</span>次
    </div>
    <div class="juju">
      <e-bar
        class="bar"
        title="年度粉丝被翻牌榜Top20"
        color="#ff6f5e"
        :data="replays"/>
      <e-bar
        class="bar"
        title="年度粉丝留言榜Top20"
        color="#ff9d76"
        :data="jujuSays"/>
    </div>
    <div v-if="flipCardList.length">
      <div class="cont">
        这一年共有<span class="blue">{{flipCardList.length}}</span>位聚聚发出了鸡腿翻牌
      </div>
      
      <!-- <div class="flip_card"> -->
        
      <e-bar
        class="idol_com"
        color="#fa877f"
        type="all"
        title="鸡腿翻牌排行Top30"
        :style="{height: 31 * 0.36 + 'rem'}"
        :data="flipCardList.slice(0,30)"/>
    </div>
  </div>
</template>
<script>
import Line from "./components/Line";
import Bar from "./components/Bar";
import Pie from "./components/Pie";
import {
  getYearMsgData,
  getReplyList,
  getYearData,
  getOtherIdolList,
  getJujuSay,
  getMonthIdList,
  getBastDay,
  getIdol,
  postPass,
  getFlipCard
} from './api'
export default {
  components: {
    'e-line': Line,
    'e-bar': Bar,
    'e-pie': Pie
  },
  data () {
    return {
      year: [],
      replay: [],
      yearData: [],
      otherIdol: [],
      jujuSay: [],
      monthIdList: [],
      flipCardList: [],
      bastDay: [{date:{}},{date:{}}],
      name: ''
    }
  },
  computed: {
    jujuSays () { 
      return this.jujuSay.slice(0,20)
    },
    replays () {
      return this.replay.slice(0,20)
    },
    allMsgNum () {
      return this.year.reduce((total, item) => total + item.value, 0)
    },
    allReplayNum () {
      return this.replay.reduce((total, item) => total + item.value, 0)
    },
    allJujuSayNum () {
      return this.jujuSay.reduce((total, item) => total + item.value, 0)
    },
    allOtherIdolNum () {
      return this.otherIdol.reduce((total, item) => total + item.value, 0)
    },
    mouthSort () {
      const data = JSON.parse(JSON.stringify(this.monthIdList)).sort((a,b) => b.value - a.value).filter(item => item.value > 0)
      const sum = this.monthIdList.reduce((total, item) => total + item.value, 0)
      return {
        max: data[0] || {name: '', value: 0},
        min: data[data.length - 1] || {name: '', value: 0},
        average: parseInt(sum / this.monthIdList.filter(item => item.value > 0).length) || 0
      }
    }
  },
  created() {
    const name = this.$route.query.name
    this.name = name
    getYearMsgData(name).then(response => {
      this.year = response.data
    })
    getReplyList(name).then(response => {
      this.replay = response.data
    })
    getYearData(name).then(response => {
      this.yearData = response.data
    })
    getOtherIdolList(name).then(response => {
      this.otherIdol = response.data
    })
    getJujuSay(name).then(response => {
      this.jujuSay = response.data
    })
    getMonthIdList(name).then(response => {
      this.monthIdList = response.data
    })
    getBastDay(name).then(response => {
      this.bastDay = response.data
    })
    getFlipCard(name).then(response => {
      this.flipCardList = response.data.filter(item => item.name !== '匿名用户')
    })
  },
  beforeRouteEnter(to, from, next){ // 当前页路由守卫，没有name值不允许进入
    if(!to.query.hasOwnProperty('name')){
      next('/404')
    }else{
      let pass = localStorage.getItem('pass') || to.query.pass
      localStorage.setItem('pass',pass)
      const name = to.query.name
      getIdol({name, pass}).then(response => {
        if(response.data){
          next()
        }else{ // 未查询到不允许进入
          next('/404')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
span{
  font-size: .14rem;
  font-weight: bold;
  &.pink { color: #eb4d55 }
  &.blue { color: #46b3e6 }
  &.zi { color: #b21f66 }
  &.zi2 { color: #fe346e }
  &.red{ color: #da2d2d;}
  &.org{ color: #ff6f5e;}
}
.year{
  min-height: 100vh;
  padding: .1rem 0;
  background-image: url(../../assets/img/year_bg.jpg);
  .title{
    margin: 0 .1rem .1rem;
    padding: .1rem .2rem;
    background-color: #fff;
    border-radius: .08rem;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    font-size: .12rem;
    .header{
      font-size: .16rem;
      font-weight: bold;
      margin-bottom: .06rem;
      color: #eb4d55;
    }
    .info{
      color: #ccc;
      line-height: .18rem;
    }
    .msgs{
      margin-top: .06rem;
    }
  }
  .line{
    width: auto;
    height: 2rem;
    margin: .1rem .1rem 0;
  }
  .cont {
    width: auto;
    font-size: .12rem;
    margin: .1rem .1rem 0;
    // background-color: #f9f6f7;
    padding: .1rem .2rem;
    border-radius: .04rem;
    color: #555;
  }
  .juju {
    height: 7.5rem;
    margin: .1rem .1rem 0;
    display: flex;
    justify-content: space-between;
    .bar{
      width: calc(50% - .05rem);
      height: 7.5rem;
      // margin: auto .1rem;
    }
  }
  .flip_card {
    margin: .1rem .1rem 0;
    display: flex;
    justify-content: space-between;
    .bar{
      width: calc(50% - .05rem);
    }
  }
  .msg{
    width: auto;
    height: 2.5rem;
    margin: .1rem .1rem 0;
  }
  .idol_com{
    margin: .1rem .1rem 0;
  }
}
</style>
