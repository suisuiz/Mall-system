<!--
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2022-08-08 18:50:58
 * @LastEditors: SUI
 * @LastEditTime: 2022-08-16 17:44:24
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
      // 要合并的数据
      options: {
        title: {
          text: '用户来源',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3',
            },
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
      },
    }
  },

  created() {},

  // 此时页面上元素渲染完毕
  mounted() {
    let that = this
    // 初始化 echarts
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('echartsBox'))

    // 接口获取 echarts 数据
    that.$api.get('reports/type/1', {}, (res) => {
      if (res.meta.status !== 200) return that.$message.error('获取图表失败')
      console.log(res.data)

      // 合并对象
      const result = _.merge(res.data, this.options)

      // 渲染页面
      myChart.setOption(result)
    })
  },

  methods: {},
}
</script>

<style lang="scss" scoped></style>
