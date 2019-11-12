<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">请输入账号密码</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
export default {
  components: {
    LoginForm
  },
  methods: {
    
     handleSubmit (data) {
      localStorage.setItem('userinfo',JSON.stringify(data))
      localStorage.setItem('token',data.access_token)
       this.$router.push({
            name: this.$config.homeName
          })
    },
  }
}
</script>

<style>

</style>
