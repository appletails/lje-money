<template>
  <div>
    <div class="e_title" :style="{color: fontColor}"><icon class="icon" :color="fontColor" />{{ title }}</div>
    <div class="e_line_box">
      <v-echarts class="e_line_main" :options="option" theme="light" :autoresize="true" />
    </div>
  </div>
</template>
<script>
import echarts from 'vue-echarts'
import IconBook from '../../Icon/IconBook'
import './echart-tool'
export default {
  name: "Pie",
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
    color: {
      type: String,
      default: '#5cb0f6'
    },
    fontColor: {
      type: String,
      default: '#555'
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
        tooltip : {
          trigger: 'item',
          formatter: "{b}<br/>{c} ({d}%)"
        },
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: '-20',
          containLabel: true
        },
        legend: {
          orient: 'vertical',
          right: 0,
          top: 'center',
          formatter: name => {
            const sum = this.data.reduce((num,item) =>{
              return num + item.value
            },0)
            const num = this.data.filter(item => item.name === name)[0].value
            return `${name.replace('/匿名 ','')} (${num} | ${(num*100/sum).toFixed(2)}%)`
          },
          data: this.data.sort((a,b) => b.value - a.value).map(item => item.name)
        },
        series: [
          {
            type: "pie",
            radius: [0, '65%'],
            center: ['22%', '50%'],
            label: {
              position: 'inside',
              formatter: ({name,value,percent}) => {
                if(percent < 10){
                  return ''
                }else{
                  return `${name.replace('/匿名 ','')}\n${value}`
                }
              }
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