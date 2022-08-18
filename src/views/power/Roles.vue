<!--
 * @Descripttion: 角色列表
 * @Author: SUI
 * @Date: 2022-05-29 18:13:04
 * @LastEditors: SUI
 * @LastEditTime: 2022-08-18 18:42:31
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
        <el-table-column type="expand">
          <!-- scope.row 展示一列的信息 -->
          <template slot-scope="scope">
            <!-- 动态加类 -->
            <el-row :class="['border-bottom', index === 0 ? 'border-top' : '']" type="flex" align="middle" v-for="(items, index) in scope.row.children" :key="items.id">
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row, items.id)">{{ items.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级、三级权限 -->
              <el-col :span="19">
                <el-row :class="[i === 0 ? '' : 'border-top']" type="flex" align="middle" v-for="(keys, i) in items.children" :key="keys.id">
                  <!-- 二级权限 -->
                  <el-col :span="5">
                    <el-tag closable type="success" @close="removeRightById(scope.row, keys.id)">{{ keys.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="19">
                    <el-tag v-for="value in keys.children" :key="value.id" closable type="warning" @close="removeRightById(scope.row, value.id)">{{ value.authName }}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引 -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <!-- scope.row 展示一列的信息 -->
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeUserById(scope.row.id)">删除</el-button>
            <!-- 文字提示 -->
            <el-button size="mini" type="warning" icon="el-icon-setting" @click="setRole(scope.row)">分配权限</el-button>
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
        node-key  每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
        default-checked-keys	默认勾选的节点的 key 的数组
        default-expand-all 默认展开所有节点
        accordion 手风琴
        show-checkbox	节点是否可被选择
       -->
      <el-tree ref="treeRef" :data="rightsList" :props="treeProps" node-key="id" :default-checked-keys="defKeys" default-expand-all accordion show-checkbox> </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setDialogClosed">取 消</el-button>
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
  components: { Bread },
  data() {
    return {
      // 面包屑标题
      breadTitle: { one: '权限管理', two: '角色列表' },

      // 角色列表
      rolesList: [],

      // 添加角色表单
      addDialog: false,
      addForm: {
        roleName: '',
        roleDesc: '',
      },

      // 修改用户表单
      editDialog: false,
      editForm: {
        id: '',
        roleName: '',
        roleDesc: '',
      },

      // 表单校验
      formRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' },
        ],
      },

      // 分配权限显示
      setRoleRightDialog: false,
      // 所有权限列表
      rightsList: [],
      // 树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children',
      },
      // 默认选中的节点id值数组
      defKeys: [],
      //当前分配权限的角色ID
      roleId: '',
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

    // 删除角色指定权限
    async removeRightById(role, rightId) {
      let that = this
      try {
        await that.$confirm('是否删除角色权限?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
        })

        // 删除角色指定权限
        that.$api.delete(`roles/${role.id}/rights/${rightId}`, {}, (res) => {
          if (res.meta.status !== 200) return that.$message.error('取消权限失败')
          that.$message.success('取消权限成功')
          // 为了不重新渲染页面直接更新行
          role.children = res.data
        })
      } catch (error) {
        that.$message.info('取消')
      }
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
        roleDesc: '',
      }
      this.addDialog = false
    },

    // 展示修改弹框
    showEditDialog(userId) {
      let that = this
      // 根据 ID 查询角色信息
      that.$api.get(`roles/${userId}`, {}, (res) => {
        if (res.meta.status !== 200) return that.$message.error('查询信息失败')
        that.$message.success('查询信息成功')
        that.editForm = res.data
        that.editDialog = true
      })
    },

    // 修改角色提交
    editSubmitForm(formName) {
      let that = this
      // 表单校验
      that.$refs[formName].validate((valid) => {
        if (valid) {
          // 调用编辑角色接口
          that.$api.put(`roles/${that.editForm.roleId}`, that.editForm, (res) => {
            if (res.meta.status !== 200) return that.$message.error('修改用户失败')
            that.$message.success('修改用户成功')
            that.editDialog = false
            that.getRolesList()
          })
        }
      })
    },

    // 根据 ID 删除角色
    async removeUserById(userId) {
      let that = this
      try {
        await that.$confirm('是否删除角色?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
        })

        // 根据 ID 删除角色
        that.$api.delete(`roles/${userId}`, {}, (res) => {
          if (res.meta.status !== 200) return that.$message.error('删除失败')
          that.$message.success('删除成功')
          that.getRolesList()
        })
      } catch (error) {
        that.$message.info('取消')
      }
    },

    // 角色授权展示 先反显赋值，在修改
    setRole(userInfo) {
      let that = this
      // console.log(userInfo)
      // 角色的ID
      that.roleId = userInfo.id
      that.$api.get('rights/tree', {}, (res) => {
        if (res.meta.status !== 200) return that.$message.error('获取权限列表失败')
        that.$message.success('获取权限列表成功')
        that.rightsList = res.data
        // 递归获取三级节点的ID
        that.getLeafKeys(userInfo, that.defKeys)

        that.setRoleRightDialog = true
      })
    },

    // 通过递归的形式获取角色下所有三级权限，并保存至defKeys
    getLeafKeys(node, arr) {
      let that = this
      // 判断 node节点 是否包含三级节点，如果不包含，直接存id到数组
      if (!node.children) {
        return arr.push(node.id)
      }

      node.children.forEach((item) => {
        that.getLeafKeys(item, arr)
      })
    },

    // 点击为角色授权
    saveRoleInfo() {
      let that = this
      // 获取 选中的 ID tree this.$refs.xxx.getCheckedKeys()
      // 获取 半选中的 ID tree this.$refs.xxx.getHalfCheckedNodes()
      const keys = [...that.$refs.treeRef.getCheckedKeys(), ...that.$refs.treeRef.getHalfCheckedKeys()]
      // console.log(keys)

      // 分割的权限 ID 列表（获取所有被选中、叶子节点的key和半选中节点的key, 包括 1，2，3级节点）
      const ridsIdStr = keys.join(',')

      // 调用 角色授权 接口
      let data = {
        rids: ridsIdStr,
      }
      that.$api.post(`roles/${that.roleId}/rights`, data, (res) => {
        if (res.meta.status !== 200) return that.$message.error('角色授权失败')
        that.$message.success('角色授权成功')
        that.getRolesList()
        that.setRoleRightDialog = false
      })
    },

    // 关闭角色授权弹框
    setDialogClosed() {
      // 初始化
      this.defKeys = []
      this.roleId = ''
      this.setRoleRightDialog = false
    },
  },
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 15px;
}

.el-tag {
  margin: 7px;
}
.border-top {
  border-top: solid 1px #eee;
}
.border-bottom {
  border-bottom: solid 1px #eee;
}
</style>
