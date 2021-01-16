<template>
  <div class="item">
    <div v-if="rank+1>3" class="rank">
        {{rank+1}}
    </div>
    <div v-else :class="['pic'+rank,'rank']"></div>
    <img
      class="pic"
      :src="item.icon"
      :alt="item.nickName"
    />
    <div class="nick_name">{{item.nickName}}</div>
    <div class="money">
      <slot name="money">
        <span>
          {{item.allAmount}} <i class="fa fa-cny"></i>
        </span>
      </slot>
      </div>
    <div class="more">
      <slot name="more">
        <span>
          详情
        </span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LineItem",
  props: {
    rank: {
      type: Number,
      default: 1
    },
    item: {
      type: Object,
      default: null
    }
  },
  methods: {
  }
};
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
    height:.3rem;
    line-height: .3rem;
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
  }
  .money {
    margin-right: 0.1rem;
  }
}
</style>
