<!--
 * @Descripttion: 用户管理页面
 * @Author: SUI
 * @Date: 2022-05-13 18:31:38
 * @LastEditors: SUI
 * @LastEditTime: 2022-05-18 14:04:09
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
    <!-- 分配角色 -->
  </div>
</template>
<script>
export default {
  name: 'Users'
}
</script>

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
      breadTitle: {
        one: '用户管理',
        two: '用户列表'
      },

      // 获取请求参数
      queryInfo: {
        // 查询参数
        query: '',
        // 当前页数
        pagenum: 1,
        // 每页显示条数
        pagesize: 5
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
        mobile: ''
      },

      // 修改用户表单
      editDialog: false,
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },

      // 表单校验
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          // { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          // { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },

      // 分配角色显示
      setRoleRightDialog: false,
      userInfo: {},
      // 角色列表
      rolesList: [],
      // 选择的角色 ID
      selectedRoleId: ''
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
        that.usersList = res.data.users
        that.totalpage = res.data.total
        that.queryInfo.pagenum = res.data.pagenum
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
    }
  }
}
</script>
<style lang="scss" scoped></style>
