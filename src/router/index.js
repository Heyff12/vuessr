import Vue from 'vue'
import Router from 'vue-router'

const HelloWorld = () =>
    import ("@/components/HelloWorld");
const page1 = () =>
    import ("@/components/page1");
const page2 = () =>
    import ("@/components/page2");

Vue.use(Router)

export function createRouter() {
  return new Router({
      mode: 'history',
      scrollBehavior: () => ({ y: 0 }),
      routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
          },
          {
            path: '/page1',
            name: 'page1',
            component: page1
          },
          {
            path: '/page2',
            name: 'page2',
            component: page2
          }
      ]
  })
}

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     },
//     {
//       path: '/page1',
//       name: 'page1',
//       component: page1
//     },
//     {
//       path: '/page2',
//       name: 'page2',
//       component: page2
//     }
//   ]
// })
