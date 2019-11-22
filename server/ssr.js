/*
 * @Description: vue ssr的koa2中间件。匹配路由、请求接口生成dom，实现SSR
 * @Autor: ZFY
 * @Date: 2019-11-11 14:47:35
 * @LastEditTime: 2019-11-22 10:51:52
 */

const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const { createBundleRenderer } = require('vue-server-renderer')
const isProd = process.env.NODE_ENV === 'production'
const devHot = require('./dev-hot')
const appConfig = require('../app.config')

const cheerio = require('cheerio')

const proxyConfig = appConfig.proxy

module.exports = function (app, uri) {
	const renderData = (ctx, renderer) => {
		//ctx.log.debug(`把cookie 注入到 context 中:`, ctx.cookie)
		const context = {
			url: ctx.url,
			title: 'Vue-SSR',
			cookie: ctx.cookie //把cookie 注入到 context 中
		}
		return new Promise((resolve, reject) => {
			//renderer.renderToString 开始执行行entry-erver.js
			renderer.renderToString(context, (err, html) => {
				if (err) {
					ctx.log.debug(`renderToString:`, err)
					return reject(err)
				}
				const svgContent = context.svgContent
				const $ = cheerio.load(html)
				$('body').prepend(svgContent)
				resolve($.html())
			})
		})
	}

	function createRenderer(bundle, options) {
		return createBundleRenderer(bundle, Object.assign(options, {
			cache: LRU({
				max: 1000,
				maxAge: 1000 * 60 * 15
			}),
			runInNewContext: false
		}))
	}

	function resolve(dir) {
		return path.resolve(process.cwd(), dir)
	}

	let renderer
	if (isProd) {
		// prod mode
		const template = fs.readFileSync(resolve(`dist${appConfig.staticPath}/index.html`), 'utf-8')
		const bundle = require(resolve(`dist${appConfig.staticPath}/vue-ssr-server-bundle.json`))
		const clientManifest = require(resolve(`dist${appConfig.staticPath}/vue-ssr-client-manifest.json`))
		renderer = createRenderer(bundle, {
			template,
			clientManifest
		})
	} else {
		// dev mode
		devHot(app, uri, (bundle, options) => {
			try {
				renderer = createRenderer(bundle, options)
			} catch (e) {
				console.log('\nbundle error', e)
			}
		}
		)
	}
	app.use(async (ctx, next) => {
		if (!renderer) {
			ctx.type = 'html'
			return ctx.body = '编译中...稍后刷新页面...';
		}
		if (Object.keys(proxyConfig).findIndex(vl => ctx.url.startsWith(vl)) > -1) {
			return next()
		}
		let html, status
		try {
			status = 200
			html = await renderData(ctx, renderer)
		} catch (e) {
			if (e.status === 404) {
				status = 404
				html = '404 | Not Found'
			} else if (e.status === 401) {
				status = 401
				return ctx.redirect('/login')
			} else {
				status = 500
				html = '500 | Internal Server Error'
			}
		}
		ctx.type = 'html'
		ctx.status = status ? status : ctx.status
		ctx.body = html
	})
}
