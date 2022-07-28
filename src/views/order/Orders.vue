<!--
 * @Descripttion: Orders
 * @Author: SUI
 * @Date: 2022-07-19 14:40:59
 * @LastEditors: SUI
 * @LastEditTime: 2022-07-28 09:21:47
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

      <!-- 查看物流信息 -->
    </el-card>
  </div>
</template>

<script>
// 引入面包屑
import Bread from '@/components/common/Bread'
export default {
  name: 'Orders',
  components: { Bread },

  data() {
    return {
      // 面包屑标题
      breadTitle: { one: '订单管理', two: '订单列表' },
    }
  },

  created() {
    //
  },

  methods: {
    //
  },
}
</script>

<style lang="scss" scoped></style>
