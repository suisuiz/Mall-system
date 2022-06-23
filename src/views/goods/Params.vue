<!--
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2022-06-22 16:55:01
 * @LastEditors: SUI
 * @LastEditTime: 2022-06-23 14:38:30
 * @FilePath: \Mall-system\src\views\goods\Params.vue
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
  name: 'Params',
  components: {
    Bread,
  },
  data() {
    return {
      // 面包屑标题
      breadTitle: {
        one: '商品管理',
        two: '商品列表',
      },
    }
  },

  created() {},

  methods: {},
}
</script>

<style lang="scss" scoped></style>
