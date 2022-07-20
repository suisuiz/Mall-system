<!--
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2022-07-19 14:40:59
 * @LastEditors: SUI
 * @LastEditTime: 2022-07-20 09:20:18
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

  // 监听指定值，只有指定值变化，才会触发
  watch: {},
  // 里面的函数只有调用才会执行（实时计算）里面是定义的方法
  methods: {},
  // 创建前状态(里面是操作)
  beforeCreate() {},
  // 创建完毕状态(里面是操作)
  created() {},
  // 挂载前状态(里面是操作)
  beforeMount() {},
  // 挂载结束状态(里面是操作)
  mounted() {},
  // 更新前状态(里面是操作)
  beforeUpdate() {},
  // 更新完成状态(里面是操作)
  updated() {},
  // 销毁前状态(里面是操作)
  beforeDestroy() {},
  // 销毁完成状态(里面是操作)
  destroyed() {},
}
</script>
<style scoped>
/**
 * 导入css样式组件
 * @import "../assets/css/components/index.css";
 */
</style>
