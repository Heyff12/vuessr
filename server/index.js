// 安装文件
// npm install --save-dev koa koa-favicon koa-compress koa-logger bluebird chalk koa-router lru-cache koa-static zlib memory-fs shelljs webpack extract-text-webpack-plugin sw-precache-webpack-plugin webpack-node-externals
// webpack-hot-middleware
/* eslint-disable import/no-unresolved */
const path = require('path')
const Koa = require('koa')
const favicon = require('koa-favicon')
const compression = require('koa-compress')
const logger = require('koa-logger')
const bluebird = require('bluebird')
const chalk = require('chalk')

global.Promise = bluebird

const isProd = process.env.NODE_ENV === 'production'
console.log('isProd-------------'+isProd+'------------------------------index-------------------');

const rootPath = path.resolve(__dirname, '../')

const resolve = file => path.resolve(rootPath, file)

// create koa instance
const app = new Koa()

const router = require('./router')(app)
console.log('catch---------router----s------------------------index-------------------------');
console.log(router);
console.log('catch---------router----e------------------------index-------------------------');

// cache static
const serve = (filepath, cache) => require('koa-static')(resolve(filepath), {
  maxage: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

app.use(logger())
app.use(compression({
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))
app.use(favicon('./public/favicon.ico'))
app.use(serve('public', true))
app.use(serve('dist', true))
console.log('catch---------serve("public", true)----s---------------------index----------------------------');
console.log(serve('public', true));
console.log('catch---------serve("public", true)----e----------------------index---------------------------');
console.log('catch---------serve("dist", true)----s------------------------index-------------------------');
console.log(serve('dist', true));
console.log('catch---------serve("dist", true)----e------------------------index-------------------------');

app.use(router.routes()).use(router.allowedMethods())
console.log('catch---------router.routes()----s--------------------------index-----------------------');
console.log(router.routes());
console.log('catch---------router.routes()----e----------------------------index---------------------');
console.log('catch---------router.allowedMethods()----s--------------------index-----------------------------');
console.log(router.allowedMethods());
console.log('catch---------router.allowedMethods()----e----------------------index---------------------------');


// page not found
app.use((ctx, next) => {
  ctx.type = 'html'
  ctx.body = '404 | Page Not Found'
})

const port = process.env.PORT || 9090
app.listen(port, '127.0.0.1', () => {
  console.log('\n--------- Started ---------')
  console.log(chalk.bold('NODE_ENV:'), chalk.keyword('orange').bold(process.env.NODE_ENV || 'development'))
  const url = `http://127.0.0.1:${port}`
  console.log(chalk.bold('SERVER:'), chalk.blue.bold(url))
  console.log('---------------------------\n')
})
