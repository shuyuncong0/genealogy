import Vue from "vue";
import Router from "vue-router";
import store from "./store";
// import home from '@/views/home/home'
//路由组件懒加载并分块打包(Webpack > 2.4提供的一种特定的注释语法)
//将所有页面组件一次性加载是一个很浪费资源和考验用户耐心的做法，尤其在移动端。
//webpack 提供了code splitting，实现当切换到特定路由时才加载代码。
// this generates a separate chunk (about.[hash].js) for this route
/* webpackChunkName: "home" */
// eslint-disable-next-line no-unused-vars  vertical
const Index = () => import("./views/geneal/index.vue");
const IndexB = () => import("./views/geneal/indexB.vue");
const View = () => import("./views/geneal/view.vue");

Vue.use(Router);
const router = new Router({
  // export default new Router({
  // eslint-disable-next-line no-undef
  mode: process.env.NODE_ENV === "production" ? "hash" : "history",
  // eslint-disable-next-line no-undef
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      component: Index,
      children: [
        //子路由
        {
          path: "/",
          name: "index",
          component: Index
        }
      ]
    },
    {
      path: "/indexB",
      name: "indexB",
      component: IndexB
    },
    {
      path: "/view",
      name: "view",
      component: View
    }
  ]
});
//全局路由导航后置守卫 index copy
// eslint-disable-next-line no-unused-vars
router.afterEach(function (to) {
  //隐藏加载提示框
  store.commit("setLoading", false);
});
export default router;