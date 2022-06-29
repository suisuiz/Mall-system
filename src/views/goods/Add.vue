<!--
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2022-06-18 22:56:44
 * @LastEditors: SUI
 * @LastEditTime: 2022-06-29 14:22:00
 * @FilePath: \Mall-system\src\views\goods\Add.vue
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <Bread :title="breadTitle"></Bread>

    <!-- 内容展示卡片 -->
    <el-card class="box-card">
      <!-- 提示信息 -->
      <el-alert title="添加商品信息" type="info" center :closable="false" show-icon> </el-alert>

      <!-- 
        步骤条
        space   每个 step 的间距，不填写将自适应间距。支持百分比。
        active  设置当前激活步骤
       -->
      <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- form 表单嵌套 tab标签 一起提交 -->
      <el-form ref="addFormRef" :model="addForm" :rules="rules" label-position="top">
        <el-tabs v-model="activeIndex" :tab-position="'left'" :before-leave="beforeTabsLeave" @tab-click="tabClick">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item prop="goods_name" label="商品名称">
              <el-input v-model="addForm.goods_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="goods_price" label="商品价格">
              <el-input v-model="addForm.goods_price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="goods_weight" label="商品重量">
              <el-input v-model="addForm.goods_weight" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="goods_number" label="商品数量">
              <el-input v-model="addForm.goods_number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="goods_cat" label="选择商品分类">
              <!-- options用来指定数据源 -->
              <!-- props用来指定配置对象 -->
              <el-cascader v-model="addForm.goods_cat" :options="cateList" :props="cateProps" @change="handleChange"></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!-- 渲染表单的item项 -->
            <template v-if="manyTableData.length > 0">
              <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
                <!-- 复选框组、多选框组   -->
                <el-checkbox-group v-model="item.attr_vals">
                  <el-checkbox :label="item1" v-for="(item1, index) in item.attr_vals" :key="index" border></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </template>
            <template v-else>暂无数据</template>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <!-- input 框循环、渲染 -->
            <el-form-item :label="item.attr_name" v-for="item in onlyTableDate" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- 上传图片到后台 -->
            <el-upload :action="uploadUrl" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture">
              <el-button size="small" type="primary" :headers="headersObj" :on-success="handleSuccess">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器组件 -->
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>

            <!-- 添加按钮 -->
            <el-button type="primary" class="addbtn" @click="add('addFormRef')"> 添加商品 </el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>

      <!-- 图片预览的对话框 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
        <img :src="previewPath" alt="" />
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
// 引入面包屑
import Bread from '@/components/common/Bread'
export default {
  name: 'Add',

  components: { Bread },

  data() {
    return {
      // 面包屑标题
      breadTitle: {
        one: 'xxx',
        two: 'xxx',
      },
    }
  },

  created() {},

  methods: {},
}
</script>

<style lang="scss" scoped></style>
