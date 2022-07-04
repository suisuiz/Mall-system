<!--
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2022-06-18 22:56:44
 * @LastEditors: SUI
 * @LastEditTime: 2022-07-04 18:36:35
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

// 引入 lodash
import _ from 'lodash'
export default {
  name: 'Add',

  components: { Bread },

  data() {
    return {
      // 面包屑标题
      breadTitle: { one: '商品列表', two: '添加商品' },

      // 步骤条当前位置
      activeIndex: '0',
      // 添加表单的数据对象
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        // 商品所属的分类数组
        goods_cat: [],
        // 上传图片的临时路径
        pics: [],
        // 商品的详情描述
        goods_introduce: '',
        // 商品的参数，包含静态参数和动态属性
        attrs: [],
      },
      // 验证规则
      rules: {
        goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        goods_price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        goods_number: [{ required: true, message: '请输入商品数量', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '请输入商品重量', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '请选择商品分类', trigger: 'blur' }],
      },

      // 商品分类列表
      cateList: [],
      // 配置
      cateProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children',
      },

      // 参数列表数据
      manyTableData: [],
      // 静态属性
      onlyTableDate: [],

      // 上传图片的url地址
      uploadUrl: 'http://www.ysqorz.top:8888/api/private/v1/upload',
      // 设置图片上传的请求头
      headersObj: { Authorization: window.sessionStorage.getItem('token') },
      previewPath: '',
      dialogVisible: false,
    }
  },

  // 计算属性获取id
  computed: {
    // 发送获取参数请求时 的分类id
    cateId() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      }
      return null
    },
  },

  created() {
    // 获取分类
    this.getCateList()
  },

  methods: {
    // 获取商品的分类数据
    getCateList() {
      let that = this
      that.$api.get('categories', {}, (res) => {
        if (res.meta.status !== 200) return that.$message.error(res.meta.msg)
        that.$message.success('获取分类数据成功')
        // console.log(res.data)
        // 分类列表
        that.cateList = res.data
      })
    },

    // 点击选择商品分类
    handleChange() {
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
      }
    },

    //点击tab切换时触发,未满足条件不发生跳转
    beforeTabsLeave(activeName, oldActiveName) {
      // console.log('即将离开的标签页' + oldActiveName)
      // console.log('即将进入的标签页' + activeName)
      // 选择第一个标签页 并且 没有填写商品名称
      if (oldActiveName === '0' && this.addForm.goods_name === '') {
        this.$message.error('请填写商品名称')
        return false
      }
      // 选择第一个标签页 并且 没有选择商品分类
      if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类')
        return false
      }
    },

    // 点击左侧 tab
    tabClick() {
      let that = this
      // 获取参数列表
      // 访问动态参数面板
      if (that.activeIndex === '1') {
        that.$api.get(`categories/${that.cateId}/attributes`, { sel: 'many' }, (res) => {
          if (res.meta.status !== 200) return that.$message.error('获取参数数据失败')
          that.$message.success('获取参数数据成功')
          // console.log(res.data)
          res.data.forEach((item) => {
            // 判断 有 attr_vals 值后 分割 item 项渲染   ===>  split 分割 字符串变数组
            item.attr_vals === '' ? [] : (item.attr_vals = item.attr_vals.split(' '))
          })
          that.manyTableData = res.data
        })
      } else if (this.activeIndex === '2') {
        // 获取静态数据
        that.$api.get(`categories/${that.cateId}/attributes`, { sel: 'only' }, (res) => {
          if (res.meta.status !== 200) return that.$message.error('获取静态属性失败')
          that.$message.success('获取静态属性成功')
          // console.log(res.data)
          that.onlyTableDate = res.data
        })
      }
    },

    // 图片预览的函数
    handlePreview(file) {
      this.previewPath = file.response.data.url
      this.dialogVisible = true
    },

    // 移除图片的函数
    handleRemove(file) {
      // 1.获取将要删除图片的临时路径
      const filePath = file.response.data.tmp_path
      // 2.从 pics 数组中找到这张图片的索引值
      // findIndex 函数找到值
      const index = this.addForm.pics.findIndex((item) => item.pic === filePath)
      // 3.用数组的 splice 方法删除
      this.addForm.pics.splice(index, 1)
      // console.log(file);
    },

    // 图片上传成功的处理函数
    handleSuccess(response) {
      // 1.拼接得到一个图片信息对象
      const picInfo = { pic: response.data.tmp_path }
      // 2.将信息添加到表单数组中
      this.addForm.pics.push(picInfo)
    },

    // 添加商品
    add(formName) {
      let that = this
      // 表单校验
      that.$refs[formName].validate((valid) => {
        if (valid) {
          // 执行商品添加的业务逻辑
          // 深拷贝
          const form = _.cloneDeep(that.addForm)
          // 将 goods_cat 转化成字符串
          form.goods_cat = form.goods_cat.join(',')

          // 处理动态参数
          that.manyTableData.forEach((item) => {
            const newInfo = {
              attr_id: item.attr_id,
              attr_value: item.attr_vals.join(' '),
            }
            that.addForm.attrs.push(newInfo)
          })

          // 处理静态属性
          that.onlyTableDate.forEach((item) => {
            const newInfo = {
              attr_id: item.attr_id,
              attr_value: item.attr_vals,
            }
            that.addForm.attrs.push(newInfo)
          })

          form.attrs = that.addForm.attrs
          // console.log(form);

          that.$api.post('goods', form, (res) => {
            if (res.meta.status !== 201) return that.$message.error(res.meta.msg)
            that.$message.success('添加成功')
            that.$router.push('/goods')
          })
        } else {
          return that.$message.error('请填写必要的表单项')
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
.addbtn {
  margin-top: 15px;
}
</style>
