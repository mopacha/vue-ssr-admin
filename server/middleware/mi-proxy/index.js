/**
 * http代理中间件 匹配代理、请求重定向
 * 获取app.config.js配置文件，匹配proxy
 */
const urlUtils = require('url')
const koaHttpProxy = require('koa-better-http-proxy')
const compose = require('koa-compose')
const appConfig = require('../../../app.config')

const isProd = process.env.NODE_ENV === 'production'

/**
 * 代理处理中间件
 * @return {Function} koa middleware
 */
module.exports = () => {
	async function preProxyMiddleware(ctx, next) {
		const url = ctx.url
		ctx.log.info(`Request '${url}'`)
		let proxyTarget
		let proxyConfig = appConfig.proxy
		// 在appConfig.proxy中寻找匹配前缀的代理
		for (const [prefix, target] of Object.entries(proxyConfig)) {
			if (url.startsWith(prefix)) {
				// 匹配替换
				ctx.url = url.replace(prefix, '')
				proxyTarget = target
				ctx._proxyTarget = proxyTarget
				ctx.log.info(`Match to proxy: '${prefix}' => '${proxyTarget}'`)
				break
			}
		}
		if (!proxyTarget) {
			ctx.log.info('Proxy not found')
			return Promise.resolve()
		}
		ctx.log.info(`Will be Agent to '${proxyTarget + ctx.url}'`)
		return next()
	}

  /**
   * 顺序执行async函数
   */
	return compose([
		preProxyMiddleware,
		koaHttpProxy((ctx) => { return ctx._proxyTarget }, {
			// 不解析body，不限制body大小
			parseReqBody: false,
			/**
			 * 发出代理请求前的回调,更改头文件
			 * @param {Object} proxyReqOpts - 代理请求选项
			 * @param {ctx} ctx - koa ctx
			 * @return {Promise.<*>} *
			 */
			async proxyReqOptDecorator(proxyReqOpts, ctx) {
				const parsedTarget = urlUtils.parse(ctx._proxyTarget, true)
			//	ctx.log.debug("parsedTarget", parsedTarget)
				proxyReqOpts.host = parsedTarget.hostname
				proxyReqOpts.port = parsedTarget.port
				proxyReqOpts.https = parsedTarget.protocol === 'https:'

				ctx.log.debug('proxyReqOpts.headers.cookie>>>>>>>>>>>:',proxyReqOpts.headers.cookie)
				// 去掉Referer头，否则可能会造成CSRF问题，影响开发
				if (!isProd) {
					delete proxyReqOpts.headers.Referer
					delete proxyReqOpts.headers.Origin
				}
				// 计时开始
				ctx._proxyStartTime = Date.now()

				//console.log(proxyReqOpts)
				return proxyReqOpts
			},
			/**
			 * 代理请求被响应后的回调
			 * @param {Response} proxyRes - 代理请求选项
			 * @param {Object} proxyResData - 响应数据
			 * @param {ctx} ctx - koa ctx
			 * @return {Promise.<*>} *
			 */
			async userResDecorator(proxyRes, proxyResData, ctx) {
				//ctx.log.info('ProxyRes headers:', '\n', JSON.stringify(ctx.response.headers, null, 2))
				const location = `${ctx._proxyTarget}${ctx.url}`
				ctx.log.debug(`Proxy request '${location}' completed(${proxyRes.statusCode}), costing ${Date.now() - ctx._proxyStartTime}ms.`)

				ctx.log.info(`Response is : ${proxyResData}`)

				return proxyResData
			}
		})
	])
}
