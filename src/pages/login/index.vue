<template>
  <div class="login-container">
    <div class="left">
      <dir class="content">
        <div class="title">
          <span class="wel">Welcome to </span> <span class="the">VUE-SSR</span>
        </div>
        <div class="sub-title">log in to access your account</div>
      </dir>
    </div>
    <div class="right">
      <el-form ref="loginForm"
               :model="loginForm"
               :rules="loginRules"
               class="login-form"
               auto-complete="on"
               label-position="left">
        <div class="title-container">
          <h3 class="title">Login</h3>
        </div>
        <el-form-item prop="username">
          <el-input ref="username"
                    size="medium"
                    v-model="loginForm.username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    tabindex="5"
                    auto-complete="on">
            <img slot="prefix"
                 src="./img/user.svg">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :key="passwordType"
                    ref="password"
                    size="medium"
                    v-model="loginForm.password"
                    :type="passwordType"
                    placeholder="Password"
                    name="password"
                    tabindex="2"
                    auto-complete="on"
                    @keyup.enter.native="handleLogin">
            <img slot="prefix"
                 src="./img/password.svg">
            <span class="show-pwd"
                  slot="suffix"
                  @click="showPwd">
              <img v-if="passwordType === 'password'"
                   src="./img/eye.svg">
              <img v-else
                   src="./img/eye-open.svg">
            </span>
          </el-input>
        </el-form-item>
        <el-button :loading="loading"
                   type="primary"
                   class="submit"
                   @click.native.prevent="handleLogin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import { validUsername } from '@/util/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "./style/reset.scss";
</style>

<style lang="scss" scoped>
@import "./style/index.scss";
</style>
