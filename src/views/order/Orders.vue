<!--
 * @Descripttion: Orders
 * @Author: SUI
 * @Date: 2022-07-19 14:40:59
 * @LastEditors: SUI
 * @LastEditTime: 2022-07-27 14:09:22
 * @FilePath: \Mall-system\src\views\order\Orders.vue
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
  name: 'Orders',
  components: { Bread },

  data() {
    return {
      // 面包屑标题
      breadTitle: { one: '订单管理', two: '订单列表' },
    }
  },

  created() {
    //
  },

  methods: {
    //
  },
}
</script>

<style lang="scss" scoped></style>
