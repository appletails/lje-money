<template>
  <div>
    <div class="item" v-for="(item, rank) in data" :key="rank">
      <div v-if="rank + 1 > 3" class="rank">
        {{ rank + 1 }}
      </div>
      <div v-else :class="['pic' + rank, 'rank']"></div>
      <img class="pic" :src="item.icon" :alt="item.nick_name[0]" />
      <div class="nick_name">{{ item.nick_name }}</div>
      <div class="money">{{ item.num }}/54 | {{ item.set }} <i class="fa fa-cny"></i></div>
      <div class="more" v-if="item.num > 0" @click="showCard(rank)">详情</div>
      <div class="more" v-else>无卡</div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    data () {
      return this.$store.state.hellow.helloweenData
    }
  },
  methods: {
    showCard (index) {
      this.$router.push({path: '/helloweenCard', query: { index }})
    }
  },
  created() {
    this.$store.dispatch('hellow/getHelloweenData')
  }
}
</script>

<style lang="less" scoped>
.item {
  .flex;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.06rem;
  background-color: #fff;
  width: 3.6rem;
  height: 0.5rem;
  margin: 0 auto;
  padding: 0.1rem;
  font-size: 0.12rem;
  color: @font;
  margin-bottom: 0.1rem;
  .rank {
    min-width: 0.15rem;
    margin-right: 0.1rem;
    text-align: center;
    background-size: 90%;
    background-position: center center;
    background-repeat: no-repeat;
    height: 0.3rem;
    line-height: 0.3rem;
    &.pic0 {
      background-image: url(https://s.moimg.net/img/web4-0/wds_project/gold@2x.png);
    }
    &.pic1 {
      background-image: url(https://s.moimg.net/img/web4-0/wds_project/silver@2x.png);
    }
    &.pic2 {
      background-image: url(https://s.moimg.net/img/web4-0/wds_project/bronze@2x.png);
    }
  }
  .pic {
    height: 0.3rem;
    margin-right: 0.1rem;
  }
  .nick_name {
    flex: 1;
    margin-right: 0.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .money {
    margin-right: 0.1rem;
  }
}
</style>
