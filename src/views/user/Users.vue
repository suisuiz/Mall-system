<!--
 * @Descripttion: 用户管理页面
 * @Author: SUI
 * @Date: 2022-05-13 18:31:38
 * @LastEditors: SUI
 * @LastEditTime: 2022-08-18 18:45:38
 * @FilePath: \Mall-system\src\views\user\Users.vue
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <Bread :title="breadTitle"></Bread>

    <!-- 内容区域卡片 -->
    <el-card class="box-card">
      <!-- 搜索和添加 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserLIst">
            <el-button slot="append" icon="el-icon-search" @click="getUserLIst"></el-button>
          </el-input>
        </el-col>
        <!-- 添加用户 -->
        <el-col :span="4">
          <el-button type="primary" @click="addDialog = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 表格数据 -->
      <el-table :data="usersList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <!-- {{ scope.row}}通过作用域插槽 slot-scope 拿到作用域的数据，然后scope.row拿到这一行的数据  -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeUserById(scope.row.id)"></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button size="mini" type="warning" icon="el-icon-setting" @click="setRole(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalpage"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户 -->
    <el-dialog title="添加用户" width="35%" :visible.sync="addDialog" @close="addResetForm('addFormRef')">
      <el-form ref="addFormRef" :model="addForm" :rules="formRules">
        <!-- prop="username"  校验 -->
        <el-form-item prop="username" label="用户名" label-width="75px">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" label-width="75px">
          <el-input type="password" v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" label-width="75px">
          <el-input type="email" v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号" label-width="75px">
          <el-input type="tel" v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addResetForm('addFormRef')">取 消</el-button>
        <el-button type="primary" @click="addSubmitForm('addFormRef')">添 加</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户 -->
    <el-dialog title="修改用户" width="35%" :visible.sync="editDialog" @close="editDialog = false">
      <el-form ref="editFormRef" :model="editForm" :rules="formRules">
        <el-form-item label="用户名" label-width="75px">
          <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <!-- prop="username"  校验 -->
        <el-form-item prop="email" label="邮箱" label-width="75px">
          <el-input type="email" v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号" label-width="75px">
          <el-input type="tel" v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editSubmitForm('editFormRef')">添 加</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色 -->
    <el-dialog title="分配角色" width="35%" :visible.sync="setRoleRightDialog" @close="setDialogClosed">
      <div>
        <p>当前用户名：{{ userInfo.username }}</p>
        <p style="margin: 30px 0">当前角色：{{ userInfo.role_name }}</p>
        <p>
          分配新角色：
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id"> </el-option>
          </el-select>
        </p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setRoleRightDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo(selectedRoleId)">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入面包屑
import Bread from '@/components/common/Bread'
export default {
  name: 'Users',
  // 引入模板
  components: { Bread },

  data() {
    // 自定义校验规则
    var checkEmail = (rules, value, callback) => {
      if (value) {
        //验证邮箱的正则表达式
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

        if (regEmail.test(value)) {
          return callback()
        } else {
          callback(new Error('邮箱格式不正确'))
        }
      } else {
        // 可以为空
        return callback()
      }
    }
    //验证手机规则
    var checkMobile = (ules, value, callback) => {
      if (value) {
        const regMobile = /^(0|86|17951)?(13[0-9]|14[57]|15[0123456789]|17[678]|18[0-9])[0-9]{8}$/

        if (regMobile.test(value)) {
          return callback()
        } else {
          callback(new Error('手机格式不正确'))
        }
      } else {
        // 可以为空
        return callback()
      }
    }
    return {
      // 面包屑标题
      breadTitle: { one: '用户管理', two: '用户列表' },

      // 获取请求参数
      queryInfo: {
        // 查询参数
        query: '',
        // 当前页数
        pagenum: 1,
        // 每页显示条数
        pagesize: 5,
      },

      // 用户数据
      usersList: [],

      // 总记录数
      totalpage: 0,

      // 添加用户表单
      addDialog: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },

      // 修改用户表单
      editDialog: false,
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: '',
      },

      // 表单校验
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
        ],
        email: [
          // { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        mobile: [
          // { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },

      // 分配角色显示
      setRoleRightDialog: false,
      userInfo: {},
      // 角色列表
      rolesList: [],
      // 选择的角色 ID
      selectedRoleId: '',
    }
  },

  created() {
    // 获取用户列表
    this.getUserLIst()
  },

  methods: {
    // 获取用户列表
    getUserLIst() {
      let that = this
      that.$api.get('users', that.queryInfo, (res) => {
        if (res.meta.status !== 200) return that.$message.error(res.meta.msg)
        that.$message.success('获取用户数据成功')
        // console.log(res.data)
        // 当前页数
        that.queryInfo.pagenum = res.data.pagenum
        // 用户总数
        that.totalpage = res.data.total
        // 用户列表
        that.usersList = res.data.users
      })
    },

    // 监听分页 改变条数
    handleSizeChange(pagesize) {
      this.queryInfo.pagesize = pagesize
      this.getUserLIst()
    },

    // 监听分页 改变页数
    handleCurrentChange(pagenum) {
      this.queryInfo.pagenum = pagenum
      this.getUserLIst()
    },

    // 添加用户提交
    addSubmitForm(formName) {
      let that = this
      // 表单校验
      that.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(that.addForm)
          // 调用添加用户接口
          that.$api.post('users', that.addForm, (res) => {
            if (res.meta.status !== 201) return that.$message.error('用户创建失败')
            that.$message.success('用户创建成功')
            that.addDialog = false
            that.getUserLIst()
          })
        }
      })
    },

    // 初始化添加用户
    addResetForm(formName) {
      this.$refs[formName].resetFields()
      this.addForm = {
        username: '',
        password: '',
        email: '',
        mobile: '',
      }
      this.addDialog = false
    },

    // 修改用户状态
    userStateChanged(userInfo) {
      let that = this
      // 调用 修改用户状态 接口
      that.$api.put(`users/${userInfo.id}/state/${userInfo.mg_state}`, {}, (res) => {
        if (res.meta.status !== 200) return that.$message.error('设置状态失败')
        that.$message.success('设置状态成功')
      })
    },

    // 展示修改弹框
    showEditDialog(userId) {
      let that = this
      // 根据 ID 查询用户信息
      that.$api.get(`users/${userId}`, {}, (res) => {
        if (res.meta.status !== 200) return that.$message.error('查询信息失败')
        that.$message.success('查询信息成功')
        that.editForm = res.data
        that.editDialog = true
      })
    },

    // 修改用户提交
    editSubmitForm(formName) {
      let that = this
      // 表单校验
      that.$refs[formName].validate((valid) => {
        if (valid) {
          // 调用修改用户接口
          that.$api.put(`users/${that.editForm.id}`, that.editForm, (res) => {
            if (res.meta.status !== 200) return that.$message.error('修改用户失败')
            that.$message.success('修改用户成功')
            that.editDialog = false
            that.getUserLIst()
          })
        }
      })
    },

    // 根据 ID 删除用户
    async removeUserById(userId) {
      let that = this
      try {
        await that.$confirm('是否删除用户?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
        })

        // 根据 ID 删除用户
        that.$api.delete(`users/${userId}`, {}, (res) => {
          if (res.meta.status !== 200) return that.$message.error('删除失败')
          that.$message.success('删除成功')
          that.getUserLIst()
        })
      } catch (error) {
        that.$message.info('取消')
      }
    },

    // 显示分配角色
    setRole(userInfo) {
      let that = this
      that.userInfo = userInfo
      // 获取角色列表
      that.$api.get(`roles`, {}, (res) => {
        if (res.meta.status !== 200) return that.$message.error('获取角色列表失败')
        that.$message.success('获取角色列表成功')
        that.rolesList = res.data
        that.setRoleRightDialog = true
      })
    },

    // 保存角色
    saveRoleInfo(selectedRoleId) {
      let that = this
      if (!selectedRoleId) {
        that.$message.error('请选择新角色')
        return
      }
      // 调用 保存角色 接口
      let data = {
        rid: selectedRoleId,
      }
      that.$api.put(`users/${that.userInfo.id}/role`, data, (res) => {
        if (res.meta.status !== 200) return that.$message.error('设置角色失败')
        that.$message.success('设置角色成功')
        that.getUserLIst()
        that.setRoleRightDialog = false
      })
    },

    // 关闭分配角色弹框
    setDialogClosed() {
      // 初始化
      this.setRoleRightDialog = false
      this.selectedRoleId = ''
      this.userInfo = {}
    },
  },
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 15px;
}
</style>
