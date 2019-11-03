 <template>
  <div class="week">
    <div class="top">
      <div class="max_title">
        <img src="@/assets/img/week_title.png" alt="title" class="title" />
        <span class="date start">{{data.NEEDDATA[0]}}</span>
        <span class="date end">—{{data.NEEDDATA[1]}}</span>
      </div>
      <ul class="all_msg">
        <li>
          新的一周了，小唐上周在口袋共发了
          <span>{{data.ALL.ALLNUMBER}}</span>条消息
        </li>
        <li>
          <span>{{theDay(data.MAN[0].dataTime[0])}}</span>是早起的一天，
          <span>{{theTime(data.MAN[0].dataTime[1])}}</span>就开始营业了呢
        </li>
        <li>
          <span>{{theDay(data.MAN[1].dataTime[0])}}</span>好晚休息呦，
          <span>{{theTime(data.MAN[1].dataTime[1])}}</span>还在口袋发消息
        </li>
        <li>
          <span>{{theDay(data.DAY.day)}}</span>这天很兴奋呢，共留言了
          <span>{{data.DAY.num}}</span>条消息呢！
        </li>
      </ul>
    </div>
    <div class="all_pic">
      <div class="msg">
        <div>
          小唐上周分享了
          <span>{{data.ALL.IMAGE}}</span>张照片，每一张都像是栩栩如生，令人惊叹不已！
        </div>
      </div>
      <div
        class="pic"
        v-for="src in data.IMAGE"
        :key="src.url"
        :style="{backgroundImage:`url(${src.url})`}"
      />
    </div>
    <div class="foot">
      <div class="foot_left">
        <div class="reply">
          <div class="line">
            上周也有积极营业呢，总共在口袋翻牌了
            <span>{{allReply}}</span>次，是所有留言的
            <span>{{allReplyTo}}</span>呢！
          </div>
          <div>
            上周共有
            <span>{{data.REPLY.user}}</span>位聚聚被翻牌了，好羡慕他们，最多的一位被翻了
            <span>{{data.REPLY.num}}</span>次呢！
          </div>
        </div>
        <div class="video">
          上周还分享了
          <span>{{data.ALL.VIDEO}}</span>次视频消息、
          <span>{{data.ALL.AUDIO}}</span>次语音消息和
          <span>{{data.ALL.LIVEPUSH}}</span>次直播/电台~继续加油哦~
        </div>
      </div>
      <div class="foot_right">
        <!-- <ul class="bar">
          <li v-for="(item,i) in dataView.idol" :key="i">
            <div>{{item.name}}：{{item.value}}次</div>
            <div class="line" :style="{width: width(item.value) }"></div>
          </li>
        </ul> -->
        <Radar />
      </div>
    </div>
    <div class="end">注：统计可能和实际数值有微差属正常情况~</div>
  </div>
</template>

<script>
import { getWeek, getDataView } from "@/common/api"
import Radar from '@/components/Radar'
export default {
  components: {
    Radar
  },
  data() {
    return {
      data: {
        ALL: { REPLY: 0 },
        DAY: {},
        IMAGE: [],
        MAN: [
          { dataTime: [null, null], time: null },
          { dataTime: [null, null], time: null }
        ],
        NEEDDATA: [null, null],
        REPLY: {}
      },
      dataView: {
        idol: [
            { name: "文字消息", type: "TEXT", value: 0 },
            { name: "翻牌消息", type: "REPLY", value: 0 },
            { name: "图片消息", type: "IMAGE", value: 0 },
            { name: "语音/视频", type: "AUDIO", value: 0 },
            { name: "直播/电台", type: "LIVEPUSH", value: 0 }
        ],
        fans: [
            { name: "粉丝留言", type: "FANSSAY", value: 0 },
            { name: "粉丝数", type: "FANSNUM", value: 0 }
        ]
      }
    };
  },
  methods: {
    width(value){
      return (value*100/this.dataView.idol[0].value).toFixed(2) + "%"
    },
    theDay(date) {
      return date
        ? date
            .split("/")
            .slice(1, 3)
            .map(time => parseInt(time))
            .join("月") + "号"
        : "";
    },
    theTime(date) {
      return date
        ? date
            .split(":")
            .slice(0, 2)
            .map(time => parseInt(time))
            .join("点") + "分"
        : "";
    },
  },
  computed: {
    allReply() {
      return this.data.ALL.REPLY + this.data.ALL.FLIPCARD;
    },
    allReplyTo() {
      return ((this.allReply / this.data.ALL.ALLNUMBER) * 100).toFixed(2) + "%";
    }
  },
  created() {
    getWeek().then(value => {
      this.data = value.data;
    });
    getDataView().then(value => {
      this.dataView = value.data;
    })
  }
};
</script>

<style lang="less" scoped>
@org: #f55a46;
@green: #07131f;
@blue: #48b7a2;
@span: #f4f4f4;
span {
  padding: 0 0.02rem;
  border-bottom: 1px solid #fff;
  font-weight: bold;
}
.week {
  background-color: @org;
  min-height: 6.67rem;
  .top {
    width: 100%;
    height: 1.88rem;
    padding: 0.1rem;
    .flex(@flexWrap: nowrap;);
    .max_title {
      position: relative;
      height: 1.68rem;
      .title {
        width: 1.75rem;
      }
      .date {
        font-size: 0.1rem;
        color: #fff;
        position: absolute;
        transform: rotate(90deg);
        transform-origin: top left;
        border: none;
        font-weight: normal;
      }
      .start {
        top: 0.82rem;
        left: 0.75rem;
      }
      .end {
        top: 0.82rem;
        left: 0.64rem;
      }
    }
    .all_msg {
      font-size: 0.12rem;
      color: #fff;
      margin-left: 0.1rem;
      li {
        padding: 0.04rem;
        &:not(:last-of-type) {
          border-bottom: 1px dashed #fff;
        }
      }
    }
  }
  .all_pic {
    font-size: 0.12rem;
    padding: 0.1rem;
    .flex;
    position: relative;
    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 3.55rem;
      border-top: 1px dashed #fff;
      top: 0;
      left: 0.1rem;
      margin: auto;
    }
    .msg {
      color: #fff;
      width: 1.725rem;
      height: 0.8125rem;
      background-color: @green;
      border-radius: 0.04rem;
      padding: 0 0.1rem;
      .flex(@alignItem: center;);
    }
    .pic {
      width: 0.8125rem;
      height: 0.8125rem;
      background-size: cover;
      background-position: 80% center;
      border: 0.02rem solid @green;
      border-radius: 0.04rem;
    }
    & div:not(:nth-of-type(1)):not(:nth-of-type(2)):not(:nth-of-type(3)) {
      margin-top: 0.1rem;
    }
  }
  .foot {
    width: 100%;
    padding: 0.1rem;
    font-size: 0.12rem;
    position: relative;
    .flex;
    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 3.55rem;
      border-top: 1px dashed #fff;
      top: 0;
      left: 0.1rem;
    }
    .foot_left {
      width: 50%;
      color: #fff;
      position: relative;
      &::after {
        content: "";
        display: block;
        position: absolute;
        height: 100%;
        border-right: 1px dashed #fff;
        top: 0;
        right: 0;
      }
      & > div {
        background-color: @blue;
        padding: 0.1rem;
        border-radius: 0.04rem;
        margin-right: 0.1rem;
      }
      .reply {
        margin-bottom: 0.1rem;
        & div:first-of-type {
          margin-bottom: 0.1rem;
          padding-bottom: 0.1rem;
          border-bottom: 1px dashed #fff;
        }
      }
    }
    .foot_right {
      width: 50%;
      padding: 0 .1rem;
      
      .bar{
        width: 100%;
        color: #fff;
        font-size: .12rem;
        .line{
          height: .18rem;
          background-color: @span;
          margin: .04rem 0;
          border-radius: .09rem;
        }
      }
    }
  }
  .end {
    font-size: 0.1rem;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
  }
}
</style>
