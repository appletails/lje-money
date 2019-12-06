<template>
    <div class="title" :style="{marginBottom: marginBottom}">
        <slot name="Icon"></slot>
        <div class="cont">{{title}}</div>
        <router-link class="more" v-if="path" :to="path">More</router-link>
        <div v-else></div>
    </div>
</template>
<script>
export default {
    name: 'Title',
    props:{
        title: {
            type: String,
            default: ''
        },
        path: {
            type: String,
            default: ''
        },
        marginBottom: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        }
    }
}
</script>
<style lang="less" scoped>
.title{
    .border;
    height: .36rem;
    background-color: #fff;
    border-top: none;
    border-left: none;
    border-right: none;
    padding: .1rem;
    .flex;
    .icon{
        color: @title;
        margin-right: .04rem;
    }
    .cont{
        color: @title;
        font-size: .14rem;
        flex:1;
    }
    .more{
        color: @title;
        font-size: .12rem;
    }
}
</style>