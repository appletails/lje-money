import { getHelloween } from "../api"
export default {
  namespaced: true,
  state: {
    helloweenData: []
  },
  mutations: {
    setHelloweenData (state, data) {
      data.sort((a,b)=>{
        return b.set - a.set
      })
      state.helloweenData = data
    }
  },
  actions: {
    getHelloweenData ({ commit }) {
      getHelloween()
        .then(res => {
          if (res.status === 200) {
            commit('setHelloweenData', res.data.data)
          }
        })
    }
  }
}