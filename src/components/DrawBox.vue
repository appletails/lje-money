<template>
    <transition name="window" @after-leave="transitionComplete">
        <div class="draw_box" v-show="drawShow" @click.self="close">
            <div class="main">
                <div class="title">
                    <span>{{nick_name}}</span><span>{{allMoney}} ￥</span>
                </div>
                <div class="line_main">
                    <!-- 六选集资 -->
                    <div v-for="(line,i) in data" :key="i" class="line">
                        <p>{{line.prodName}}</p>
                        <p>
                            <span>{{line.all_money}} ￥</span>
                        </p>
                    </div>
                    <!-- 五选集资 -->
                    <div v-for="(line,j) in gift" :key="j" class="gift">
                        <div v-if="line.length">
                            <p>{{j+1}}.0 奖励</p>
                            <p v-for="(item,k) in line" :key="k">
                                <span>{{item.name}}</span>
                                <span>{{item.num}}</span>
                            </p>
                        </div>
                    </div>
                    <!-- 生诞集资 -->
                    <div v-for="(item,i) in moneyList" :key="i" class="money">
                        <p>
                            <span>{{item.name}}</span>
                            <span>{{item.money}} ￥</span>
                        </p>
                    </div>
                    <!-- 七选集资 -->
                    <div v-for="(line,i) in seven" :key="i" class="line">
                        <p>{{line.title}}</p>
                        <p>
                            <span>{{line.amount}} ￥</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'DrawBox',
    computed:{
        ...mapState({
            drawShow: state => state.drawShow,
            data: state => state.drawMain.data,
            gift: state => state.drawMain.gift,
            moneyList: state => state.drawMain.moneyList,
            seven: state => state.drawMain.seven,
            nick_name: state => state.drawMain.nick_name,
            allMoney: state => state.drawMain.allMoney
        })
    },
    methods:{
        transitionComplete(){
            this.$store.commit('drawBox',{
                data: [],
                gift: [],
                seven: [],
                moneyList: [],
                nick_name:'',
                allMoney:0
            })
        },
        close(){
            this.$store.commit('drawShow',false)
        }
    }
}
</script>
<style lang="less" scoped>
.draw_box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.6);
    z-index: 101;
    .main{
        width: 3rem;
        padding: .15rem;
        border-radius: 6px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        font-size: .12rem;
        color: @font;
        .title{
            font-size: .14rem;
            color: @title;
            padding: .05rem 0;
            .border;
            border-top: none; 
            border-left: none; 
            border-right: none; 
            .flex;
        }
        .line_main{
            max-height: 80vh;
            overflow-y: scroll;
            .line{
                text-align: center;
                margin-top: .15rem;
                p{
                    margin: .05rem 0;
                }
                &:last-of-type{
                    margin-top: 0;
                }
            }
            .gift{
                p{
                    .flex;
                    margin: .1rem auto;
                    &:first-of-type{
                        justify-content: center;
                        border-bottom: 1px solid @border;
                        padding: .1rem 0;
                        width: 40%;
                    }
                }
            }
            .money{
                p{
                    .flex;
                    margin: .1rem auto;
                }
            }
        }
    }
}
</style>