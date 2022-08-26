<!--
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2022-05-12 09:23:13
 * @LastEditors: SUI
 * @LastEditTime: 2022-08-26 14:42:46
 * @FilePath: \Mall-system\src\components\home\Login.vue
-->
<template>
  <div class="login_container">
    <!-- 登录框 -->
    <div class="login_box">
      <!-- icon -->
      <div class="avatar_box">
        <img src="@/assets/logo.png" />
      </div>

      <!-- 登录信息表单 -->
      <el-form :model="loginForm" :rules="inputFormRules" ref="loginForm" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
        </el-form-item>

        <!-- 密码框 -->
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password"></el-input>
        </el-form-item>

        <!-- 操作 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button type="info" @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      // 表单默认值
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      // 表单校验规则
      inputFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
        ],
      },
    }
  },

  methods: {
    // 登录
    submitForm(formName) {
      let that = this
      // 表单校验
      that.$refs[formName].validate((valid) => {
        if (valid) {
          // 调用登录接口
          that.$api.post('login', that.loginForm, (res) => {
            if (res.meta.status !== 200) return that.$message.error(res.meta.msg)
            // 将客户端登陆成功以后的token存储到sessionStorage中，token只在网页打开期间生效，除登陆外的api请求都需要携带token
            window.sessionStorage.setItem('token', res.data.token)
            this.$message.success('登陆成功！')
            //通过编程式导航跳转到后台主页
            this.$router.push('/Home')
          })
        }
      })
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
// 外层页面
.login_container {
  height: 100vh;
  background-color: #2b4b6b;

  // 登录框
  .login_box {
    // 位置
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    width: 450px;
    height: 300px;
    border-radius: 4px;
    background-color: #fff;

    // icon
    .avatar_box {
      // 位置
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 10px;
      box-sizing: border-box;

      width: 130px;
      height: 130px;
      overflow: hidden;
      border-radius: 50%;
      box-shadow: 0 0 10px #ddd;
      border: 1px solid #eee;
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }

    // 表单区域
    .login_form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 30px;
      box-sizing: border-box;

      .btns {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
