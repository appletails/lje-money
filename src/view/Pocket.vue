<template>
	<div>
		<div class="side"></div>
		<div class="pc_box">
			<textarea v-model="cont" type="textarea" placeholder="请输入待检测的内容：" class="textarea" />
			<div class="word_num">
				<p>输入字数：{{cont.length}}/200</p>
				<div style="flex:1;"></div>
				<button class="tail_btn tail_btn_error none" @click="wordResult">清空</button>
				<button class="tail_btn tail_btn_info none" @click="copyTxt(cont)">复制</button>
			</div>
			<button class="tail_btn tail_btn_info btu" @click="wordTest">检测</button>
			<div class="listBox">
				<p class="line">敏感字：</p>
				<p v-if="list.length" v-html="box"></p>
				<p v-else>暂无敏感词</p>
			</div>
		</div>
	<IconLoading v-if="loading" class="loading"/>
	</div>
</template>
<script>
import { koudai } from '@/common/api'
import { sleep } from '@/utils'
import IconLoading from '@/components/Icon/IconLoading'
export default {
	components: {
		IconLoading
	},
	data() {
		return {
			cont: '',
			list: [],
			box: '',
			loading: false
		}
	},
	methods: {
		copyTxt(value) {
			if (!this.cont.length) {
				this.$Modal.alert(
					'你什么都没打复制个屁啊'
				);
				return
			}
			var _input = document.createElement("input");     // 直接构建input
			_input.value = value;   // 设置内容
			document.body.appendChild(_input);        // 添加临时实例
			_input.select();      // 选择实例内容
			document.execCommand("Copy");     // 执行复制
			document.body.removeChild(_input);  // 删除临时实例
			this.$Modal.alert(
				'已复制到剪切板'
			);
		},
		wordResult() {
			this.$Modal.confirm(
				"清空了自己重打的啊",
				"你要清空？",
				() => {
						this.cont = ''
						this.list = []
					}
				);
		},
		wordTest() {
			if (!this.cont.length) {
				this.$Modal.info(
					'你什么都没打测个屁啊',
				);
				return
			}
			this.loading = true
			koudai(this.cont)
				.then(value => {
					var result = value.data
					if (!result.list.length) {
						this.$Modal.info(
							"竟然没有违禁词",
							"牛逼啊"
						);
						return
					}
					this.list = result.list
					this.box = this.cont
					this.list.forEach(word => {
						this.box = this.box.replace(new RegExp(word, 'g'), '<span style="color:#ed4014;">' + word + '</span>')
					})
				})
				.catch(err => {
					this.$Modal.alert(err);
				})
				.finally(()=>{
					this.loading = false
				})
		}
	},
	created() {
	}
}
</script>
<style lang="less" scoped>
.side {
	width: 100%;
	height: 1.2rem;
	background-size: cover;
	background-position: center;
	background-image: url(http://www.crean.top/img/word.jpg);
}
.textarea {
	width: 94%;
	margin: .1rem auto;
	height: 1.2rem;
	resize: none;
	display: block;
	line-height: 1.5;
	padding: 4px 7px;
	border: 1px solid #dcdee2;
	border-radius: 4px;
	color: @font;
	font-family: '微软雅黑';
	&:focus {
		outline: none;
	}
	&::-webkit-input-placeholder{
		color: #d7d9dd;
	}
}


.pc_box{
    font-size: .12rem;
    .word_num {
        .flex;
        width: 94%;
        margin: .1rem auto 0;
        height: .3rem;
        .none {
            font-size: .12rem;
            height: 100%;
            width: .6rem;
            border-radius: 4px;
            margin-left: .1rem;
        }
    }
    .listBox {
        width: 94%;
        margin: .1rem auto 0;
        .line {
            height: .3rem;
            line-height: .3rem;
        }
    }
    .btu {
        width: 94%;
        display: block;
        height: .4rem;
        margin: .1rem auto;
        border-radius: 4px;
        font-size: .14rem;
    }
}

</style>