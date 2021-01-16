<template>
    <!-- 每日一语 -->
    <div class="day">
        <div class="time" v-if="time === 'out'">
            {{item.date.year}}年{{item.date.month}}月{{item.date.date}}日
        </div>
        <div class="chicken_soup">
            <div class="img">
                <img :src="item.image_small" alt="img" />
            </div>
            <div class="say" :style="{justifyContent:justify}">
                <div>
                    {{item.content}}
                </div>
                <div class="date" v-if="time === 'in'">
                    {{item.date.year}}年{{item.date.month}}月{{item.date.date}}日
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DayItem',
    props: {
        item: {
            type:Object,
            default:{
                image_small: '',
                content: '',
                date: {
                    year: '',
                    month: '',
                    date: ''
                }
            }
        },
        time: {
            type: String,
            default: 'out'
        },
        justify: {
            type: String,
            default: ''
        }
    }
}
</script>
<style lang="less" scope>
.day {
    .time{
        font-size: .12rem;
        margin-left: .15rem;
        margin-bottom: .08rem;
        color: @date;
    }
    .chicken_soup {
        .day_item;
        .flex;
        .img {
            margin-right: .1rem;
            flex-basis: auto !important;
            background-color: #fff;
            img {
                border-radius: 4px;
                display: block;
                width: .6rem;
            }
        }
        .say {
            color: @font;
            .flex(
                @direction:column,
                @justify:space-between,
                @alignItem:flex-start
            );
            height: 100%;
            flex: 1;
            font-size: .12rem;
            background-color: #fff;
            &>div{
                width: 100%;
            }
            .date{
                width: auto;
                align-self: flex-end;
                color: @date;
            }
        }
    }
}
</style>

