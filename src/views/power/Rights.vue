<!--
 * @Descripttion: 权限列表
 * @Author: SUI
 * @Date: 2022-05-29 18:13:16
 * @LastEditors: SUI
 * @LastEditTime: 2022-06-13 15:52:49
 * @FilePath: \Mall-system\src\views\power\Rights.vue
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <Bread :title="breadTitle"></Bread>

    <!-- 内容展示卡片 -->
    <el-card class="box-card">
      <!-- 表格数据 -->
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <!-- scope.row 展示一列的信息 -->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级权限</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级权限</el-tag>
            <el-tag type="warning" v-else>三级权限</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// 引入面包屑
import Bread from '@/components/common/Bread'
export default {
  name: 'Rights',
  components: { Bread },
  data() {
    return {
      // 面包屑标题
      breadTitle: {
        one: '权限管理',
        two: '权限列表',
      },

      // 列表展示
      rightsList: [],
      // 添加
      addDialog: false,
    }
  },

  created() {
    // 获取权限列表
    this.getRightsList()
  },

  methods: {
    // 列表
    getRightsList() {
      let that = this
      // 所有权限列表  列表显示权限
      that.$api.get('rights/list', {}, (res) => {
        if (res.meta.status !== 200) return that.$message.error('获取权限列表失败')
        that.$message.success('获取权限列表成功')
        that.rightsList = res.data
      })
    },
  },
}
</script>

<style scoped></style>
