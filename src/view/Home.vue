<template>
  <div class="home">
    <div class="banner"></div>
    <Title
      title="每日一语"
      marginBottom=".1rem"
      path="/oneday"
    >
      <IconIndex slot="Icon" style="margin-right:.08rem"/>
    </Title>
    <div
      class="day_item"
      v-if="loading"
    >
      <IconLoading class="day_loading"/>
    </div>
    <DayItem
      v-else
      :item="theDay"
      time="in"
      @click.native="$router.push('/oneday')"
    />
    <Title
      title="快速入口"
    >
      <IconBook slot="Icon" style="margin-right:.08rem"/>
    </Title>
    <div class="more">
      <router-link
        tag="div"
        v-for="(item,i) in routerConfig"
        :key="i"
        :class="['box',`bg${i}`]"
        :to="item.path"
      >{{item.meta.title}}</router-link>
    </div>
    <router-link tag="div" to="/pocket" class="link">友情链接：口袋敏感词检测</router-link>
    <div class="icp">皖ICP备18010765号-2</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { soups } from "@/common/api";
import routerConfig from "@/router/router.config";
import DayItem from '@/components/DayItem'
import Title from '@/components/Title'
import { sleep } from '@/utils'
import IconIndex from '@/components/Icon/IconIndex'
import IconBook from '@/components/Icon/IconBook'
import IconLoading from '@/components/Icon/IconLoading'
export default {
  components: {
    DayItem,
    Title,
    IconIndex,
    IconBook,
    IconLoading
  },
  data () {
    return {
      routerConfig,
      loading: false
    };
  },
  computed: {
    ...mapState({
      oneDay: state => state.oneDay
    }),
    theDay () {
      return this.oneDay.length ? this.oneDay[0] : {
        image_small: '',
        content: '',
        date: {
          year: '',
          month: '',
          date: ''
        }
      }
    }
  },
  created () {
    if (this.oneDay.length) return;
    this.loading = true
    soups()
      .then(value => {
        let soupsDate = value.data.reverse().map(item => {
          item.date = {
            year: item.date.substring(0, 4),
            month: item.date.substring(4, 6),
            date: item.date.substring(6)
          };
          return item;
        });
        this.$store.commit("oneDay", soupsDate);
      })
      .catch(err => {
        this.$Modal.alert(err)
      })
      .finally(() => {
        this.loading = false
      })
  }
};
</script>

<style lang="less" scoped>
.home {
  font-size: 0.12rem;
  .banner {
    width: 100%;
    height: 1.5rem;
    position: relative;
    background-image: url(http://www.crean.top/img/banner1.jpg);
    background-size: cover;
    .btm {
      position: absolute;
      bottom: 0;
      left: 0;
      color: #fff;
      width: 100%;
      padding: 0.1rem;
      background: linear-gradient(bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
    }
  }
  .more {
    .flex(@justify:center);
    margin-bottom: 0.1rem;
    .box {
      width: 3.6rem;
      background-size: cover;
      background-repeat: no-repeat;
      height: 0.375rem;
      line-height: 0.375rem;
      color: #fff;
      border-radius: 0.04rem;
      margin-top: 4px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
      background-image: url(../assets/img/home_bg.jpg);
      padding-left: 0.3rem;
      font-size: 0.12rem;
      font-weight: bold;
      text-shadow: 0 0.01rem 0.02rem rgba(0, 0, 0, 0.6);
    }
    .bg0 {
      background-position: center top;
    }
    .bg1 {
      background-position: center -0.375rem;
    }
    .bg2 {
      background-position: center -0.75rem;
    }
    .bg3 {
      background-position: center -1.125rem;
    }
    .bg4 {
      background-position: center -1.5rem;
    }
    .bg5 {
      background-position: center -1.875rem;
    }
    .bg6 {
      background-position: center -2.25rem;
    }
  }
  .link {
    text-align: center;
    border-bottom: 1px solid #ccc;
    line-height: .3rem;
    margin: 0 1rem;
  }
  .icp {
    line-height: .4rem;
    color: #929292;
    font-size: .12rem;
    text-align: center;
  }
}
.day_item {
  text-align: center;
  line-height: 5.5;
  .day_loading {
    font-size: 0.18rem;
  }
}
</style>
