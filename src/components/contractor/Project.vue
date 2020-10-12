<template>
  <div>
  <el-table :data="tableData" stripe style="width: 100%">
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
    <el-table-column align="left">
      <template slot-scope="scope">
        <el-button size="mini" @click="onSubmit(scope.row.projectId)">提交竞标</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ids: {
        contractor_id: ''
      },
      tableData: [],
      colomn: {}
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    // 获取房屋数据,即日程列表
    async getTableData () {
      const { data: res } = await this.$http.get('/project', {
        params: this.colomn
      })
      if (res.status === 200) {
        this.$message.success('获取数据成功！')
      }
      this.tableData = res.data
    },
    async onSubmit (projectId) {
      this.ids.contractor_id = window.sessionStorage.getItem('contractorId')
      console.log(this.ids)
      const { data: result } = await this.$http({
        method: 'put',
        url: `/project/${projectId}/bid`,
        data: this.ids,
        header: {
          'Content-Type': 'application/json'
        }
      })
      if (result.status === 200) {
        this.$message.success(result.message)
      } else {
        this.$message.error(result.message)
      }
      // const { data: result } = await this.$http.put(`/project/${projectId}/bid`, this.ids)
      console.log(result)
    }
    // 提交竞标
    // async onSubmit (projectId) {
    //   this.ids.contractor_id = window.sessionStorage.getItem('contractorId')
    //   console.log(this.ids)
    //   console.log(this.ids.contractor_id)
    //   // const { data: res } = await this.$http.put(`/project/${projectId}/bid`, this.ids)
    //   this.$axios({
    //     url: `/project/${projectId}/bid`,
    //     data: this.ids,
    //     header: {
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //     .then(res => {
    //       console.log(res.data)
    //     })
    //     .catch(Error => {
    //       console.log('error')
    //     })
    //   // return this.$message.success(res.message)
    // }
  }
}
</script>
<style>
</style>
