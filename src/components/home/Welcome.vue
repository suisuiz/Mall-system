<!--
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2022-05-12 09:23:13
 * @LastEditors: SUI
 * @LastEditTime: 2022-08-26 14:43:06
 * @FilePath: \Mall-system\src\components\home\Welcome.vue
-->
<template>
  <div>
    <img src="@/assets/6.jpg" alt="" srcset="" />
    <div class="welcome">
      <div class="box">
        <div>Welcome!</div>
        <div>欢迎来到商城管理系统！</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {},
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}

.welcome {
  position: absolute;
  top: -100px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    margin-top: 100px;
    color: #fff;
    font-size: 36px;
    text-align: center;
  }
}
</style>
