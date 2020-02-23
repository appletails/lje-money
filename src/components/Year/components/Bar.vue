<template>
  <div>
    <div class="e_title" :style="{color: fontColor}">
      <div v-if="title"><icon class="icon" :color="fontColor" />{{ title }}</div>
    </div>
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
  name: "Bar",
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
      default: ''
    },
    color: {
      type: String,
      default: '#5cb0f6'
    },
    start: {
      type: [String, Number],
      default: 0
    },
    fontColor: {
      type: String,
      default: '#555'
    },
    max: {
      type: Boolean,
      default: () => { return { value: null } }
    }
  },
  computed: {
    option() {
      return {
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: '-20',
          containLabel: true
        },
        yAxis: {
          show: false,
          type: "category",
          axisLabel: { show: false },
          inverse: true,
          data: this.data
        },
        xAxis: [{ type: "value", show: false, max: this.max.value }],
        series: [
          {
            type: "bar",
            barGap: 0,
            itemStyle: {
              color: 'transparent'
            },
            barWidth: 16,
            label: {
              show: true,
              position: 'insideLeft',
              color: '#333',
              formatter: ({name, value, dataIndex}) => {
                const newName = name.replace(/[^\u4e00-\u9fa5]/gi,'')
                if(name.length >= 12){
                  name = name.slice(0,7) + '...'
                }else{
                  name = newName.length > 8 ? name.slice(0,7) + '...' : name
                }
                return `${dataIndex + this.start + 1}、${name} {a|(${value})}`
              },
              rich:{
                a: {
                  color: this.color,
                  fontWeight: 'bold'
                }
              }
            },
            data: this.data
          },
          {
            type: "bar",
            barWidth: 8,
            itemStyle: {
              color: this.color,
              barBorderRadius: 4
            },
            data: this.data
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
  color: #555;
  display: flex;
  align-items: center;
  .icon {
    margin-right: .05rem;
  }
}
</style>