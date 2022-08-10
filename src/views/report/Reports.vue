<!--
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2022-08-08 18:50:58
 * @LastEditors: SUI
 * @LastEditTime: 2022-08-10 09:33:13
 * @FilePath: \Mall-system\src\views\report\Reports.vue
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
  name: 'Reports',

  components: { Bread },

  data() {
    return {}
  },

  created() {},

  methods: {},
}
</script>

<style lang="scss" scoped></style>
