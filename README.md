# vuessr

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# 服务端渲染--本地开发
npm run server

# 服务端渲染--服务端
npm run build-ssr
npm run start-ssr
```


## 备注
1、修复asyncData 获取数据失败--刷新页面时，没有数据——————————在actions获取数据的链接必须填写完整，否则默认80端口  
2、mockjs只有在捕获到请求时才能生成数据 



For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
