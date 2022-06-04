<!--
 * @Descripttion: 角色列表
 * @Author: SUI
 * @Date: 2022-05-29 18:13:04
 * @LastEditors: SUI
 * @LastEditTime: 2022-06-04 21:17:54
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

    <!-- 添加角色 -->
    <el-dialog title="添加角色" width="35%" :visible.sync="addDialog" @close="addResetForm('addFormRef')">
      <el-form ref="addFormRef" :model="addForm" :rules="formRules">
        <!-- prop="roleName"  校验 -->
        <el-form-item prop="roleName" label="角色名称" label-width="80px">
          <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="80px">
          <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addResetForm('addFormRef')">取 消</el-button>
        <el-button type="primary" @click="addSubmitForm('addFormRef')">添 加</el-button>
      </div>
    </el-dialog>

    <!-- 编辑角色 -->
    <el-dialog title="编辑角色" width="35%" :visible.sync="editDialog" @close="editDialog = false">
      <el-form ref="editFormRef" :model="editForm" :rules="formRules">
        <!-- prop="roleName"  校验 -->
        <el-form-item prop="roleName" label="角色名称" label-width="80px">
          <el-input v-model="editForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="80px">
          <el-input v-model="editForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editSubmitForm('editFormRef')">编 辑</el-button>
      </div>
    </el-dialog>

    <!-- 角色授权 -->
    <el-dialog title="分配权限" width="35%" :visible.sync="setRoleRightDialog" @close="setDialogClosed">
      <!-- 
        Tree 树形控件 展示
        accordion 手风琴
        show-checkbox	节点是否可被选择
       -->
      <el-tree :data="rightsList" :props="treeProps" accordion show-checkbox @check-change="handleCheckChange"> </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setRoleRightDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">添 加</el-button>
      </div>
    </el-dialog>
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
      rolesList: [],

      // 角色列表
      rolesList: [],

      // 添加角色表单
      addDialog: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },

      // 修改用户表单
      editDialog: false,
      editForm: {
        id: '',
        roleName: '',
        roleDesc: ''
      },

      // 表单校验
      formRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      },

      // 所有权限列表
      rightsList: [],
      // 树形控件的数据绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 分配权限显示
      setRoleRightDialog: false
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
    },

    // 添加角色提交
    addSubmitForm(formName) {
      let that = this
      // 表单校验
      that.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(that.addForm)
          // 调用添加角色接口
          that.$api.post('roles', that.addForm, (res) => {
            if (res.meta.status !== 201) return that.$message.error('添加角色失败')
            that.$message.success('添加角色成功')
            that.addDialog = false
            that.getRolesList()
          })
        }
      })
    },

    // 初始化添加角色
    addResetForm(formName) {
      this.$refs[formName].resetFields()
      this.addForm = {
        roleName: '',
        roleDesc: ''
      }
      this.addDialog = false
    }
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 15px;
}
</style>
