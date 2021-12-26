import Vue from "vue";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.prototype.axios = Axios;
import Vue2OrgTree from "vue2-org-tree";
import OrgTree from "v-org-tree";
import "v-org-tree/dist/v-org-tree.css";
import "./style/index.scss";
Vue.use(OrgTree);
Vue.use(ElementUI);
Vue.use(Vue2OrgTree);
new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  }
}).$mount("#app");