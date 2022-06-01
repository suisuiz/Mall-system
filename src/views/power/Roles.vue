<!--
 * @Descripttion: 角色列表
 * @Author: SUI
 * @Date: 2022-05-29 18:13:04
 * @LastEditors: SUI
 * @LastEditTime: 2022-06-01 20:46:10
 * @FilePath: \Mall-system\src\views\power\Roles.vue
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <Bread :title="breadTitle"></Bread>

    <!-- 内容展示卡片 -->
    <el-card class="box-card">
      <!-- 添加角色 -->
      <el-button type="primary" @click="addDialog = true">添加角色</el-button>

      <!-- 表格数据 -->
      <el-table :data="rolesList" border stripe>
        <!-- 展开行 -->
        <el-table-column type="expand"></el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <!-- scope.row 展示一列的信息 -->
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeUserById(scope.row.id)"></el-button>
            <!-- 文字提示 -->
            <el-tooltip effect="dark" content="分配权限" placement="top" :enterable="false">
              <el-button size="mini" type="warning" icon="el-icon-setting" @click="setRole(scope.row)"></el-button>
            </el-tooltip>
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
  name: 'Roles',
  components: {
    Bread
  },
  data() {
    return {
      // 面包屑标题
      breadTitle: {
        one: '权限管理',
        two: '角色列表'
      },

      // 角色列表
      rolesList: []
    }
  },

  created() {
    // 获取角色列表
    this.getRolesList()
  },

  methods: {
    // 角色列表
    getRolesList() {
      let that = this
      // 所有角色列表
      that.$api.get('roles', {}, (res) => {
        if (res.meta.status !== 200) return that.$message.error('获取角色列表失败')
        that.$message.success('获取角色列表成功')
        that.rolesList = res.data
      })
    }
  }
}
</script>

<style scoped></style>
