// 服务器 entry 使用 default export 导出函数，并在每次渲染中重复调用此函数。
// 此时，除了创建和返回应用程序实例之外，它不会做太多事情 - 
// 但是稍后我们将在此执行服务器端路由匹配(server-side route matching)和数据预取逻辑(data pre-fetching logic)。

import {
  createApp
} from './main'

export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  //   const { app } = createApp()
  //   return app
  console.log('catch---------context----s----------------------entry-server---------------------------');
  console.log(context);
  console.log('catch---------context----e----------------------entry-server---------------------------');
  return new Promise((resolve, reject) => {
    const {
      app,
      router,
      store
    } = createApp()
    console.log('catch---------app----s----------------------entry-server---------------------------');
    console.log(app);
    console.log('catch---------app----e----------------------entry-server---------------------------');
    console.log('catch---------router----s----------------------entry-server---------------------------');
    console.log(router);
    console.log('catch---------router----e----------------------entry-server---------------------------');
    console.log('catch---------store----s----------------------entry-server---------------------------');
    console.log(store);
    console.log('catch---------store----e----------------------entry-server---------------------------');

    // 设置服务器端 router 的位置
    // router.push(context.url)
    const {
      url
    } = context
    const {
      fullPath
    } = router.resolve(url).route
    console.log('catch---------url----s----------------------entry-server---------------------------');
    console.log(url);
    console.log('catch---------url----e----------------------entry-server---------------------------');
    console.log('catch---------fullPath----s----------------------entry-server---------------------------');
    console.log(fullPath);
    console.log('catch---------fullPath----e----------------------entry-server---------------------------');
    if (url !== fullPath) {
      reject({
        url: fullPath
      })
    }

    // set router's location
    router.push(url)

    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      console.log('catch---------matchedComponents----s----------------------entry-server---------------------------');
      console.log(matchedComponents);
      console.log('catch---------matchedComponents----e----------------------entry-server---------------------------');
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({
          code: 404
        })
      }

      // Promise 应该 resolve 应用程序实例，以便它可以渲染
      // resolve(app)
      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map(Component => {
        console.log('catch---------Component----s----------------------entry-server---------------------------');
        console.log(Component);
        console.log('catch---------Component----e----------------------entry-server---------------------------');
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state
        console.log('catch---------context.state----s----------------------entry-server---------------------------');
        console.log(context.state);
        console.log('catch---------context.state----e----------------------entry-server---------------------------');

        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
