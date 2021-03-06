import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import { getToken } from '@/util/auth' // get token from cookie

//fix bug  Uncaught (in promise) NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)

export const constantRoutes = [
	{
		path: '/login',
		component: () => import('@/pages/login/index'),
		hidden: true
	},

	{
		path: '/404',
		component: () => import('@/pages/404'),
		hidden: true
	},

	{
		path: '/',
		component: Layout,
		redirect: '/home',
		children: [
			{
				path: 'home',
				name: 'home',
				component: () => import('@/pages/home/index'),
				meta: { title: 'home', icon: 'home' }
			}
		]
	},

	{
		path: '/batch',
		component: Layout,
		redirect: '/batch',
		children: [
			{
				path: '',
				name: 'batch',
				component: () => import('@/pages/batch/index'),
				meta: { title: 'batchManagement', icon: 'batch' }
			}
		]
	},

	{
		path: '/orgchart',
		component: Layout,
		redirect: '/orgchart',
		children: [
			{
				path: '',
				name: 'orgchart',
				component: () => import('@/pages/orgchart/index'),
				meta: { title: 'orgChart', icon: 'batch' }
			}
		]
	},
	/*
	{
		path: '/echart',
		component: Layout,
		redirect: '/echart',
		children: [
			{
				path: '',
				name: 'echart',
				component: () => import('@/pages/echart/index'),
				meta: { title: 'echart', icon: 'batch' }
			}
		]
	},*/
	// 404 page must be placed at the end !!!
	{ path: '*', redirect: '/404', hidden: true }
]

export default store => {
	const router = new Router({
		mode: 'history',
		scrollBehavior(to, from, savedPosition) {
			return { x: 0, y: 0 }
		},
		routes: constantRoutes
	})

	router.beforeEach((to, from, next) => {
		// In the client side get the state from window.__INITIAL_STATE__.
		// Because it's not available in client side store at this moment.
		//const { user } = process.browser ? window.__INITIAL_STATE__ : store.state;
		const _token = process.browser ? getToken() : store.state.user.token

		function handleAuth(token) {
			if (token) {
				next()
			} else {
				if (to.path == '/login') {
					//如果是登录页面路径，就直接next()
					next()
				} else {
					//不然就跳转到登录；
					next('/login')
				}
			}
		}
		return handleAuth(_token)

		// if (to.matched.some(record => record.meta.requiresAuth)) {
		//		return handleAuth(store.state.token);
		// } else {
		//   return next()
		// }
	})

	router.afterEach(route => {
		/*todo*/
	})

	return router
}
