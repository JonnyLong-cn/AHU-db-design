<template>
  <div>
    <!-- 用户列表区域 -->
    <h3>当前登录的承包商用户：{{this.contractorId}}</h3>
      <el-table ref="multipleTable" :data="tableData" border stripe @selection-change="sumSellectionPrice">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="供应商Id" prop="supplierId" width="200"></el-table-column>
        <el-table-column label="供应商" prop="supplierName"></el-table-column>
        <el-table-column label="材料" prop="material"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[1,5,10,15,20]"
        :page-size.sync="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button> -->
      <h3>选中的材料总价格为：{{sumPrice}}</h3>
      <center>
      <h2>下表将对已选中的材料进行统计</h2>
      <el-table :data="sellectionSupplier" stripe>
        <el-table-column label="供应商" prop="supplierName"  width="100"></el-table-column>
        <el-table-column label="材料" prop="material" width="100"></el-table-column>
        <el-table-column label="价格" prop="price" width="100"></el-table-column>
      </el-table>
      </center>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,
      sumPrice: 0,
      multipleSelection: '',
      sellectionSupplier: [],
      contractorId: ''
    }
  },
  created () {
    this.getTableData()
    this.getSession()
  },
  methods: {
    getSession () {
      this.contractorId = window.sessionStorage.getItem('contractorId')
    },
    // 监听pagesize改变
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pageSize = newSize
      this.getTableData()
    },
    // 监听页码值改变
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryInfo.pageNum = newPage
      this.getTableData()
    },
    async getTableData () {
      const { data: res } = await this.$http.get('/supplier', {
        params: this.queryInfo
      })
      if (res.data !== null) {
        console.log(res.data)
      }
      this.tableData = res.data.records
      this.total = res.data.total
      this.queryInfo.pageSize = res.data.size
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    sumSellectionPrice () {
      var len = this.$refs.multipleTable.selection.length
      var sum = 0
      for (let i = 0; i < len; i++) {
        console.log(this.$refs.multipleTable.selection[i].price)
        sum = sum + this.$refs.multipleTable.selection[i].price
      }
      this.sumPrice = sum
      this.sellectionSupplier = this.$refs.multipleTable.selection
    }
  }
}
</script>

<style>
</style>
