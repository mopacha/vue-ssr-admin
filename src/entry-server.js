//运行于服务器
import {createApp} from './app'
import http from '@/util/http'
// 处理ssr期间cookies穿透
import { setCookies } from '@/util/http'

export default (context) => {
	return new Promise((resolve,reject) => {
		const {app,router,store} = createApp()
		const { url } = context
		
		// 设置服务器端 router 的位置
		router.push(url)
		
		router.onReady(() => {
			const matcheds = router.getMatchedComponents()
			if (!matcheds.length) {
				return reject({code:404})
			}
			// SSR期间同步cookies
			setCookies(context.cookies || {})
			// http注入到rootState上，方便store里调用
		//	store.state.$http = http

			Promise.all(matcheds.map(component => {
				if (component.asyncData) {
					return component.asyncData({
							store,
							route: router.currentRoute
					})
				}
			})).then(() =>{
				// 在所有预取钩子(preFetch hook) resolve 后，
				// 我们的 store 现在已经填充入渲染应用程序所需的状态。
				// 当我们将状态附加到上下文，
				// 并且 `template` 选项用于 renderer 时，
				// 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
				context.state = store.state
				resolve(app)
			}).catch(reject)
		},reject)
	})
}