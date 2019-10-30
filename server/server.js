//koa2服务详细配置
const Koa = require('koa')
const koaCompress = require('koa-compress')()
const miLogger = require('koa-logger')()
const path = require('path')
const static = require('koa-static')

const miError = require('./middle/mi-error')
const miProxy = require('./middle/mi-proxy')
const SSR = require('./ssr')
const currentIP = require('ip').address()

const appConfig = require('../app.config')
const uri = `http://${currentIP}:${appConfig.appPort}`

// koa server
const app = new Koa()
// 中间件,
const middleWares = [
  // 打印请求与响应 日志
  miLogger,
  // 压缩响应
  koaCompress,
  // 错误处理
  miError
]
middleWares.forEach((middleware) => {
  if (!middleware) {
    return
  }
  app.use(middleware)
})


//设置静态资源请求目录和设置缓存
app.use(static(path.resolve(process.cwd(),'dist'), { maxAge: 30 * 24 * 60 * 60 * 1000, gzip: true }))
app.use(static(path.resolve(process.cwd(),'public')))

// vue ssr处理
SSR(app, uri)

// http代理中间件
app.use(miProxy())

console.log(`\n> Starting server... ${uri} \n`)

// 错误处理
app.on('error', (err) => {
  // console.error('Server error: \n%s\n%s ', err.stack || '')
})

app.listen(appConfig.appPort, '0.0.0.0')
