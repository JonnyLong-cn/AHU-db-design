<template>
  <div>
  <el-table :data="tableData" height="800" border style="width: 100%">
    <el-table-column prop="houseId" label="房屋Id" width="180"></el-table-column>
    <el-table-column prop="houseName" label="屋名" width="180"></el-table-column>
    <el-table-column prop="accountId" label="房主" width="180"></el-table-column>
    <el-table-column prop="designerId" label="设计师" width="180"></el-table-column>
    <el-table-column label="家居图片" width="180">
      <template slot-scope="scope">
        <el-image style="width: 100px; height: 100px" :src="scope.row.designDrawing" :preview-src-list="[scope.row.designDrawing]"></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="designerName" label="designerName"></el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      colomn: {},
      tableData: []
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    async getTableData () {
      const { data: res } = await this.$http.get('/house', {
        params: this.colomn
      })
      // if (res.status === 200) {
      //   return this.$message.data
      // }
      this.tableData = res.data
    }
  }
}
</script>
<style>
</style>
