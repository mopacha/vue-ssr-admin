/*
 * @Description: 这是一个工厂函数导出app的实例
 * @Autor: ZFY
 * @Date: 2019-11-11 14:47:35
 * @LastEditTime: 2019-11-15 17:17:56
 */

import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import createRouter from './router/index'
import createI18n from './lang'
import { sync } from 'vuex-router-sync'
import ElementLocale from 'element-ui/lib/locale'
import '@/config'
import '@/styles/index.scss' // global css
import '@/icons' // icon

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
