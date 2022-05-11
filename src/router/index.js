/*
 * @Descripttion: 路由配置
 * @Author: SUI
 * @Date: 2021-08-14 17:41:47
 * @LastEditors: SUI
 * @LastEditTime: 2021-08-24 01:17:29
 * @FilePath: \Mall-system\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    // 重定向
    redirect: '/login'
  },
  {
    path: '/login',
    // 路由懒加载
    component: () => import('@/components/home/Login'),
    meta: {
      name: '登录'
    }
  },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    // 重定向
    redirect: '/welcome',
    children: [{
        path: '/welcome',
        component: () => import('@/components/home/Welcome')
      },
      {
        path: '/users',
        component: () => import('@/views/user/Users')
      },
      {
        path: '/roles',
        component: () => import('@/views/power/Roles')
      },
      {
        path: '/rights',
        component: () => import('@/views/power/Rights')
      },
      {
        path: '/goods',
        component: () => import('@/views/goods/Goods')
      },
      {
        path: '/goods/add',
        component: () => import('@/views/goods/Add')
      },
      {
        path: '/params',
        component: () => import('@/views/goods/Params')
      },
      {
        path: '/categories',
        component: () => import('@/views/goods/Cate')
      },
      {
        path: '/orders',
        component: () => import('@/views/order/Orders')
      },
      {
        path: '/reports',
        component: () => import('@/views/report/Reports')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // from代表从哪里来，to代表去的路径，next放行函数
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router