import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const port = 8091
// const host = '192.168.2.186' //测试 sss

// const host = 'localhost' //攀钢
const host = '47.98.189.101'
const apiUrl = `http://${host}:${port}/genealogy/`
export default new Vuex.Store({
  state: {
    // 公共变量
    loading: false,
    apiUrl
  },
  mutations: {
    setLoading: (state, status) => {
      state.loading = status
    }
  },
  actions: {}
})
