// 客户端 entry 只需创建应用程序，并且将其挂载到 DOM 中：

import Vue from 'vue'
import {
  createApp
} from './main'

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const {
      asyncData
    } = this.$options
    console.log('catch---------asyncData----s----------------------entry-client---------------------------');
    console.log(asyncData);
    console.log(this.$store);
    console.log(to);
    console.log(from);
    console.log('catch---------asyncData----e----------------------entry-client---------------------------');
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

// 客户端特定引导逻辑……

// const { app } = createApp()
const {
  app,
  router,
  store
} = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
// 这里假定 App.vue 模板中根元素具有 `id="app"`
// app.$mount('#app')
router.onReady(() => {
  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    console.log('catch---------matched----s----------------------entry-client---------------------------');
    console.log(matched);
    console.log('catch---------matched----e----------------------entry-client---------------------------');
    console.log('catch---------prevMatched----s------------------entry-client-------------------------------');
    console.log(prevMatched);
    console.log('catch---------prevMatched----e------------------entry-client-------------------------------');

    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      console.log('catch---------c----s----------------entry-client---------------------------------');
      console.log(c);
      console.log(prevMatched[i]);
      console.log('catch---------c----e----------------entry-client---------------------------------');
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    console.log('catch---------activated----s----------------entry-client---------------------------------');
    console.log(activated);
    console.log(activated.length);
    console.log('catch---------activated----e----------------entry-client---------------------------------');

    if (!activated.length) {
      return next()
    }

    // 这里如果有加载指示器(loading indicator)，就触发

    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({
          store,
          route: to
        })
      }
    })).then(() => {
      // 停止加载指示器(loading indicator)
      next()
    }).catch(next)
  })
  app.$mount('#app')
})

// service worker
if (window.location.protocol === 'https:' && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}
