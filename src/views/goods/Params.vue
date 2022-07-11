<!--
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2022-06-22 16:55:01
 * @LastEditors: SUI
 * @LastEditTime: 2022-07-11 17:39:33
 * @FilePath: \Mall-system\src\views\goods\Params.vue
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <Bread :title="breadTitle"></Bread>

    <!-- 内容展示卡片 -->
    <el-card class="box-card">
      <!-- 头部警告消息 -->
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false"></el-alert>

      <!-- 选择分类 -->
      <el-row type="flex" align="middle">
        <el-col :span="2">选择商品分类:</el-col>

        <!-- 级联选择框 -->
        <el-cascader
          v-model="values"
          :options="cateList"
          :props="{ expandTrigger: 'hover', value: 'cat_id', label: 'cat_name', children: 'children' }"
          style="width: 25%"
          clearable
          @change="handleChange"
        ></el-cascader>
      </el-row>

      <!-- 切换 tabs -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many"></el-tab-pane>
        <el-tab-pane label="静态属性" name="only"></el-tab-pane>
      </el-tabs>

      <!-- 添加按钮 -->
      <el-button type="primary" size="mini" :disabled="values.length === 3 ? false : true" @click="dialogVisible = true">添加参数</el-button>
    </el-card>
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
