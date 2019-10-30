/*这是一个工厂函数导出app的实例*/
import '@babel/polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import createRouter from './router/index'
import App from './App.vue'
import createStore from './store/index'
import { sync } from 'vuex-router-sync'
import * as filters from '@/util/filters'
import titleMixin from './util/title-mixin'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import '@/icons' // icon
import http from '@/util/http'
import { addRequestInterceptor, addResponseInterceptor } from '@/util/http'

Object.keys(filters).forEach((key) => {
	Vue.filter(key, filters[key])
})

Vue.mixin(titleMixin)
// 注册插件
Vue.use(ElementUI, { size: 'small' })
Vue.use(http)
Vue.prototype.$http = http

// request前自动添加api配置
addRequestInterceptor(
	(config) => {
		/*统一加/api前缀*/
		config.url = `/api${config.url}`
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// http 返回response前处理
addResponseInterceptor(
	(response) => {
		/*todo 在这里统一前置处理请求响应 */
		return Promise.resolve(response.data)
	},
	(error) => {
    /*
    * todo 统一处理500、400等错误状态
    * 这里reject下，交给entry-server.js的处理
    */
		const { response, request } = error
		return Promise.reject({ code: response.status, data: response.data, method: request.method, path: request.path })
	}
)

export function createApp() {
	const router = createRouter()
	const store = createStore()

	sync(store, router)
	const app = new Vue({
		router,
		store,
		render: (h) => h(App)
	})
	return { app, router, store }
}
