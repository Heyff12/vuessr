/* eslint-disable consistent-return */
const router = require('koa-router')()
const LRU = require('lru-cache')
const View = require('./View')

const isProd = process.env.NODE_ENV === 'production'

const useMicroCache = process.env.MICRO_CACHE !== 'false'
const cacheUrls = ['/', '/page1', '/page2']
console.log('useMicroCache-------------' + useMicroCache + '-------------------router------------------------------');

const isCacheable = ctx => cacheUrls.indexOf(ctx.url) >= 0 && useMicroCache

const microCache = LRU({
  max: 100,
  maxAge: 1200
})

module.exports = function (app) {
  // create vue renderer instance
  const view = new View(app)
  console.log('catch---------view----s---------------------router----------------------------');
  console.log(view);
  console.log('catch---------view----e---------------------router----------------------------');

  async function render(ctx, next) {
    console.log('catch---------ctx----s---------------------router----------------------------');
    console.log(ctx);
    console.log('catch---------ctx----e---------------------router----------------------------');
    // render middleware
    ctx.type = 'html'

    const {
      PassThrough
    } = require('stream')
    ctx.body = new PassThrough()
    console.log('catch---------view.renderer----s------------router-------------------------------------');
    console.log(view.renderer);
    console.log('catch---------view.renderer----e-------------router------------------------------------');

    if (!view.renderer) {
      ctx.body.end('waiting for compilation... refresh in a moment.')
      return
    }

    // hit micro cache
    const cacheable = isCacheable(ctx)
    console.log('cacheable-------------' + cacheable + '---------------router----------------------------------');
    if (cacheable) {
      const html = microCache.get(ctx.url)
      console.log('catch---------html----s----------------------router---------------------------');
      console.log(html);
      console.log('catch---------html----e----------------------router---------------------------');
      if (html) {
        ctx.set('X-Cache-Hit', '1')
        ctx.body.end(html)
        return
      }
    }

    function handleError(error) {
      // console.error('RENDER ERROR', error)
      if (error.url) {
        // fixed stream.push after EOF
        return ctx.redirect(error.url)
      } else if (error.code === 404) {
        ctx.status = 404
        ctx.body.end('404 | Page Not Found')
      } else {
        // Render Error Page or Redirect
        ctx.status = 500
        ctx.body.end('500 | Internal Server Error')
        console.error(`error during render : ${ctx.url}`)
        // console.error(error.stack)
      }
    }

    function handleEnd(content) {
      if (cacheable) {
        // set micro cache
        microCache.set(ctx.url, content)
      }
      ctx.body.end(content)
    }

    try {
      const context = {
        title: 'vuessr测试',
        url: ctx.url,
        meta: `
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            <meta name="description" content="Vue.js - The Progressive JavaScript Framework">
          `
      }
      const content = await view.render(context)
      console.log('catch---------content----s------------------------router-------------------------');
      console.log(content);
      console.log('catch---------content----e----------------------router---------------------------');
      handleEnd(content)
    } catch (error) {
      console.log('catch---------error----s------------------------router-------------------------');
      console.log(error);
      console.log('catch---------error----e-----------------------router--------------------------');
      handleError(error)
    }
  }

  //接口返回数据
  const list = require('./api/list')
  router.get('/vuessr/v1/list/info', list.info);


  // Not matched /api uri
  router.get(/^(?!\/api)(?:\/|$)/, isProd ? render : (ctx, next) => {
    view.ready.then(() => render(ctx, next))
  })
  

  return router
}
