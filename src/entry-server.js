//运行于服务器
import { createApp } from './app'
import createStore from './store'
import http from '@/util/http'
// 处理ssr期间cookies穿透
import { setCookies } from '@/util/http'

export default (context) => {
	return new Promise((resolve, reject) => {
		const store = createStore()
		const { app, router } = createApp(store)
		const { url } = context

		// beforEach 前更新store的token
		if (context.cookie && context.cookie['vue_ssr_token']) {
			store.state.user.token = context.cookie['vue_ssr_token']
		} else {
			store.state.user.token = ''
		}

		router.push(url)

		//等到 router 将可能的异步组件和钩子函数解析完
		router.onReady(() => {
			const matcheds = router.getMatchedComponents()

			// 匹配不到的路由，执行 reject 函数，并返回 40
			if (!matcheds.length) {
				return reject({ code: 404 })
			}
			// SSR期间同步cookies
			setCookies(context.cookie || {})
			// http注入到rootState上，方便store里调用
			// store.state.$http = http
			// 使用Promise.all执行匹配到的Component的asyncData方法，即预取数据
			Promise.all(matcheds.map(({ asyncData }) => asyncData && asyncData({
				store,
				router,
				route: router.currentRoute,
			}))).then(() => {
				// 在所有预取钩子(preFetch hook) resolve 后，
				// 我们的 store 现在已经填充入渲染应用程序所需的状态。
				// 当我们将状态附加到上下文，
				// 并且 `template` 选项用于 renderer 时，
				// 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
				context.state = store.state
				resolve(app)
			}).catch(reject)
		}, reject)
	})
}
