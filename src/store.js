import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const port = 8090;

// const host = "localhost"; //
const host = 'localhost'
const baseUrl = process.env.VUE_APP_URL
// const apiUrl = `http://${host}:${port}/formeal/genealogy/`;
const apiUrl = `http://${host}:${port}/genealogy/`;
export default new Vuex.Store({
  state: {
    // 公共变量
    loading: false,
    apiUrl
  },
  mutations: {
    setLoading: (state, status) => {
      state.loading = status;
    }
  },
  actions: {}
});
