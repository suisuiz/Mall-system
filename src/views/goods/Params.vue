<!--
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2022-06-22 16:55:01
 * @LastEditors: SUI
 * @LastEditTime: 2022-07-11 17:40:48
 * @FilePath: \Mall-system\src\views\goods\Params.vue
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <Bread :title="breadTitle"></Bread>

    <!-- 内容展示卡片 -->
    <el-card class="box-card">
      <!-- 头部警告消息 -->
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false"></el-alert>

      <!-- 选择分类 -->
      <el-row type="flex" align="middle">
        <el-col :span="2">选择商品分类:</el-col>

        <!-- 级联选择框 -->
        <el-cascader
          v-model="values"
          :options="cateList"
          :props="{ expandTrigger: 'hover', value: 'cat_id', label: 'cat_name', children: 'children' }"
          style="width: 25%"
          clearable
          @change="handleChange"
        ></el-cascader>
      </el-row>

      <!-- 切换 tabs -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many"></el-tab-pane>
        <el-tab-pane label="静态属性" name="only"></el-tab-pane>
      </el-tabs>

      <!-- 添加按钮 -->
      <el-button type="primary" size="mini" :disabled="values.length === 3 ? false : true" @click="dialogVisible = true">添加参数</el-button>

      <!-- 数据展示 -->
      <el-table :data="tableData" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-tag closable @close="closeTag(index, scope.row)" v-for="(item, index) in scope.row.attr_vals" :key="index">{{ item }}</el-tag>
            <!-- 文本输入框 -->
            <el-input
              class="input-new-tag"
              v-if="scope.row.inputVisible"
              v-model="scope.row.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(scope.row)"
              @blur="handleInputConfirm(scope.row)"
            >
            </el-input>
            <!-- 添加按钮 -->
            <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column :label="activeName == '0' ? '参数名称' : '属性名称'" prop="attr_name"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加按钮的对话框 -->
      <el-dialog :title="`添加${activeName === 'many' ? '动态参数' : '静态属性'}`" :visible.sync="dialogVisible" width="35%" @close="addDialogClosed">
        <el-form :model="addForm" :rules="rules" ref="addFormRef" label-width="80px">
          <el-form-item :label="activeName === 'many' ? '动态参数' : '静态属性'" prop="attr_name">
            <el-input v-model="addForm.attr_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addParams('addFormRef')">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑按钮的对话框 -->
      <el-dialog :title="`修改${activeName === 'many' ? '动态参数' : '静态属性'}`" :visible.sync="editDialogVisible" width="35%" @close="editDialogClosed">
        <el-form :model="editForm" :rules="rules" ref="editFormRef" label-width="80px">
          <el-form-item :label="activeName === 'many' ? '动态参数' : '静态属性'" prop="attr_name">
            <el-input v-model="editForm.attr_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editParams('editFormRef')">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
// 引入面包屑
import Bread from '@/components/common/Bread'
export default {
  name: 'Params',
  components: {
    Bread,
  },
  data() {
    return {
      // 面包屑标题
      breadTitle: {
        one: '商品管理',
        two: '商品列表',
      },
    }
  },

  created() {},

  methods: {},
}
</script>

<style lang="scss" scoped></style>
