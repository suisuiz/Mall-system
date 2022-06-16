/*
 * @Descripttion: 路由配置
 * @Author: SUI
 * @Date: 2022-05-12 09:23:13
 * @LastEditors: SUI
 * @LastEditTime: 2022-06-16 14:08:56
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