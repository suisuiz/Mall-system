<!--
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2022-08-08 18:50:58
 * @LastEditors: SUI
 * @LastEditTime: 2022-08-11 08:47:48
 * @FilePath: \Mall-system\src\views\report\Reports.vue
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <Bread :title="breadTitle"></Bread>

    <!-- 内容展示卡片 -->
    <el-card class="box-card">
      <!-- 渲染 echarts 图表 -->
      <!-- 为 echarts 准备一个具备大小（宽、高）的 DOM -->
      <div id="echartsBox" style="width: 800px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
// 引入面包屑
import Bread from '@/components/common/Bread'

// 按需导入 echarts
// import echarts from 'echarts'
import * as echarts from 'echarts'

// 引入 lodash
import _ from 'lodash'

export default {
  name: 'Reports',

  components: { Bread },

  data() {
    return {
      // 面包屑标题
      breadTitle: {
        one: '数据统计',
        two: '数据报表',
      },
    }
  },

  created() {},

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped></style>
