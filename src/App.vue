<!--
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2022-05-09 12:12:01
 * @LastEditors: SUI
 * @LastEditTime: 2022-05-13 18:24:55
 * @FilePath: \Mall-system\src\App.vue
-->
<template>
  <div id="app">
    <!-- 路由 -->
    <router-view />
  </div>
</template>

<style lang="scss">
// 引入样式
@import 'assets/normalize.css';
@import 'assets/index.scss';
@import 'assets/common.scss';

#app {
  font: 12px Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, '\5B8B\4F53', sans-serif;
  color: #333;
  // width: 100%;
  height: 100%;
  min-width: 1370px;
}
</style>
