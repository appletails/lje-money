<template>
  <div>
    <button class="tail_btn">text</button>
    <button class="tail_btn tail_btn_info" @click="info()">info</button>
    <button class="tail_btn tail_btn_success" @click="alert()">Success alert</button>
    <button class="tail_btn tail_btn_warning" @click="confirm()">Warning confirm</button>
    <button class="tail_btn tail_btn_error" @click="$Modal.remove()">error close</button>
  </div>
</template>

<script>
import { cent, datetamp, timestamp } from '@/filters'
export default {
  name: 'Button',
  data () {
    return {
    }
  },
  methods: {
    confirm () {
      this.$Modal.confirm('this is a confirm', 'this is a title', () => {
        console.log('ok')
      }, () => {
        console.log('cencal')
      })
    },
    info () {
      this.$Modal.info('this is a info', 'this is a title', () => {
        console.log('msg')
      })
    },
    alert () {
      this.$Modal.alert('this is a alert')
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
</style>
