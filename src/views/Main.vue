<template>
  <el-container>
    <el-header>
      <el-menu background-color="#393D49" text-color="#fff" active-text-color="#409eff" v-if="this.value === 1" router :default-active="$router.path" mode="horizontal">
        <el-menu-item index="/main/project">承包商页面</el-menu-item>
        <el-menu-item index="/main/house">工程页面</el-menu-item>
        <el-menu-item index="/main/supplier">供应商页面</el-menu-item>
      </el-menu>
      <el-menu background-color="#393D49" text-color="#fff" active-text-color="#409eff" v-else-if="this.value === 0" router :default-active="$router.path" mode="horizontal">
        <el-menu-item index="/main/account">房主信息</el-menu-item>
        <el-menu-item index="/main/schedule">日程列表</el-menu-item>
      </el-menu>
      <el-button type="primary" @click="loginOut" class="loginout-button">退出</el-button>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      value: 0
    }
  },
  created () {
    if (window.sessionStorage.getItem('accountId') !== null) {
      this.value = 0
    }
    if (window.sessionStorage.getItem('contractorId') !== null) {
      this.value = 1
    }
  },
  methods: {
    loginOut () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  background-color: #393D49;
  font-size: 20px;
}
</style>
