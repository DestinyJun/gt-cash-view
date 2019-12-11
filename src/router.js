import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routes = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: '登陆',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/mchart',
      name: '商户图表统计',
      component: () => import('@/views/mChart/MChart.vue')
    },
    {
      path: '/schart',
      name: '服务区图表统计',
      component: () => import('@/views/sChart/SChart.vue')
    },
    {
      path: '/merchant',
      name: '服务区图表统计',
      component: () => import('@/views/Merchant/Merchant.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('@/views/error/error.vue')
    },
    {
      path: '**',
      redirect: '/login'
    }
  ]
})
routes.beforeEach((to, from, next) => {
  const arr = ['/login', '/error']
  if (arr.includes(to.path)) {
    next(true)
  } else if (Vue.localStorage.get('APPKEY')) {
    next()
  } else {
    next({ path: '/error' })
  }
})
export default routes
