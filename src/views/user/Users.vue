<!--
 * @Descripttion: 用户管理页面
 * @Author: SUI
 * @Date: 2022-05-13 18:31:38
 * @LastEditors: SUI
 * @LastEditTime: 2022-05-15 17:05:33
 * @FilePath: \Mall-system\src\views\user\Users.vue
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <Bread :title="breadTitle"></Bread>
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
  components: {
    Bread
  },
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
  }
}
</script>
<style lang="scss" scoped></style>
