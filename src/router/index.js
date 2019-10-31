import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

//fix bug  Uncaught (in promise) NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
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
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/pages/home/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },

	{
    path: '/orgchart',
    component: Layout,
    children: [
      {
        path: 'orgchart',
        name: 'Orgchart',
        component: () => import('@/pages/orgchart/index'),
        meta: { title: '策略详情', icon: 'strategy' }
      }
    ]
	},

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


export default () => {
    const router = new Router({
        mode: 'history',
        scrollBehavior(to, from, savedPosition) {
            return { x: 0, y: 0 }
        },
        routes: constantRoutes
    })
    return router
}
