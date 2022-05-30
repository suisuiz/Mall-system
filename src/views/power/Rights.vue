<!--
 * @Descripttion: 权限列表
 * @Author: SUI
 * @Date: 2022-05-29 18:13:16
 * @LastEditors: SUI
 * @LastEditTime: 2022-05-30 18:39:10
 * @FilePath: \Mall-system\src\views\power\Rights.vue
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <Bread :title="breadTitle"></Bread>
  </div>
</template>

<script>
// 引入面包屑
import Bread from '@/components/common/Bread'
export default {
  name: 'Rights',
  components: {
    Bread
  },
  data() {
    return {
      // 面包屑标题
      breadTitle: {
        one: '权限管理',
        two: '权限列表'
      }
    }
  },

  created() {},

  methods: {}
}
</script>

<style scoped></style>
