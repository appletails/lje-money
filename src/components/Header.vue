<template>
    <div class="header">
        <div class="left" v-if="routeName === 'Home'"></div>
        <div class="left" v-else @click="$router.go(-1)">
            <IconBack />
        </div>
        <div class="center">{{title}}</div>
        <div class="right">
            <img src="@/assets/img/logo.png" alt="logo">
        </div>
    </div>
</template>
<script>
import IconBack from '@/components/Icon/IconBack'
export default {
    name: 'Header',
    components: {
        IconBack
    },
    props: {
        title: {
            type: String,
            default: '标题'
        },
        routeName: {
            type: String,
            default: 'Home'
        }
    }
}
</script>
<style lang="less" scoped>
.header{
    .border;
    height: .45rem;
    background-color: #fff;
    border-top: none;
    border-left: none;
    border-right: none;
    padding: .1rem;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    font-size: .12rem;
    z-index: 101;
    .flex;
    .center{
        font-size: .14rem;
        color: @title;
    }
    .left{
        width: .3rem;
        .flex;
    }
    .right{
        width: .3rem;
        img{
            height: .3rem;
            display: block;
            border-radius: 50%;
            border: 1px solid @border;
        }
    }
}
</style>