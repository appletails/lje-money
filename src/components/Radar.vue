<template>
  <div class="radar">
    <div class="title">本周营业/上周营业</div>
    <div
      class="svg"
      v-if="data && max"
    >
      <div class="text">文字消息<br>{{data.idol[0].value}}/{{max.idol[0].value}}</div>
      <div class="live">直播/电台<br>{{data.idol[1].value}}/{{max.idol[1].value}}</div>
      <div class="image">图片<br>{{data.idol[2].value}}/{{max.idol[2].value}}</div>
      <div class="audio">语音/视频<br>{{data.idol[3].value}}/{{max.idol[3].value}}</div>
      <div class="reply">翻牌<br>{{data.idol[4].value}}/{{max.idol[4].value}}</div>
      <div class="day">营业天数<br>{{data.idol[5].value}}/{{max.idol[5].value}}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 262 302.53"
      >
        <g
          fill="none"
          stroke="#fff"
        >
          <polygon points="131 100.51 87.5 126.16333333333333 87.5 176.36666666666665 131 201.51999999999998 174.5 176.36666666666665 174.5 126.16333333333333 131 100.51" />
          <polygon points="131 50.255 44 101.06166666666667 44 201.4683333333333 131 251.77499999999998 218 201.4683333333333 218 101.06166666666667 131 50.255" />
          <polygon points="131 0 0.5 75.96 0.5 226.57 131 302.03 261.5 226.57 261.5 75.96 131 0" />
          <line
            x1="261"
            y1="76.21"
            x2="1"
            y2="226.32"
          />
          <line
            x1="1"
            y1="76.21"
            x2="261"
            y2="226.32"
          />
          <line
            x1="131"
            y1="301.38"
            x2="131"
            y2="1.15"
          />
        </g>
        <g>
          <polygon
            fill="rgba(82, 222, 151, .8)"
            stroke="rgba(82, 222, 151, .8)"
            :points="pathStr"
          />
        </g>
      </svg>
    </div>
  </div>
</template>
<script>
import { getDataView, getDataWeek } from '@/common/api'
export default {
  name: 'Radar',
  data () {
    return {
      data: null,
      circleO: [131, 151.265],
      polygon: [
        [131, .5], // x = x , y = (o.y - y) * %
        [.5, 75.96], // x = (o.x - x) * %, y = (o.y - y) * % + o.y
        [.5, 226.57], // x = (o.x - x) * %, y = (y - o.y) * % + o.y
        [131, 302.03], // x = x, y = (y - o.y) * % + o.y
        [261.5, 226.57], // x = (x - o.x) * % + o.x, y = (o.y - y) * % + o.y
        [261.5, 75.96], // x = (x - o.x) * % + o.x, y = (y - o.y) * % + o.y
        [131, .5] // x = x , y = (o.y - y) * %
      ],
      max: null,
    }
  },
  computed: {
    pathStr () {
      const pathList = this.pathList.map(item => item.join(' '))
      return pathList.join(' ')
    },
    pathList () {
      if (!this.data || !this.max) return []
      console.log(this.data, this.max)
      // 将data格式化成[文字，图片，直播，语音，天数，翻拍]
      const pathList = this.data.idol.map(item => item.value)
      const maxList = this.max.idol.map((item, i) => i === 5 ? 7 : item.value)
      const proportionList = pathList.map((item, i) => item / maxList[i] > 1 ? 1 : item / maxList[i])
      const circleO = this.circleO
      let path = []
      this.polygon.forEach((item, i) => {
        i = i === 6 ? 0 : i
        const proportion = proportionList[i]
        // const proportion = 1 / 3
        let coordinate = []
        switch (i) {
          case 0:
            coordinate = [item[0], (circleO[1] - item[1]) * (1 - proportion)]
            break
          case 1:
            coordinate = [circleO[0] - (circleO[0] - item[0]) * proportion, circleO[1] - (circleO[1] - item[1]) * proportion]
            break
          case 2:
            coordinate = [circleO[0] - (circleO[0] - item[0]) * proportion, (item[1] - circleO[1]) * proportion + circleO[1]]
            break
          case 3:
            coordinate = [item[0], (item[1] - circleO[1]) * proportion + circleO[1]]
            break
          case 4:
            coordinate = [(item[0] - circleO[0]) * proportion + circleO[0], (item[1] - circleO[1]) * proportion + circleO[1]]
            break
          case 5:
            coordinate = [(item[0] - circleO[0]) * proportion + circleO[0], (item[1] - circleO[1]) * proportion + circleO[1]]
            break
          case 6:
            coordinate = [item[0], (circleO[1] - item[1]) * (1 - proportion)]
            break
        }
        path.push(coordinate)
      })
      return path
    }
  },
  created () {
    getDataView().then(value => {
      this.data = value.data
    })
    getDataWeek().then(value => {
      this.max = value.data
    })
  }
}
</script>
<style lang="less" scoped>
.radar {
  width: 100%;
  height: 2.15rem;
  position: relative;
  color: #fff;
  font-size: 0.12rem;
  .title {
    text-align: center;
    margin-bottom: 0.05rem;
  }
  .svg {
    width: 100%;
    position: relative;
    text-align: center;
    padding: 0.4rem 0;
    svg {
      margin: auto;
      display: block;
      width: 60%;
    }
    .text {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    .day {
      position: absolute;
      top: 0.28rem;
      right: 0;
    }
    .live {
      position: absolute;
      top: 0.28rem;
      left: 0;
    }
    .audio {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    .image {
      position: absolute;
      bottom: 0.23rem;
      left: 0;
    }
    .reply {
      position: absolute;
      bottom: 0.23rem;
      right: 0;
    }
  }
}
</style>