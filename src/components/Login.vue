<template>
  <div class="login_container">
    <div class="login_box">
      <!-- header -->
      <div class="avatar_box">
        <img src="../assets/picture/logo.png" alt />
      </div>
      <!-- login form -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!-- 按钮区域 -->
        <div class="btns">
            <el-button type="primary" @click="login">Login</el-button>
            <el-button type="info" @click="resetLoginForm">Reset</el-button>
        </div>
      </el-form>
    </div>
    <div class="footer">
      <span>小组成员：杨前、龙征宇、方震、潘濛濛</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //   登陆表单的数据
      loginForm: {
        username: '房主2',
        password: '123456'
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      },
      options: [{
        value: 0,
        label: '房主'
      }, {
        value: 1,
        label: '承包商'
      }],
      value: 0
    }
  },
  methods: {
    // 重置登陆表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        if (this.value === 0) {
          const { data: res } = await this.$http.post('/account/login', this.loginForm)
          if (res.status !== 200) {
            return this.$message.error('Login failed!!!')
          }
          this.$message.success('Login succeed!!!')
          // window.sessionStorage.setItem('token', res.data.token)
          window.sessionStorage.setItem('accountId', res.data.accountId)
          this.$router.push('/main/account')
        } else {
          const { data: res } = await this.$http.post('/contractor/login', this.loginForm)
          if (res.status !== 200) {
            window.alert('请求错误')
            return this.$message.error('Login failed!!!')
          }
          this.$message.success('Login succeed!!!')
          console.log(res.data)
          window.sessionStorage.setItem('contractorId', res.data.contractorId)
          this.$router.push('/main/project')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-image: url("../assets/picture/login.png");
  background-repeat: round;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -70%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}

.footer{
  color: rgb(255, 255, 255);
  position: relative;
  top: 95%;
  text-align: center;
}
</style>
