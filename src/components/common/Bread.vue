<!--
 * @Descripttion: 面包屑组件
 * @Author: SUI
 * @Date: 2022-05-12 09:23:13
 * @LastEditors: SUI
 * @LastEditTime: 2022-08-26 14:42:02
 * @FilePath: \Mall-system\src\components\common\Bread.vue
-->
<template>
  <div class="breadcrumb">
    <!-- 面包屑组件 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ breadTitle.one }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ breadTitle.two }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Bread',

  // 父子传值
  props: {
    title: { default: true },
  },

  data() {
    return {
      breadTitle: this.title,
    }
  },

  // 监听值的改变
  watch: {
    title(newVal) {
      this.title = newVal
    },
  },
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin-bottom: 15px;
}
</style>
