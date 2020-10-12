<template>
  <div>
  <el-table :data="tableData1" stripe style="width: 100%">
    <el-table-column prop="projectId" label="工程Id" width="180"></el-table-column>
    <el-table-column prop="projectName" label="日程" width="180"></el-table-column>
    <el-table-column label="工程进度" width="180">
      <template slot-scope="scope">
        <el-progress type="circle" :percentage="scope.row.projectProcess*100"></el-progress>
      </template>
    </el-table-column>
    <el-table-column prop="contractorId" label="承包商Id" width="180"></el-table-column>
    <el-table-column prop="contractorName" label="承包商" width="180"></el-table-column>
    <el-table-column prop="houseId" label="房屋Id" width="180"></el-table-column>
  </el-table>
  <h2>查找某工程相关该供应商：</h2>
  <el-input v-model="myinput" placeholder="请输入要查询的工程Id" style="width:200px"></el-input>
  <el-button type="primary" icon="el-icon-search" @click="getTableDate2()" style="margin-left: 20px">搜索</el-button>
  <el-table :data="tableData2" stripe style="width: 100%">
    <el-table-column prop="supplierId" label="供应商Id" width="180"></el-table-column>
    <el-table-column prop="supplierName" label="供应商" width="180"></el-table-column>
    <el-table-column prop="material" label="材料" width="180"></el-table-column>
    <el-table-column prop="price" label="价格" width="180"></el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData1: [],
      tableData2: [],
      myinput: '',
      project_id: '11'
    }
  },
  created () {
    this.getTableData1()
  },
  methods: {
    // 获取房屋数据,即日程列表
    async getTableData1 () {
      const { data: res } = await this.$http.get('/project', {
        params: this.colomn
      })
      this.tableData1 = res.data
    },
    async getTableDate2 () {
      var projectId = this.myinput
      console.log('projectId=' + projectId)
      const { data: res } = await this.$http.get(`/project/${projectId}/supplier`)
      console.log(res.data)
      this.tableData2 = res.data
    }
  }
}
</script>
<style>
</style>
