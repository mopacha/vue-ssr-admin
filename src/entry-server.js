/*
 * @Description:运行于服务器
 * @Autor: ZFY
 * @Date: 2019-11-11 14:47:36
 * @LastEditTime: 2019-11-22 10:32:43
 */


import { createApp } from './app'
import createStore from './store'
// 引入http请求
import http from '~http'
import getSvgContent from '@/util/svg-spirate'

export default (context) => {
	return new Promise((resolve, reject) => {
		const store = createStore()
		const { url } = context
		const cookie = context.cookie

		//beforEach 前更新store
		if (cookie) {
			const {
				vue_ssr_token = '',
				language = '',
				name = ''
			} = cookie
			store.state.user.token = vue_ssr_token 	//更新token
			store.state.app.language = language 	// 更新language
			store.state.user.name = name
		}

		const { app, router } = createApp(store)  // 注意:放在store更新之后

		context.svgContent = getSvgContent() // 把svg-symbol 交给server-render

		router.push(url)

		//等到 router 将可能的异步组件和钩子函数解析完
		router.onReady(() => {
			const matcheds = router.getMatchedComponents()
			// 匹配不到的路由，执行 reject 函数，并返回 40
			if (!matcheds.length) {
				return reject({ code: 404 })
			}

			// http注入到rootState 和store上，方便store 里和.vue组件中调用
			store.$http = store.state.$http = http(cookie)

			// 使用Promise.all执行匹配到的Component的asyncData方法，即预取数据
			Promise.all(matcheds.map(Component => {
				if (Component.asyncData) {
					return Component.asyncData({
						store,
						router,
						route: router.currentRoute,
					})
				}
			}))
				.then(() => {
					// 在所有预取钩子(preFetch hook) resolve 后，
					// 我们的 store 现在已经填充入渲染应用程序所需的状态。
					// 当我们将状态附加到上下文，
					// 并且 `template` 选项用于 renderer 时，
					// 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
					context.state = Object.assign(store.state, { serverError: false })
					resolve(app)
				}).catch(err => {
					// 交给服务端重定向
					if (err.status === 401) {
						reject(err)
					}
					console.log('erntry-server.js::::::>>>', err)
					//增加服务端预渲染错误标识，前端拿到标志后重新渲染
					context.state = Object.assign(store.state, { serverError: true })
					//最后，将服务端vue实例正常返回，避免抛500
					resolve(app)
				})
		}, reject)
	})
}
