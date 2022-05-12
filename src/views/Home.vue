<!--
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2021-08-15 12:41:02
 * @LastEditors: SUI
 * @LastEditTime: 2021-08-22 20:35:53
 * @FilePath: \mall-system-gitee\src\views\Home.vue
-->
<template>
  <!-- container -->
  <el-container class="home">
    <!-- header -->
    <el-header>
      <el-row type="flex" class="row-bg" justify="space-between" align="middle">
        <el-col>
          <el-row type="flex" align="middle" class="row-bg">
            <img class="logo" src="@/assets/logo.png" />
            <span>商城管理系统</span>
          </el-row>
        </el-col>
        <el-button type="info" @click="logout">退出</el-button>
      </el-row>
    </el-header>

    <el-container>
      <!-- aside -->
      <!-- 三目运算符控制侧边栏宽度 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 控制显示隐藏 -->
        <div class="toggle-button" @click="menuCollapse">|||</div>
        <!-- 导航栏 -->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activePath"
          router
          unique-opened
        >
          <!-- 一级菜单 -->
          <!-- index 是字符串类型  且唯一性 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- icon -->
              <i :class="iconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <!-- index 于点击 activePath 保持一致-->
            <el-menu-item
              :index="'/' + keys.path"
              v-for="keys in item.children"
              :key="keys.id"
              @click="saveNavStatus('/' + keys.path)"
            >
              <!-- 二级菜单模板区域 -->
              <template slot="title">
                <!-- icon -->
                <i class="el-icon-s-operation"></i>
                <!-- 文本 -->
                <span>{{ keys.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- main -->
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      // 字体图标对象
      iconObj: {
        '125': 'el-icon-user-solid',
        '103': 'el-icon-s-tools',
        '101': 'el-icon-s-goods',
        '102': 'el-icon-s-order',
        '145': 'el-icon-s-marketing'
      },
      // 侧边栏菜单默认不折叠
      isCollapse: false,
      // 被激活的导航地址
      activePath: '/welcome'
    }
  },

  created() {
    // 获取 aside 数据
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },

  methods: {
    // 退出登录
    async logout() {
      try {
        await this.$confirm('是否退出登录?', '提示', {
          confirmButtonText: '退出',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.$message.success('退出成功')
        // 退出就是清空token和重新跳转页面
        window.sessionStorage.clear()
        this.$router.push('/login')
      } catch (error) {
        this.$message.info('取消')
      }
    },

    // 获取 aside 数据
    getMenuList() {
      let that = this
      that.$api.get('menus', that.loginForm, (res) => {
        if (res.meta.status !== 200) return that.$message.error(res.meta.msg)
        // console.log(res.data)
        that.menuList = res.data
      })
    },

    // 控制侧边栏状态
    menuCollapse() {
      this.isCollapse = !this.isCollapse
    },

    // 拿到当前的点击状态
    saveNavStatus(activePath) {
      // 存下方便刷新获取
      window.sessionStorage.setItem('activePath', activePath)
      // 当前页赋值
      this.activePath = activePath
    }
  }
}
</script>

<style lang="scss" scoped>
// container
.home {
  height: 100vh;

  // header
  .el-header {
    background-color: #666;

    .row-bg {
      height: 100%;
      padding: 0;
      margin: 0;
      color: #fff;

      .el-col {
        height: 100%;
        font-size: 20px;

        .logo {
          margin-right: 18px;
          height: 50px;
        }
      }
    }
  }

  // aside
  .el-aside {
    line-height: 200px;
    background-color: #333744;

    .toggle-button {
      color: #fff;
      line-height: 24px;
      font-size: 10px;
      text-align: center;
      letter-spacing: 0.2em;
      cursor: pointer;
      background-color: #999;
    }

    .el-menu {
      border-right: none;
    }
  }

  // main
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
