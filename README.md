
**由于最近公司要开发一个后台管理系统，查阅了很多vue框架,本人觉得element简洁，方便，于是选择它作为我们的首选框架，并分享给大家，

# 一、<a name="1">目录</a>
| 目录                           |
| -------------------- |
| <span style="color:#0269c8"><a href="#1">1.目录</a></span>         |
| <span style="color:#0269c8"><a href="#2">2.初始化项目</a></span>         |
| <span style="color:#0269c8"><a href="#3">3.文件目录介绍与整理</a></span>         |
| <span style="color:#0269c8"><a href="#4">4.开发环境与线上环境配置</a></span> |
| <span style="color:#0269c8"><a href="#5">5.vue.config.js配置</a></span> |
| <span style="color:#0269c8"><a href="#6">6.ElementUI引入</a></span> |
| <span style="color:#0269c8"><a href="#7">7.vue-router路由介绍</a></span> |
| <span style="color:#0269c8"><a href="#8">8.axios引入并封装</a></span> |
| <span style="color:#0269c8"><a href="#9">9.vuex引入</a></span> |
| <span style="color:#0269c8"><a href="#10">10.首页布局介绍</a></span> |
| <span style="color:#0269c8"><a href="#11">11.结语</a></span> |

# <a name="2">二、初始化项目</a>
首先全局安装vue脚手架，当前是第三版本vue-cli3.x，这里是用的npm包管理工具来安装的，如果你的网不是很好的话可以先安装淘宝镜像 `npm install -g cnpm -registry=https://registry.npm.taobao.org`,然后通过cnpm来安装
```vue
    cnpm install -g @vue/cli or npm install -g @vue/cli
```
安装完成后，你还可以用这个命令来检查其版本是否正确 (3.x)：
```vue
    vue --version
```
安装脚手架后开始创建我们的项目
```vue
    vue create vue-admin-project
```
随后会出现两个选项

![alt](https://github.com/zhuyihe/vue-admin-project/blob/uploadFile/src/assets/img/1.png)


选择第二项并继续，并选择自己需要配置的功能，完成后并继续，然后开始生成项目

![alt](https://github.com/zhuyihe/vue-admin-project/blob/uploadFile/src/assets/img/2.png)

项目初始化成功

![alt](https://github.com/zhuyihe/vue-admin-project/blob/uploadFile/src/assets/img/3.png)
接下来按照上面的提示运行`cd app`以及启动本地服务器`npm run serve`,当运行完成之后会提示你打来本地端口`http://localhost:8080`,会出现欢迎页面，此时代表你的vue项目初始化完成。

![alt](https://github.com/zhuyihe/vue-admin-project/blob/uploadFile/src/assets/img/5.png)

# <a name="3">三、文件目录介绍与整理</a>
整理前的初始目录

    |-- vue-admin-project 
      |-- .gitignore            //git项目忽视文件
      |-- babel.config.js       //babel 配置文件
      |-- package-lock.json     //记录安装包的具体版本号
      |-- package.json          //包的类型
      |-- README.md 
      |-- public                //项目打包后的目录
      |   |-- favicon.ico
      |   |-- index.html
      |-- src                   //项目开发目录
          |-- App.vue           //主入口文件
          |-- main.js           //主入口文件
          |-- router.js         //vue-router文件
          |-- store.js          //vuex
          |-- assets //静态文件
             |-- logo.png
          |-- components        //组件存放目录
            |-- HelloWorld.vue
          |-- views             //视图目录
            |-- About.vue
            |-- Home.vue
  整理后的目录，主要更改``/src``文件夹下的目录
    
    |-- vue-admin-project
      |-- .gitignore
      |-- babel.config.js
      |-- package-lock.json
      |-- package.json
      |-- README.md
      |-- public
         |-- favicon.ico
         |-- index.html
      |-- src
          |-- App.vue
          |-- main.js
          |-- assets
             |-- logo.png
          |-- components
             |-- HelloWorld.vue
          |-- router        //路由配置文件夹
             |-- router.js
          |-- store        //状态管理文件夹 
             |-- store.js
          |-- views
             |-- About.vue
             |-- Home.vue
# <a name="4">四、开发环境与线上环境配置</a>
vue-cli 3.0x与vue-cli 2.0x最主要的区别是项目结构目录精简化，这也带来了许多问题，很多配置需要自己配置，由于2.0x版本中直接在`cofig/`文件夹下面配置开发环境与线上环境，3.0x则需要自己配置。</br>
 首先配置开发环境，在项目根目录下新建一个文件`.env`文件。
 ```javascript
    NODE_ENV="development"              //开发环境
    BASE_URL="http://localhost:3000/"   //开发环境接口地址
 ```
 接下来我们配置线上环境，同样在项目根目录新建一个文件`.env.prod`这就表明是生产环境。
 ```javascript
    NODE_ENV="production"              //生产环境
    BASE_URL="url"   //生产环境的地址
 ```
 现在我们如何在项目中判断当前环境呢？<br>
 我们可以根据`process.env.BASE_URL`来获取它是线上环境还是开发环境，后面会有运用
 ```javascript
    if(process.env.NODE_ENV='development'){
       console.log( process.env.BASE_URL) //http://localhost:3000/
    }else{
         console.log( process.env.BASE_URL) //url
    }
 ```
 至此，我们成功的配置好了开发环境与线上环境。
 
 # <a name="5">五、vue.config.js配置</a>
 讲到`vue.config.js`项目配置文件，又不得不说下3.x和2.x的区别,2.x里面webpack相关的配置项直接在项目的`build/webpack.base.conf.js`里面配置，而3.x完全在`vue.config.js`中配置，这使得整个项目看起来更加简洁明了,项目运行速度更快。<br/>
 由于项目初始化的时候没有`vue.config.js`配置文件，因此我们需要在项目根目录下新建一个`vue.config.js`配置项。<br/>
 在这个配置项里面，本项目主要是配置三个东西，第一个就是目录别名`alias`，另一个是项目启动时自动打开浏览器，最后一个就是处理引入的全局scss文件。当然有`vue.config.js`的配置远远不止这几项，有兴趣的同学可以去看看[vue.config.js](https://cli.vuejs.org/zh/guide/webpack.html)具体配置，具体代码如下。
 ```javascript
    let path=require('path');
    function resolve(dir){
        return path.join(__dirname,dir)
    }
    module.exports = {
        chainWebpack: config => {
            //设置别名
            config.resolve.alias
            .set('@',resolve('src'))
        },
        devServer: {
            open:true  //打开浏览器窗口
        },
        //定义scss全局变量
        css: {
            loaderOptions: {
              sass: {
                data: `@import "@/assets/scss/global.scss";`
              }
            }
          }
    }
 ```
  # <a name="6">六、ElementUI引入</a>
开始安装ElementUI
```javascript
    vue add element
```
接下来两个选项，第一个是全部引入，第二个是按需引入，我选择第一个`Fully import`，大家可以按照自己的项目而定。接下来会询问是否引入scss,这里选择是，语言选择zh-cn。</br>
接下来会提示安装成功，并在项目首页有一个element样式的按钮。
# <a name="7">七、vue-router路由介绍入</a>
路由管理也是本项目核心部分。<br>
1.引入文件
```javascript
    import Vue from 'vue'
    import Router from 'vue-router'
    import store from '../store/store' //引入状态管理
    import NProgress from 'nprogress' //引入进度条组件 cnpm install nprogress --save
    import 'nprogress/nprogress.css' 
    Vue.use(Router)
```
2.路由懒加载
```javascript
    /**
    *@parma {String} name 文件夹名称
    *@parma {String} component 视图组件名称
    */
    const getComponent = (name,component) => () => import(`@/views/${name}/${component}.vue`);
```
3.路由配置
```javascript
    const myRouter=new Router({
          routes: [
            {
              path: '/',
              redirect: '/home',
              component: getComponent('login','index')
            },
            {
              path: '/login',
              name: 'login',
              component: getComponent('login','index')
            },
            {
              path: '/',
              component:getComponent('layout','Layout'),
              children:[{
                path:'/home',
                name:'home',
                component: getComponent('home','index'),
                meta:{title:'首页'}
              },
              {
                path:'/icon',
                component: getComponent('icons','index'),
                name:'icon',
                meta:{title:'自定义图标'}
              },
              {
                path:'/editor',
                component: getComponent('component','editor'),
                name:'editor',
                meta:{title:'富文本编译器'}
              },
              {
                path:'/countTo',
                component: getComponent('component','countTo'),
                name:'countTo',
                meta:{title:'数字滚动'}
              },
              {
                path:'/tree',
                component: getComponent('component','tree'),
                name:'tree',
                meta:{title:'自定义树'}
              },
              {
                path:'/treeTable',
                component: getComponent('component','treeTable'),
                name:'treeTable',
                meta:{title:'表格树'}
              },
              {
                path:'/treeSelect',
                component: getComponent('component','treeSelect'),
                name:'treeSelect',
                meta:{title:'下拉树'}
              },
              {
                path:'/draglist',
                component: getComponent('draggable','draglist'),
                name:'draglist',
                meta:{title:'拖拽列表'}
              },
              {
                path:'/dragtable',
                component: getComponent('draggable','dragtable'),
                name:'dragtable',
                meta:{title:'拖拽表格'}
              },
              {
                path:'/cricle',
                component: getComponent('charts','cricle'),
                name:'cricle',
                meta:{title:'饼图'}
              },
            ]
            }
          ]
        })
```
4.本项目存在一个token，来验证权限问题，因此进入页面的时候需要判断是否存在token,如果不存在则跳转到登陆页面
```javascript
    //判断是否存在token
    myRouter.beforeEach((to,from,next)=>{
      NProgress.start()
      if (to.path !== '/login' && !store.state.token) {
         next('/login')     //跳转登录
         NProgress.done()   // 结束Progress
      }
      next()
    })
    myRouter.afterEach(() => {
      NProgress.done() // 结束Progress
    })
```
5.导出路由
```javascript
    export default myRouter
```
# <a name="8">八、axios引入并封装</a>
1.接口处理我选择的是axios，由于它遵循promise规范，能很好的避免回调地狱。现在我们开始安装
```javascript
    cnpm install axios -S
```
2.在`src`目录下新建文件夹命名为`api`,里面新建两个文件，一个是`api.js`，用于接口的整合，另一个是`request.js`,根据相关业务封装axios请求。
 + request.js <br/>
1.引入依赖
```javascript
    import axios from "axios";
    import router from "../router/router";
    import {
        Loading 
    } from "element-ui";
    import {messages} from '../assets/js/common.js' //封装的提示文件
    import store from '../store/store' //引入vuex
```
2.编写axios基本设置
```javascript
    axios.defaults.timeout = 60000;                         //设置接口超时时间
    axios.defaults.baseURL = process.env.BASE_URL;          //根据环境设置基础路径
    axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";  //设置编码
    let loading = null;                                     //初始化loading
```
3.编写请求拦截，也就是说在请求接口前要做的事情
```javascript
    /*
 *请求前拦截
 *用于处理需要请求前的操作
 */
axios.interceptors.request.use(
    config => {
        loading = Loading.service({
            text: "正在加载中......",
            fullscreen: true
        });
        if (store.state.token) {
            config.headers["Authorization"] = "Bearer " + store.state.token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
```
4.编写请求响应拦截，用于处理数据返回操作
```javascript
    /*
     *请求响应拦截
     *用于处理数据返回后的操作
     */
    axios.interceptors.response.use(
        response => {
            return new Promise((resolve, reject) => {
                //请求成功后关闭加载框
                if (loading) {
                    loading.close();
                }
                const res = response.data;
                if (res.err_code === 0) {
                    resolve(res)
                } else{
                    reject(res)
                }
            })
        },
        error => {
            console.log(error)
            //请求成功后关闭加载框
            if (loading) {
                loading.close();
            }
            //断网处理或者请求超时
            if (!error.response) {
                //请求超时
                if (error.message.includes("timeout")) {
                    console.log("超时了");
                    messages("error", "请求超时，请检查互联网连接");
                } else {
                    //断网，可以展示断网组件
                    console.log("断网了");
                    messages("error", "请检查网络是否已连接");
                }
                return;
            }
            const status = error.response.status;
            switch (status) {
                case 500:
                    messages("error", "服务器内部错误");
                    break;
                case 404:
                    messages(
                        "error",
                        "未找到远程服务器"
                    );
                    break;
                case 401:
                    messages("warning", "用户登陆过期，请重新登陆");
                    localStorage.removeItem("token");
                    setTimeout(() => {
                        router.replace({
                            path: "/login",
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;
                case 400:
                    messages("error", "数据异常，详情请咨询聚保服务热线");
                    break;
                default:
                    messages("error", error.response.data.message);
            }
            return Promise.reject(error);
        }
    );
```
5.请求相关的事情已经完成，现在开始封装get,post请求
```javascript
    /*
     *get方法，对应get请求
     *@param {String} url [请求的url地址]
     *@param {Object} params [请求时候携带的参数]
     */
    export function get(url, params) {
        return new Promise((resolve, reject) => {
            axios
                .get(url, {
                    params
                })
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    /*
     *post方法，对应post请求
     *@param {String} url [请求的url地址]
     *@param {Object} params [请求时候携带的参数]
     */
    export function post(url, params) {
        return new Promise((resolve, reject) => {
            axios
                .post(url, params)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
```
+ api.js<br>
封装好axios的业务逻辑之后自然要开始，运用，首先引入`get`以及`post`方法
```javascript
    import {get,post} from './request';
```
接下来开始封装接口,并导出
```javascript
    //登陆
    export const  login=(login)=>post('/api/post/user/login',login)
    //上传
    export const  upload=(upload)=>get('/api/get/upload',upload)
```
那我们如何调用接口呢？以登陆页面为例。
```javascript
    import { login } from "@/api/api.js"; //引入login
```
```javascript
    /**
    * @oarma {Object} login 接口传递的参数
    */
    login(login)
    .then(res => {
      //成功之后要做的事情
    })
    .catch(err => {
      //出错时要做的事情
    });
```
接口相关的逻辑已经处理完。
# <a name="9">九、vuex引入</a>
由于vue项目中组件之间传递数据比较复杂，因此官方引入了一个全局状态管理的东东，也就是现在要说的vuex，vuex能更好的管理数据，方便组件之间的通信。</br>
现在在store文件夹下面新建四个文件`state.js`,`mutations.js`,`getter.js`,`action.js`。
+ state.js </br>
state就是Vuex中的公共的状态, 我是将state看作是所有组件的data, 用于保存所有组件的公共数据.
```javascript
    const state = {
        token: '',//权限验证
        tagsList: [], //打开的标签页个数,
        isCollapse: false, //侧边导航是否折叠
    }
    export default state //导出
```
+ mutations.js</br>
我将mutaions理解为store中的methods, mutations对象中保存着更改数据的回调函数,该函数名官方规定叫type, 第一个参数是state, 第二参数是payload, 也就是自定义的参数.改变state的值必须经过mutations
```javascript
    const mutations = {
        //保存token
        COMMIT_TOKEN(state, object) {
            state.token = object.token;
        },
        //保存标签
        TAGES_LIST(state, arr) {
            state.tagsList = arr;
        },
        IS_COLLAPSE(state, bool) {
            state.isCollapse = bool;
        }
    }
    export default mutations
```
+ getter.js</br>
我将getters属性理解为所有组件的computed属性,也就是计算属性。vuex的官方文档也是说到可以将getter理解为store的计算属性, getters的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
```javascript
    const getters={
        //你要计算的属性
    }
    export default getters
```
+ action.js<br>
actions 类似于 mutations，不同在于：<br>
&nbsp;&nbsp;&nbsp;&nbsp;1.actions提交的是mutations而不是直接变更状态<br>
&nbsp;&nbsp;&nbsp;&nbsp;2.actions中可以包含异步操作, mutations中绝对不允许出现异步<br>
&nbsp;&nbsp;&nbsp;&nbsp;3.actions中的回调函数的第一个参数是context, 是一个与store实例具有相同属性和方法的对象<br>
```javascript
    const actions={
    
    }
    export default actions
```
+ store.js</br>
store.js是vuex模块整合文件,由于刷新页面会造成vuex数据丢失，所以这里引入了一个vuex数据持久话插件，将state里面的数据保存到localstorage。<br>
安装`vuex-persistedstate `
```javascript
    npm install vuex-persistedstate --save
```
```javascript
    import Vue from 'vue'
    import Vuex from 'vuex'
    import state from "./state";
    import mutations from "./mutations";
    import actions from "./actions";
    import getters from "./getters";
    //引入vuex 数据持久化插件
    import createPersistedState from "vuex-persistedstate"
    Vue.use(Vuex)
    
    export default new Vuex.Store({
      state,
      mutations,
      actions,
      getters,
      plugins: [createPersistedState()]
    })
```
至此vuex引入完毕，如同学们还有不明白的可以去翻阅[vuex](https://vuex.vuejs.org/zh/)文档。
