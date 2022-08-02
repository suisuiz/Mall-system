<!--
 * @Descripttion: Orders
 * @Author: SUI
 * @Date: 2022-07-19 14:40:59
 * @LastEditors: SUI
 * @LastEditTime: 2022-08-02 17:47:03
 * @FilePath: \Mall-system\src\views\order\Orders.vue
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <Bread :title="breadTitle"></Bread>

    <!-- 内容展示卡片 -->
    <el-card class="box-card">
      <!-- 搜索框 -->
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getOrderList">
            <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 内容 -->
      <!-- 订单列表数据 -->
      <el-table :data="orderList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="pay_status">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.pay_status === '1'">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" prop="create_time">
          <template slot-scope="scope">
            {{ scope.row.create_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showDialog"></el-button>
            <el-button type="success" icon="el-icon-location" size="mini" @click="showProgressBox(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页选择器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

      <!-- 修改地址 -->
      <el-dialog title="修改地址" width="50%" :visible.sync="editDialog" @close="editDialog = false">
        <el-form ref="editOrder" :model="editForm" :rules="formRules">
          <!-- prop="username"  校验 -->
          <el-form-item label="省/市/区县" prop="address1" label-width="100px">
            <el-cascader :options="cityData" v-model="editForm.address1"></el-cascader>
          </el-form-item>
          <el-form-item prop="address2" label="详细地址" label-width="100px">
            <el-input v-model="editForm.address2" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialog = false">取 消</el-button>
          <el-button type="primary" @click="editSubmitForm('editOrder')">添 加</el-button>
        </div>
      </el-dialog>

      <!-- 查看物流信息 -->
      <el-dialog title="查看物流信息" width="50%" :visible.sync="progressDialog" @close="progressDialog = false">
        <!-- 展示物流信息--时间线 timeline -->
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// 引入面包屑
import Bread from '@/components/common/Bread'
// 引入地址
import cityData from './citydata'

export default {
  name: 'Orders',
  components: { Bread },

  data() {
    return {
      // 面包屑标题
      breadTitle: { one: '订单管理', two: '订单列表' },

      // 总条数
      total: 0,

      // 查询数据
      queryInfo: {
        query: '',
        pagesize: 5,
        pagenum: 1,
      },

      // 数据展示
      orderList: [],

      // 编辑
      editDialog: false,
      editForm: {
        address1: '',
        address2: '',
      },

      // 地址数据
      cityData,
      // 校验规则
      formRules: {
        address1: [{ required: true, message: '请输入地址 ', trigger: 'change' }],
        address2: [{ required: true, message: '请输入详细地址 ', trigger: 'blur' }],
      },

      // 物流信息弹框
      progressDialog: false,
    }
  },

  created() {
    // 获取订单列表
    this.getOrderList()
  },

  methods: {
    // 获取订单列表
    getOrderList() {
      let that = this
      that.$api.get('orders', that.queryInfo, (res) => {
        if (res.meta.status !== 200) return that.$message.error('获取数据失败')
        that.$message.success('获取商订单数据成功')
        // console.log(res.data)
        // 商品总数
        that.total = res.data.total
        // 分页
        that.queryInfo.pagenum = res.data.pagenum / 1
        // 商品列表
        that.orderList = res.data.goods
      })
    },

    // 分页
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrderList()
    },

    // 编辑
    showDialog() {
      // 初始化
      this.editForm = {
        address1: '',
        address2: '',
      }
      this.editDialog = true
    },

    // 编辑订单
    editSubmitForm(formName) {
      let that = this
      // 表单校验
      that.$refs[formName].validate((valid) => {
        if (valid) {
          // 编辑订单接口
          // that.$api.put(`users/${that.editForm.id}`, that.editForm, (res) => {
          //   if (res.meta.status !== 200) return that.$message.error('修改用户失败')
          //   that.$message.success('修改用户成功')
          //   that.editDialog = false
          //   that.getUserLIst()
          // })
          that.editDialog = false
        }
      })
    },

    // 地址
    showProgressBox(row) {
      let that = this
      console.log(row)
      // 获取物流信息
      // that.$api.get(`/kuaidi/${row.order_number}`, {}, (res) => {
      that.$api.get('/kuaidi/1106975712662', {}, (res) => {
        if (res.status !== 200) return that.$message.error('获取物流信息失败')
        console.log(res.data)
        that.progressDialog = true
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 15px;
}

.el-cascader {
  width: 100%;
}
</style>
