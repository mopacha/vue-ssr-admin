//运行于浏览器
import Vue from 'vue'
import { createApp } from './app'

import http from '@/util/http'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ easing: 'ease', speed: 500 })

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
	beforeRouteUpdate(to, from, next) {
		const { asyncData } = this.$options
		if (asyncData) {
			asyncData({ store: this.$store, route: to })
				.then(next)
				.catch(next)
		} else {
			next()
		}
	}
})

const { app, router, store } = createApp()

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
	store.replaceState(window.__INITIAL_STATE__)
	// 客户端和服务端保持一致
	//  store.state.$http = http
}


router.onReady(() => {
	router.beforeResolve((to, from, next) => {
		const matched = router.getMatchedComponents(to)
		const prevMatched = router.getMatchedComponents(from)

		// 我们只关心非预渲染的组件
		// 所以我们对比它们，找出两个匹配列表的差异组件
		// 同父不同子
		let diffed = false
		const activated = matched.filter((c, i) => {
			return diffed || (diffed = (prevMatched[i] !== c))
		})

		const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
		if (!asyncDataHooks.length) {
			return next()
		}
		// start progress
		NProgress.inc()
		// 这里如果有加载指示器(loading indicator)，就触发
		Promise.all(asyncDataHooks.map(hook => hook({ store, router, route: to })))
			.then(() => {
				// 停止加载指示器(loading indicator)
				NProgress.done()
				next()
			})
			.catch(next)
	})
	// 挂载vue实例
	app.$mount('#app')
})
