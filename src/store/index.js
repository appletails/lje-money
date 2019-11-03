import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    drawShow: false,
    drawMain: {
      nick_name: '',
      data: [],
      gift: [],
      moneyList: [],
      allMoney: 0
    },
    userCard: [],
    sixRank: [],
    fiveRank: [],
    fiveBirthday: [],
    oneDay: []
  },
  getters: {},
  mutations: {
    userCard (state, userCard) {
      state.userCard = userCard
    },
    fiveBirthday (state, data) {
      state.fiveBirthday = data
    },
    sixRank (state, data) {
      state.sixRank = data
    },
    fiveRank (state, data) {
      state.fiveRank = data
    },
    oneDay (state, data) {
      state.oneDay = data
    },
    drawShow (state, show) {
      state.drawShow = show
    },
    drawBox (state,{data,nick_name,allMoney,gift,moneyList}) {
      state.drawMain = {
        nick_name,
        data,
        gift,
        moneyList,
        allMoney
      }
    }
  },
  actions: {},
  modules: {}
})
