<!--
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2022-06-18 22:56:44
 * @LastEditors: SUI
 * @LastEditTime: 2022-06-19 22:49:56
 * @FilePath: \Mall-system\src\views\goods\Add.vue
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <Bread :title="breadTitle"></Bread>

    <!-- 内容展示卡片 -->
    <el-card class="box-card"> </el-card>
  </div>
</template>
<script>
// 引入面包屑
import Bread from '@/components/common/Bread'
export default {
  name: 'Add',

  components: { Bread },

  data() {
    return {}
  },

  created() {},

  methods: {},
}
</script>

<style lang="scss" scoped></style>
