<template>
  <div class="year">
    <div class="section1">
      <div class="header">一个简单的口袋年度报告</div>
      <div class="cont">
        <div class="info">① 1-4月口袋数据部分缺失</div>
        <div class="info">② 不包括数据缺失和消息被删除的部分</div>
        <div class="info">③ 不包括数据缺失和消息被删除的部分</div>
        <div class="info">④ 不包括数据缺失和消息被删除的部分</div>
      </div>
      <div class="msgs">经过一年的努力营业<br><span class="pink">{{name}}</span>一共在口袋发出了<span class="blue">{{allMsgNum}}</span>条消息</div>
    </div>
    <div class="section2">
      <div class="cont">
        <p>
          <span class="zi">{{bastDay[0].date.m}}月{{bastDay[0].date.d}}日</span>是今年最早营业的一天，<span class="zi">{{bastDay[0].date.h}}点{{bastDay[0].date.min}}分</span>就开始营业了<br>
        </p>
        <p>
          <span class="zi2">{{bastDay[1].date.m}}月{{bastDay[1].date.d}}日</span>这天很努力，直到<span class="zi2">{{bastDay[1].date.h}}点{{bastDay[1].date.min}}分</span>还在坚持营业
        </p>
      </div>
      <e-line
        class="line"
        color="#ff9d76"
        fontColor="#fff"
        title="成员每月发言总次数"
        :data="year"/>
      <e-pie
        title="各类消息占比(总量 | 比例)"
        class="msg"
        fontColor="#fff"
        :data="yearData" />
    </div>
    <div class="section3">
      <div class="cont">
        这一年中平均每个月有<span class="red">{{mouthSort.average}}</span>人来你的房间留言<br>
        <span class="red">{{mouthSort.max.name}}</span>达到最大值，有<span class="red">{{mouthSort.max.value}}</span>来留言
        <br>最少的时候也有<span class="red">{{mouthSort.min.value}}</span>人来访
      </div>
      <e-line
        class="line"
        color="#ff7979"
        fontColor="#fff"
        title="口袋房间每月访客量"
        :data="monthIdList"/>
    </div>
    <div class="section4">
      <div class="cont">
        这一年共有<span class="blue">{{otherIdol.length}}</span>位成员<br>来你的房间留言了<span class="org">{{allOtherIdolNum}}</span>次
      </div>
      
      <div class="juju">
        <e-bar
          class="bar"
          color="#fa877f"
          type="all"
          title="成员留言排行"
          fontColor="#fff"
          :max="otherIdol[0]"
          :style="{height: otherIdol.length/2 * 0.43 + 'rem'}"
          :data="otherIdol.slice(0,parseInt(otherIdol.length/2))"/>
        <e-bar
          class="bar"
          color="#fa877f"
          type="all"
          :max="otherIdol[0]"
          :start="parseInt(otherIdol.length/2)"
          :style="{height: otherIdol.length/2 * 0.43 + 'rem'}"
          :data="otherIdol.slice(parseInt(otherIdol.length/2))"/>
      </div>
    </div>
    <div class="section5">
      <div class="cont">
        这一年共有<span class="blue">{{jujuSay.length}}</span>位聚聚<br>
        来你的房间留言了<span class="org">{{allJujuSayNum}}</span>次<br>
        其中<span class="blue">{{replay.length}}</span>名聚聚共被翻牌了<span class="org">{{allReplayNum}}</span>次
      </div>
      <div class="juju">
        <e-bar
          class="bar"
          title="年度粉丝被翻牌榜Top20"
          color="#ff6f5e"
          fontColor="#fff"
          :data="replays"/>
        <e-bar
          class="bar"
          title="年度粉丝留言榜Top20"
          fontColor="#fff"
          color="#ff9d76"
          :data="jujuSays"/>
      </div>
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
  postPass
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
  &.pink { color: #fc747a }
  &.blue { color: #80d7ff }
  &.zi { color: #fff09d }
  &.zi2 { color: #adffa2 }
  &.red{ color: #ff7979;}
  &.org{ color: #ffa78c;}
}
.year{
  font-size: .12rem;
  text-shadow: 0 1px 2px rgba(0,0,0,.6);
  color: #fff;
  &>div{
    min-height: 6.67rem;
    background-size: cover;
    background-position: center center;
    position: relative;
    overflow: hidden;
  }
  .section1{
    background-image: url(../../assets/img/section2.jpg);
    .header{
      text-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
      font-size: .24rem;
      font-weight: bold;
      text-align: center;
      position: absolute;
      top: .6rem;
      width: 100%;
    }
    .cont {
      font-size: .14rem;
      position: absolute;
      top: 1.4rem;
      left: .4rem;
      .info{
        color: rgba(255,255,255,.8);
        text-shadow: none;
      }
    }
    .msgs{
      font-size: .18rem;
      position: absolute;
      bottom: .6rem;
      left: .2rem;
      span{
        font-size: .24rem;
        font-weight: bold;
      }
    }
  }
  .section2{
    background-image: url(../../assets/img/section3.jpg);
    .cont {
      font-size: .16rem;
      position: absolute;
      top: .2rem;
      left: 50%;
      width: 94%;
      transform: translateX(-50%);
      p{
        margin-bottom: .1rem;
        span{
          font-size: .2rem;
          font-weight: bold;
        }
      }
    }
    .msg{
      width: 3.55rem;
      height: 2.5rem;
      position: absolute;
      bottom: 2.4rem;
      left: 50%;
      transform: translateX(-50%);
    }
    .line{
      width: 3.55rem;
      height: 2rem;
      position: absolute;
      bottom: .3rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .section3{
    background-image: url(../../assets/img/section5.png);
    .cont{
      font-size: .16rem;
      position: absolute;
      top: .4rem;
      left: 50%;
      width: 94%;
      transform: translateX(-50%);
      span{
        font-size: .2rem;
        font-weight: bold;
      }
    }
    .line{
      width: 3.55rem;
      height: 2rem;
      position: absolute;
      bottom: .4rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .section4{
    background-image: url(../../assets/img/section1.jpg);
    padding-top: .3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .cont{
      font-size: .16rem;
      padding-left: .4rem;
      span{
        font-size: .2rem;
        font-weight: bold;
      }
    }
    .juju{
      width: 96%;
      margin: .2rem auto;
    }
  }
  .section5{
    background-image: url(../../assets/img/section4.jpg);
    padding-bottom: .2rem;
    .cont{
      font-size: .16rem;
      padding: .2rem;
      span{
        font-size: .2rem;
        font-weight: bold;
      }
    }
    .juju{
      width: 96%;
      margin: auto;
    }
  }
  .juju {
    display: flex;
    justify-content: space-between;
    .bar{
      width: calc(50% - .05rem);
      height: 7.5rem;
    }
  }
}
</style>
