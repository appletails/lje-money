<template>
  <div>
    <div class="e_title" :style="{color: fontColor}"><icon class="icon" :color="fontColor" />{{ title }}</div>
    <div class="e_line_box">
      <v-echarts class="e_line_main" :options="option" :autoresize="true" />
    </div>
  </div>
</template>
<script>
import echarts from 'vue-echarts'
import IconBook from '../../Icon/IconBook'
import './echart-tool'
export default {
  name: "Line",
  components: {
    'v-echarts': echarts,
    'icon': IconBook
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: '这是一个标题'
    },
    fontColor: {
      type: String,
      default: '#555'
    },
    color: {
      type: String,
      default: '#ff6768'
    }
  },
  methods: {
    },
  computed: {
    hexToRgb() {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.color)
      return `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},0)`
    },
    option() {
      return {
        grid: {
          left: 16,
          right: 16,
          top: 36,
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: {show:false},
          axisLine: {lineStyle: {color: '#e8e8e8'}},
          axisLabel: {color: '#565d6a',fontSize: 10},
          data: this.data.map(item => item.name)
        },
        yAxis: [{
          type: "value",
          axisTick: {show:false},
          axisLine: {lineStyle: {color: '#e8e8e8'}},
          axisLabel: { show: false },
          splitNumber: 3,
          splitLine: {
            lineStyle: {
              color: '#e8e8e8'
            }
          }
        },{
          type: "value",
          axisTick: {show:false},
          axisLine: {lineStyle: {color: '#e8e8e8'}},
          axisLabel: { show: false},
        }],
        series: [
          {
            data: this.data,
            type: "line",
            itemStyle: {
              color: this.color
            },
            areaStyle: {
              color:{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {offset: 0, color: this.color},
                  {offset: 1, color: this.hexToRgb}
                ]
              }
            },
            markPoint: {
              symbolSize: 40,
              data: this.data.map((item,i) => {
                return {
                  name: item.name,
                  coord: [i,item.value],
                  value: item.value
                }
              }),
            },
            smooth: true
          }
        ]
      };
    }
  }
};
</script>
<style lang="less" scoped>
.e_line_box{
  padding: .1rem;
  border-radius: .06rem;
  background-color: #fff;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  height: calc(100% - .25rem);
  .e_line_main{
    width: 100%;
    height: 100%;
  }
}
.e_title {
  font-size: 0.12rem;
  height: 0.16rem;
  line-height: 0.16rem;
  margin-bottom: 0.09rem;
  display: flex;
  align-items: center;
  .icon {
    margin-right: .05rem;
  }
}
</style>