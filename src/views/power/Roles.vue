<!--
 * @Descripttion: 角色列表
 * @Author: SUI
 * @Date: 2022-05-29 18:13:04
 * @LastEditors: SUI
 * @LastEditTime: 2022-05-29 18:19:12
 * @FilePath: \Mall-system\src\views\power\Roles.vue
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
  name: 'Roles',
  components: {
    Bread
  },
  data() {
    return {
      // 面包屑标题
      breadTitle: {
        one: '权限管理',
        two: '角色列表'
      }
    }
  },

  created() {},

  methods: {}
}
</script>

<style scoped></style>
