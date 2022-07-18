<!--
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2022-06-22 16:55:01
 * @LastEditors: SUI
 * @LastEditTime: 2022-07-18 15:55:49
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

  components: { Bread },

  data() {
    return {
      // 面包屑标题
      breadTitle: { one: '商品管理', two: '参数列表' },
      // 分类列表
      cateList: [],
      // 选中的id
      values: [],

      // 切换值
      activeName: 'many',

      // 表格数据
      tableData: [],

      // 添加弹框
      dialogVisible: false,
      // 添加表单的数据对象
      addForm: { attr_name: '' },

      // 编辑弹框
      editDialogVisible: false,
      // 编辑数据
      editForm: {},

      // 表单的验证规则对象
      rules: { attr_name: [{ required: true, message: '请输入属性名称', trigger: 'blur' }] },
    }
  },

  created() {
    // 获取分类
    this.getCatesList()
  },

  computed: {
    //当前级联选择的三级 id
    cateId() {
      if (this.values.length === 3) {
        return this.values[2]
      }
      return null
    },
  },

  methods: {
    // 获取分类
    getCatesList() {
      let that = this
      that.$api.get('categories', {}, (res) => {
        if (res.meta.status !== 200) return that.$message.error(res.meta.msg)
        that.$message.success('获取分类成功')
        // 分类列表
        that.cateList = res.data
      })
    },

    // 获取参数数据
    getParams() {
      let that = this
      // 过滤非三级分类
      if (that.values.length !== 3) {
        that.values = []
        that.tableData = []
        return
      }
      that.$api.get(`categories/${that.cateId}/attributes`, { sel: that.activeName }, (res) => {
        if (res.meta.status !== 200) return that.$message.error(res.meta.msg)
        that.$message.success('获取参数成功')
        // 将attr_vals分割 并返回为数组
        res.data.forEach((item) => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
          // 控制单行的文本输入框的显示与隐藏
          item.inputVisible = false
          // 单行文本输入框的数据绑定对象
          item.inputValue = ''
        })
        that.tableData = res.data
      })
    },

    // 改变父级节点选项
    handleChange() {
      this.getParams()
    },

    // tab 切换
    handleClick() {
      this.getParams()
    },

    // 展开行删 tag
    closeTag(index, scope) {
      scope.attr_vals.splice(index, 1)
      // 保存到数据库中
      this.saveAttrVals(scope)
    },

    // 显示输入框
    showInput(scope) {
      scope.inputVisible = true
      // 让文本框自动获得焦点
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    // tag回车或者失去焦点触发事件
    handleInputConfirm(scope) {
      if (scope.inputValue.trim().length === 0) {
        scope.inputValue = ''
        scope.inputVisible = false
        return
      }
      //没有return 说明输入的值有效 可以进行后续操作
      scope.attr_vals.push(scope.inputValue)
      scope.inputValue = ''
      scope.inputVisible = false
      //前端页面渲染出来新标签不够，还需要将数据提交给服务器
      this.saveAttrVals(scope)
    },

    // 保存数据
    saveAttrVals(scope) {
      let that = this
      let data = {
        attr_name: scope.attr_name,
        attr_sel: scope.attr_sel,
        attr_vals: scope.attr_vals.join(' '),
      }
      that.$api.put(`categories/${that.cateId}/attributes/${scope.attr_id}`, data, (res) => {
        if (res.meta.status !== 200) return that.$message.error('添加失败')
        this.$message.success('添加成功')
      })
    },

    // 监听对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },

    // 点击确定添加属性
    addParams(formName) {
      let that = this
      // 表单预校验
      that.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            attr_name: that.addForm.attr_name,
            attr_sel: that.activeName,
          }
          // 调用添加分类接口
          that.$api.post(`categories/${that.cateId}/attributes`, data, (res) => {
            if (res.meta.status !== 201) return that.$message.error('添加属性失败')
            that.$message.success('添加属性成功')
            that.getParams()
            that.dialogVisible = false
          })
        }
      })
    },

    // 监听修改对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },

    // 编辑
    showEditDialog(attr_id) {
      let that = this
      let data = { attr_sel: that.activeName }
      that.$api.get(`categories/${that.cateId}/attributes/${attr_id}`, data, (res) => {
        if (res.meta.status !== 200) return that.$message.error('获取当前参数失败')
        that.editForm = res.data
        that.editDialogVisible = true
      })
    },

    //修改事件
    editParams(formName) {
      let that = this
      // 表单预校验
      that.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            attr_name: that.editForm.attr_name,
            attr_sel: that.editForm.attr_sel,
          }
          // 调用添加分类接口
          that.$api.put(`categories/${that.cateId}/attributes/${that.editForm.attr_id}`, data, (res) => {
            if (res.meta.status !== 200) return that.$message.error('修改数据失败')
            that.$message.success('修改数据成功')
            that.getParams()
            that.editDialogVisible = false
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
