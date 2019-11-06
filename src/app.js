/*这是一个工厂函数导出app的实例*/
import '@babel/polyfill'
import Vue from 'vue'
import createRouter from './router/index'
import createI18n from './lang'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import * as filters from '@/util/filters'
import titleMixin from './util/title-mixin'
import '@/styles/index.scss' // global css
import '@/icons' // icon
import http from '@/util/http'
import { addRequestInterceptor, addResponseInterceptor } from '@/util/http'
import 'element-ui/lib/theme-chalk/index.css'
import element from '@/element-ui'
import ElementLocale from 'element-ui/lib/locale'
import { Message } from 'element-ui'

Object.keys(filters).forEach((key) => {
	Vue.filter(key, filters[key])
})

Vue.mixin(titleMixin)
// 注册插件
Vue.use(element)
Vue.use(http)

Vue.prototype.$ELEMENT = { size: 'medium', zIndex: 3000 }
Vue.prototype.$http = http
Vue.prototype.$message = Message
Vue.prototype.error = function (msg) {
	Message({ showClose: true, message: msg || '系统异常', type: 'error', duration: 4 * 1000 })
}
Vue.prototype.success = function (msg) {
	Message({ showClose: true, message: msg || '操作成功', type: 'success', duration: 3 * 1000 })
}

// request前自动添加api配置
addRequestInterceptor(
	config => {/*config.url = `/api${config.url}`	//统一加/api前缀*/return config },
	error => { return Promise.reject(error) }
)

// http 返回response前处理
addResponseInterceptor(
	response => {/*todo 在这里统一前置处理请求响应*/return Promise.resolve(response.data) },
	error => {/*todo 统一处理500、400等错误状态,这里reject下，交给entry-server.js的处理*/
		const { response, request } = error
		return Promise.reject({ status: response.status, data: response.data, method: request.method, path: request.path })
	}
)

export function createApp(store) {

	const router = createRouter(store) // <--- pass `store` to `createRouter` function
	const i18n = createI18n(store)

	ElementLocale.i18n((key, value) => i18n.t(key, value))
	sync(store, router)
	const app = new Vue({
		router,
		store,
		i18n,
		render: (h) => h(App)
	})

	return { app, router, store }
}
