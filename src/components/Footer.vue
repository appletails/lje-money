<template>
    <div class="footer">
        <router-link to="/pocket">
            口袋敏感词检测
        </router-link>
    </div>
</template>
<script>
export default {
    name: 'Header',
}
</script>
<style lang="less" scoped>
.footer{
    .border;
    height: .45rem;
    line-height: .45rem;
    background-color: #fff;
    border-bottom: none;
    border-left: none;
    border-right: none;
    padding: 0 .1rem;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: .12rem;
    color: @font;
    text-align: center
}
</style>