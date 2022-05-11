/*
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2022-05-09 12:12:01
 * @LastEditors: SUI
 * @LastEditTime: 2022-05-11 18:13:26
 * @FilePath: \Mall-system\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
// 引入 路由
import router from './router'
// 引入 Vuex
import store from './store'

// 按需引入 element
import './plugins/element'

// 引入 axios API
import api from "./api/index";

// 统一出口挂载Vue原型上
Vue.prototype.$api = api;

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')