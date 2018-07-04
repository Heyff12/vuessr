// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'

import {
  createRouter
} from './router'
import {
  createStore
} from './store'
import {
  sync
} from 'vuex-router-sync'
import title from './mixins/title'
import {
  Message
} from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Message);

Vue.mixin(title)

Vue.config.productionTip = false
//本地模拟数据-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
// import '../mock/global'
//ajax请求通用---------------------------------------------------------------------------------------------
import ajax_axios from "./util/ajax_axios"
Vue.prototype.$ajax_axios = ajax_axios //设置ajax请求全局变量

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp() {
  // 创建 router 和 store 实例
  const router = createRouter()
  const store = createStore()

  // 同步路由状态(route state)到 store
  sync(store, router)
  // sync(router)

  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    // 注入 router 到根 Vue 实例
    router,
    store,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })
  return {
    app,
    router,
    store
  }
}

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
