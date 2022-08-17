/*
 * @Descripttion: 路由配置
 * @Author: SUI
 * @Date: 2022-05-12 09:23:13
 * @LastEditors: SUI
 * @LastEditTime: 2022-08-17 18:07:53
 * @FilePath: \Mall-system\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

// 实现路由懒加载
const Login = () => import(/* webpackChunkName: "Login_Welcome_Users" */ '@/components/home/Login')
const Home = () => import(/* webpackChunkName: "Login_Welcome_Users" */ '@/views/Home')
const Welcome = () => import(/* webpackChunkName: "Login_Welcome_Users" */ '@/components/home/Welcome')

const Users = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '@/views/user/Users')
const Roles = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '@/views/power/Roles')
const Rights = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '@/views/power/Rights')

const Goods = () => import(/* webpackChunkName: "Add_Goods" */ '@/views/goods/Goods')
const Add = () => import(/* webpackChunkName: "Add_Goods" */ '@/views/goods/Add')

const Params = () => import(/* webpackChunkName: "Cate_Params" */ '@/views/goods/Params')
const Cate = () => import(/* webpackChunkName: "Cate_Params" */ '@/views/goods/Cate')

const Orders = () => import(/* webpackChunkName: "Order_Report" */ '@/views/order/Orders')
const Reports = () => import(/* webpackChunkName: "Order_Report" */ '@/views/report/Reports')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // 重定向
    redirect: '/login',
  },
  {
    path: '/login',
    // 路由懒加载
    // component: () => import('@/components/home/Login'),
    component: Login,
    meta: {
      name: '登录',
    },
  },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    // 重定向
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: () => import('@/components/home/Welcome'),
      },
      {
        path: '/users',
        component: () => import('@/views/user/Users'),
      },
      {
        path: '/roles',
        component: () => import('@/views/power/Roles'),
      },
      {
        path: '/rights',
        component: () => import('@/views/power/Rights'),
      },
      {
        path: '/goods',
        component: () => import('@/views/goods/Goods'),
      },
      {
        path: '/goods/add',
        component: () => import('@/views/goods/Add'),
      },
      {
        path: '/params',
        component: () => import('@/views/goods/Params'),
      },
      {
        path: '/categories',
        component: () => import('@/views/goods/Cate'),
      },
      {
        path: '/orders',
        component: () => import('@/views/order/Orders'),
      },
      {
        path: '/reports',
        component: () => import('@/views/report/Reports'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
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
