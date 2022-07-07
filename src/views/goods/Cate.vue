<!--
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2022-06-20 09:26:26
 * @LastEditors: SUI
 * @LastEditTime: 2022-07-07 18:34:55
 * @FilePath: \Mall-system\src\views\goods\Cate.vue
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <Bread :title="breadTitle"></Bread>
    <!-- 内容展示卡片 -->
    <el-card class="box-card">
      <!-- 搜索和添加 -->
      <el-row :gutter="20">
        <!-- 添加分类 -->
        <el-col :span="4">
          <el-button type="primary" @click="addGoods">添加分类</el-button>
        </el-col>
      </el-row>

      <!-- 
        表格数据
        自定义组件 npm安装
        文档  https://github.com/MisterTaki/vue-table-with-tree-grid#api
       -->
      <tree-table class="el-table" :data="cateList" :columns="columns" :selection-type="false" :expand-type="false" show-index index-text="#" border>
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i style="color: lightgreen" class="el-icon-success" v-if="scope.row.cat_deleted === false"></i>
          <i style="color: red" class="el-icon-error" v-else></i>
        </template>
        <!-- 级别 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="small" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="small" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="opt" slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeUserById(scope.row)">删除 </el-button>
        </template>
      </tree-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 25]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalpage"
      >
      </el-pagination>

      <!-- 添加分类 -->
      <el-dialog title="添加分类" width="35%" :visible.sync="addDialog" @close="addResetForm('addFormRef')">
        <el-form ref="addFormRef" :model="addForm" :rules="formRules">
          <!-- prop="cat_name"  校验 -->
          <el-form-item prop="cat_name" label="分类名称" label-width="80px">
            <el-input v-model="addForm.cat_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="父级分类" label-width="80px">
            <!-- options用来指定数据源 -->
            <!-- props用来指定配置对象 -->
            <el-cascader
              v-model="selectedKeys"
              :options="parentCateList"
              :props="{ expandTrigger: 'hover', value: 'cat_id', label: 'cat_name', children: 'children' }"
              style="width: 100%"
              clearable
              change-on-select
              @change="parentCateChange"
            ></el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addResetForm('addFormRef')">取 消</el-button>
          <el-button type="primary" @click="addSubmitForm('addFormRef')">添 加</el-button>
        </div>
      </el-dialog>

      <!-- 编辑分类 -->
      <el-dialog title="编辑分类" :visible.sync="editDialog" width="35%" @close="editResetForm('editFormRef')">
        <el-form :model="editForm" :rules="formRules" ref="editFormRef" label-width="80px">
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="editForm.cat_name"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editResetForm('editFormRef')">取 消</el-button>
          <el-button type="primary" @click="editCate('editFormRef')">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
// 引入面包屑
import Bread from '@/components/common/Bread'
export default {
  name: 'Cate',
  components: { Bread },

  data() {
    return {
      // 面包屑标题
      breadTitle: { one: '商品管理', two: '商品分类' },

      // 请求参数
      queryInfo: {
        // 值：1，2，3 分别表示显示一层二层三层分类列表
        type: 3,
        // 当前页数
        pagenum: 1,
        // 每页显示条数
        pagesize: 5,
      },
      // 商品分类的数据列表
      cateList: [],
      // 总数
      totalpage: 0,
      //为table指定列的对象
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
        },
        {
          label: '是否有效',
          //表示将当前列定义为模版列
          type: 'template',
          //表示当前这一列使用的模版名称
          template: 'isok',
        },
        {
          label: '级别',
          //表示将当前列定义为模版列
          type: 'template',
          //表示当前这一列使用的模版名称
          template: 'order',
        },
        {
          label: '操作',
          //表示将当前列定义为模版列
          type: 'template',
          //表示当前这一列使用的模版名称
          template: 'opt',
        },
      ],

      // 添加分类
      addDialog: false,
      addForm: {
        //将要添加的分类名称
        cat_name: '',
        // 父级分类的id
        cat_pid: 0,
        // 分类的等级，默认是一级分类
        cat_level: 0,
      },

      // 编辑分类
      editDialog: false,
      editForm: { cat_name: '', cat_id: '' },

      // 表单的验证规则对象
      formRules: { cat_name: [{ required: true, message: '请输入分类名称 ', trigger: 'blur' }] },

      // 父级分类列表
      parentCateList: [],
      // 选中的父级id
      selectedKeys: [],
    }
  },

  created() {
    // 获取商品分类
    this.getCatesList()
  },

  methods: {
    // 获取商品分类数据
    getCatesList() {
      let that = this
      that.$api.get('categories', that.queryInfo, (res) => {
        if (res.meta.status !== 200) return that.$message.error(res.meta.msg)
        that.$message.success('获取分类数据成功')
        // console.log(res.data)
        // 当前页数
        // that.queryInfo.pagenum = res.data.pagenum
        // 分类总数
        that.totalpage = res.data.total
        // 分类列表
        that.cateList = res.data.result
      })
    },

    // 监听分页 改变条数
    handleSizeChange(pagesize) {
      this.queryInfo.pagesize = pagesize
      this.getCatesList()
    },

    // 监听分页 改变页数
    handleCurrentChange(pagenum) {
      this.queryInfo.pagenum = pagenum
      this.getCatesList()
    },

    // 添加分类
    addGoods() {
      let that = this
      that.addDialog = true
      that.$api.get('categories', { type: 2 }, (res) => {
        if (res.meta.status !== 200) return that.$message.error(res.meta.msg)
        // that.$message.success('获取分类数据成功')
        // 父级分类列表
        that.parentCateList = res.data
      })
    },

    // 改变父级节点选项
    parentCateChange() {
      if (this.selectedKeys.length > 0) {
        // 父 id
        this.addForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        // 当前等级
        this.addForm.cat_level = this.selectedKeys.length
        return
      } else {
        this.addForm.cat_pid = 0
        this.addForm.cat_level = 0
      }
    },

    // 添加分类提交
    addSubmitForm(formName) {
      let that = this
      // 表单校验
      that.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(that.addForm)
          // 调用添加分类接口
          that.$api.post('categories', that.addForm, (res) => {
            if (res.meta.status !== 201) return that.$message.error('创建失败')
            that.$message.success('创建成功')
            that.getCatesList()
            that.addDialog = false
          })
        }
      })
    },

    // 初始化添加分类
    addResetForm(formName) {
      this.$refs[formName].resetFields()
      this.addForm = {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0,
      }
      this.selectedKeys = []
      this.addDialog = false
    },

    // 显示编辑框
    showEditDialog(cate) {
      let that = this
      that.$api.get(`categories/${cate.cat_id}`, {}, (res) => {
        if (res.meta.status !== 200) return that.$message.error('查询分类名称失败')
        that.$message.success('查询分类名称成功')
        // console.log(res.data)
        that.editForm = res.data
        that.editDialog = true
      })
    },

    // 编辑分类
    editCate(formName) {
      let that = this
      // 表单校验
      that.$refs[formName].validate((valid) => {
        if (valid) {
          // 调用添加分类接口
          that.$api.put(`categories/${that.editForm.cat_id}`, that.editForm, (res) => {
            if (res.meta.status !== 200) return that.$message.error('更新失败')
            that.$message.success('更新成功')
            that.getCatesList()
            that.editDialog = false
          })
        }
      })
    },

    // 初始化编辑
    editResetForm(formName) {
      this.$refs[formName].resetFields()
      this.editForm = {
        cat_name: '',
        cat_pid: '',
      }
      this.editDialog = false
    },

    // 删除分类
    async removeUserById(cate) {
      let that = this
      try {
        await that.$confirm('是否删除分类?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
        })

        // 根据 ID 删除用户
        that.$api.delete(`categories/${cate.cat_id}`, {}, (res) => {
          if (res.meta.status !== 200) return that.$message.error('删除失败')
          that.$message.success('删除成功')
          that.getCatesList()
        })
      } catch (error) {
        that.$message.info('取消')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
