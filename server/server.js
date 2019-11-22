/*
 * @Description:koa2服务详细配置
 * @Autor: ZFY
 * @Date: 2019-11-11 14:47:35
 * @LastEditTime: 2019-11-15 17:19:42
 */

const Koa = require('koa')
const koaCompress = require('koa-compress')
//const koaLog = require('koa-logger')
const path = require('path')
const static = require('koa-static')
const SSR = require('./ssr')
const address = require('ip').address()
const appConfig = require('../app.config')
const middleware = require('./middleware/index')
const router = require('koa-router')()
const symbols = require('log-symbols')
const chalk = require('chalk')
const print = require('./utils/print')

const KOA_PORT = appConfig.appPort

const {
	miCookieParser,
	miLog,
	miProxy,
	miError
} = middleware

// koa server
const app = new Koa()

app.use(miError) // 错误处理

app.use(miCookieParser())
// 中间件
app.use(miLog())
//app.use(koaLog()) // 打印请求与响应 日志
app.use(koaCompress()) // 压缩响应


//设置静态资源请求目录和设置缓存
app.use(static(path.resolve(process.cwd(), 'dist'), { maxAge: 30 * 24 * 60 * 60 * 1000, gzip: true }))
app.use(static(path.resolve(process.cwd(), 'public')))

router.get('/hs', function (ctx, next) {
  ctx.body = 'OK'
})

app.use(router.routes()).use(router.allowedMethods())

// vue ssr处理
SSR(app, address)

// http代理中间件
app.use(miProxy())

// 错误处理
app.on('error', (err) => {
	console.error('Server error: \n%s\n%s ', err.stack || '')
})

app.listen(KOA_PORT, () => {
	print.bastet()
	console.log(symbols.success, chalk.green(`server on: http://${address}:${KOA_PORT}`))
})

