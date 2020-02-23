<template>
    <div class="allidol">
        <div class="btn">
            <input type="text" v-model="text" />
        </div>
        <span
            v-for="name in idols"
            :key="name"
            @click="$router.push(`/year?name=${name}`)"
        >{{name}}</span>
    </div>
</template>
<script>
import { getAllIdols } from '@/components/Year/api'
export default {
    data(){
        return {
            idolArr: [],
            text: ''
        }
    },
    computed:{
        idols(){
            return this.idolArr.length ? this.idolArr.filter(item => item.indexOf(this.text) !== -1) : []
        }
    },
    created () {
        getAllIdols().then(response => {
            this.idolArr = response.data
        })
    }
}
</script>
<style lang="less" scoped>
.allidol {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    font-size: .12rem;
    .btn{
        width: 100%;
        text-align: center;
        input{
            width: 3.5rem;
            height: .3rem;
            margin: .1rem;
            border-radius: .15rem;
            border: .02rem solid rgb(255, 171, 123);
            padding: 0 .15rem;
            &:focus{
                outline: none;
            }
        }
    }
    span{
        display: block;
        width: .74rem;
        height: .26rem;
        line-height: .26rem;
        text-align: center;
        margin: .05rem;
        background-color: rgb(255, 171, 123);
        color: #fff;
        border-radius: .06rem
    }
}
</style>
