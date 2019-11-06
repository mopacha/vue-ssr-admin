//运行于浏览器
import Vue from 'vue'
import { createApp } from './app'
import createStore from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style
import { Message } from 'element-ui'
import { getErrMsg } from '@/util/errorMap'

const showError = msg => {
	Message({
		showClose: true,
		message: msg,
		type: 'error',
		duration: 3.5 * 1000
	})
}

NProgress.configure({ easing: 'ease', speed: 500 })

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
	beforeRouteUpdate(to, from, next) {
		const { asyncData } = this.$options
		if (asyncData) {
			asyncData({ store: this.$store, route: to }).then(next).catch(next)
		} else {
			next()
		}
	}
})

const store = createStore()
// 将服务端渲染时候的状态写入vuex中
if (window.__INITIAL_STATE__) {
	store.replaceState(window.__INITIAL_STATE__)
}

const { app, router } = createApp(store)

router.onReady((currentRoute) => {
	// node报错时前端路由重渲染(非401状态， 401已经在服务端重定向)
	function feCompatibleRende(route) {
		let matched = router.getMatchedComponents(route)
		console.log('客户端重新AJAX')
		Promise.all(matched.map(c => {
			if (c.asyncData) {
				return c.asyncData({ store, router, route })
			}
		})).then(() => { }).catch((e) => {
			const status = e.status
			const errMsg = getErrMsg(status)
			showError(errMsg)
		})
	}

	if (window.__INITIAL_STATE__.serverError) {
		feCompatibleRende(currentRoute)
	}

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
			.catch((e) => {
				NProgress.done()
				const status = e.status
				if (status === 401) {
					next('/login')
				} else {
					const errMsg = getErrMsg(status)
					showError(errMsg)
					next()
				}
			})
	})
	// 挂载vue实例
	app.$mount('#app')
})
