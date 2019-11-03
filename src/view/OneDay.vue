<template>
  <div class="one_day">
    <DayItem v-for="item in data" :key="item.id" :item="item" justify="center" @click.native="soupBox(item.id)"/>
		<transition name="window">
			<div class="soup_box" v-show="show" @click="closeBox" @touchmove.prevent>
        <img :src="soup_box.image_large" alt="每日一语" ref="img1" />
        <div class="tips_content">
          <div class="days">
            <div class="day">{{soup_box.date.date}}</div>
            <div class="year">{{soup_box.date.year}}年{{soup_box.date.month}}月</div>
            <div class="text">
              <span>{{soup_box.content}}</span>
            </div>
          </div>
        </div>
			</div>
		</transition>
    <i v-if="loading" class="fa fa-spinner fa-spin loading"></i>
  </div>
</template>

<script>
import Title from "@/components/Title"
import DayItem from '@/components/DayItem'
import { soups } from '@/common/api'
export default {
  components: {
    Title,
    DayItem
  },
  data(){
    return {
      show: false,
			soup_box: { // 弹出层的内容详情
				image_large: "",
				date: {
					year: "",
					month: "",
					date: ""
				}
			},
			loading: false // 图片加载的loading状态
    }
  },
  computed:{
    data(){
      return this.$store.state.oneDay
    }
  },
  methods: {
		// 显示遮罩层
		soupBox: function(id) {
			// 过滤出前需要的对象
			this.soup_box = this.data.filter(item => item.id == id)[0]
			// 新建Img用来判断图片是否已加载
			var img = new Image();
			img.src = this.soup_box.image_large
			// 打开loading
			this.loading = true
			if (img.complete) {
				this.loading = false
				this.show = true
			} else {
				this.$refs.img1.onload = ()=> {
					this.loading = false
					this.show = true
				}
			}
		},
		// 关闭遮罩层
		closeBox: function() {
			this.show = false
		}
  },
  created () {
    if(this.data.length) return
    soups().then(value => {
      let soupsDate = value.data.reverse().map(item => {
        item.date = {
          year: item.date.substring(0, 4),
          month: item.date.substring(4, 6),
          date: item.date.substring(6)
        }
        return item
      })
      this.$store.commit('oneDay',soupsDate)
    })
  }
}
</script>

<style lang="less" scoped>
.one_day {
    padding-top: .1rem;
  .soup_box {
    padding: 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 105;
    img {
      position: absolute;
      width: 100%;
      min-height: 100%;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
    .tips_content {
      height: auto;
      bottom: .5rem;
      left: 0;
      position: absolute;
      padding: 0 .3rem;
      width: 100%;
      .days {
        .day {
          color: #fff;
          font-family: HelveticaUltra;
          font-size: .6rem;
          line-height: .6rem;
          text-shadow: 0 1px 2px rgba(0, 0, 0, .6);
        }
        .year {
          font-size: .24rem;
          color: #fff;
          font-family: HelveticaThin;
          line-height: .24rem;
          text-shadow: 0 1px 2px rgba(0, 0, 0, .6);
        }
        .text {
          color: #fff;
          font-size: .16rem;
          line-height: .26rem;
          margin-top: .16rem;
          text-shadow: 0 1px 2px rgba(0, 0, 0, .6);
        }
      }
    }
  }
}
</style>
