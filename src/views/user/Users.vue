<!--
 * @Descripttion: 用户管理页面
 * @Author: SUI
 * @Date: 2022-05-13 18:31:38
 * @LastEditors: SUI
 * @LastEditTime: 2022-05-15 17:02:44
 * @FilePath: \Mall-system\src\views\user\Users.vue
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <Bread :title="breadTitle"></Bread>
  </div>
</template>
<script>
export default {
  name: 'Users'
}
</script>

<script>
// 引入面包屑
import Bread from '@/components/common/Bread'
export default {
  name: 'Users',
  // 引入模板
  components: {
    Bread
  },
  data() {}
}
</script>
<style lang="scss" scoped></style>
