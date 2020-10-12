<template>
  <div>
    <!--
      <h3>账户:  {{tableData.account_name}}</h3>
      <h3>Id:  {{tableData.account_id}}</h3>
      <h3>账户余额:  {{tableData.account_remain}}</h3> -->
      <h3>账户基本信息：</h3>
      <el-form label-width="80px">
        <el-form-item label="账户名">
          <el-input v-model="tableData.account_name"></el-input>
        </el-form-item>
        <el-form-item label="账户Id">
          <el-input v-model="tableData.account_id"></el-input>
        </el-form-item>
        <el-form-item label="账户余额">
          <el-input v-model="tableData.account_remain"></el-input>
        </el-form-item>
      </el-form>
      <h3>房屋信息：</h3>
      <div v-for="item in house" :key="item.houseId">
        <el-form label-width="80px">
          <el-form-item label="房屋Id">
            <el-input v-model="item.houseId"></el-input>
          </el-form-item>
          <el-form-item label="房屋名">
            <el-input v-model="item.houseName"></el-input>
          </el-form-item>
          <el-form-item label="设计师">
            <el-input v-model="item.designerName"></el-input>
          </el-form-item>
        </el-form>
        <el-image style="width: 320px; height: 240px" :src="item.designDrawing" :preview-src-list="[item.designDrawing]"></el-image>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      account_id: '',
      tableData: {
        account_id: '',
        account_name: '',
        account_remain: ''
      },
      house: []
    }
  },
  created () {
    var id = window.sessionStorage.getItem('accountId')
    this.getTableData(id)
    this.getHouseInfo()
  },
  methods: {
    async getTableData (accountId) {
      const { data: res } = await this.$http.get(`/account/${accountId}`, {
        params: this.account_id
      })
      this.tableData = res.data
    },
    async getHouseInfo () {
      const { data: res } = await this.$http.get('/house', {
        params: {
          account_id: window.sessionStorage.getItem('accountId')
        }
      })
      this.house = res.data
    }
  }
}
</script>
<style>
</style>
