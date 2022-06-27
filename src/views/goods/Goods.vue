<!--
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2022-06-22 16:54:14
 * @LastEditors: SUI
 * @LastEditTime: 2022-06-27 10:17:58
 * @FilePath: \Mall-system\src\views\goods\Goods.vue
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <Bread :title="breadTitle"></Bread>

    <!-- 内容展示卡片 -->
    <el-card class="box-card">
      <!-- 搜索和添加 -->
      <el-row :gutter="20">
        <!-- 搜索 -->
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <!-- 添加商品 -->
        <el-col :span="4">
          <el-button type="primary" @click="addGoods">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- 表格数据 -->
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格（元）" prop="goods_price" width="100px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="100px"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="190px">
          <!-- 转换 -->
          <template slot-scope="scope">
            {{ scope.row.add_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.goods_id)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeGoodsById(scope.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryInfo.pagenum"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalpage"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
// 引入面包屑
import Bread from '@/components/common/Bread'
export default {
  name: 'Goods',
  components: { Bread },
  data() {
    return {
      // 面包屑标题
      breadTitle: {
        one: '商品管理',
        two: '商品列表',
      },

      // 请求参数
      queryInfo: {
        // 查询参数
        query: '',
        // 当前页数
        pagenum: 1,
        // 每页显示条数
        pagesize: 10,
      },
      // 商品列表数据
      goodsList: [],
      // 商品总数
      totalpage: 0,
    }
  },

  created() {
    // 获取商品数据
    this.getGoodsList()
  },

  methods: {
    // 获取商品列表数据
    getGoodsList() {
      let that = this
      that.$api.get('goods', that.queryInfo, (res) => {
        if (res.meta.status !== 200) return that.$message.error(res.meta.msg)
        that.$message.success('获取商品列表数据成功')
        // console.log(res.data)
        // 当前页数
        that.queryInfo.pagenum = res.data.pagenum * 1
        // 商品总数
        that.totalpage = res.data.total
        // 商品列表
        that.goodsList = res.data.goods
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
