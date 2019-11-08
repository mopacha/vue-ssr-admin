//koa2服务详细配置
const Koa = require('koa')
const koaCompress = require('koa-compress')
const koaLog = require('koa-logger')
const path = require('path')
const static = require('koa-static')
const SSR = require('./ssr')
const currentIP = require('ip').address()
const appConfig = require('../app.config')

const middleware = require('./middleware/index')

const {
	miCookieParser,
	miLog,
	miProxy,
	miError
} = middleware


const uri = `http://${currentIP}:${appConfig.appPort}`

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

// vue ssr处理
SSR(app, uri)

// http代理中间件
app.use(miProxy())

console.log(`\n> Starting server... ${uri} \n`)

// 错误处理
app.on('error', (err) => {
	 console.error('Server error: \n%s\n%s ', err.stack || '')
})

app.listen(appConfig.appPort, '0.0.0.0')
