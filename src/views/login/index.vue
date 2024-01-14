<template>
  <div class="login-page">
    <div class="logo">
      <div class="logo-icon" />
      <span>项目LOGO</span>
    </div>
    <div class="login-box">
      <div class="title">欢迎使用XXXX</div>
      <el-form ref="loginForm" :model="loginForm" :rules="rules">
        <el-form-item prop="email">
          <el-input v-model="loginForm.email" placeholder="请输入邮箱账号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入登录密码" show-password clearable />
        </el-form-item>
      </el-form>
      <el-checkbox v-model="isAgree" class="checkbox">
        我已经阅读并且同意
        <a class="link" href="https://privacy.baidu.com/policy" target="__blank">隐私协议</a>
        和
        <a class="link" href="https://passport.baidu.com/static/passpc-account/html/protocal.html" target="__blank">法律条款</a>
      </el-checkbox>
      <div class="login-button">
        <el-button type="primary" style="width: 100%;" :loading="loading" :disabled="!isAgree" @click="handleLogin">登录</el-button>
      </div>
      <div class="register">
        没有账号 <el-button type="text" @click="toRegister">立即注册</el-button>
      </div>
    </div>
    <div class="tips">
      XXX代理产品不支持任何形式的翻墙服务，仅支持在境外网络环境下合法合规使用
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      isAgree: false,
      rules: {
        email: [{
          required: true,
          trigger: 'blur',
          message: '请输入邮箱账号'
        }],
        password: [{
          required: true,
          trigger: 'blur',
          message: '请输入密码'
        }]
      },
      loading: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch((err) => {
              console.error(err)
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toRegister() {
      this.$router.push('/register')
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/images/bg-image.png');
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.login-box {
  width: 500px;
  padding: 30px;
  background-color: #fff;
  z-index: 1000;

  .title {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .login-button {
    margin-top: 10px;
  }

  .register {
    margin-top: 10px;
  }
}

.logo {
  width: 200px;
  height: 80px;
  padding-left: 70px;
  position: absolute;
  top: 20px;
  left: 50px;
  display: flex;
  align-items: center;
  font-size: 20px;

  .logo-icon {
    width: 50px;
    height: 30px;
    background-color: #ccc;
    position: absolute;
    left: 10px;
    top: 25px;
  }
}

.checkbox {
  ::v-deep .el-checkbox__label {
    color: #606266;
  }
  .link {
    color: #409EFF;
    text-decoration: none;
  }
}

.tips {
  text-align: center;
  position: absolute;
  bottom: 50px;
  color: #409EFF;
}
</style>

// <style lang="scss">
// /* 修复input 背景不协调 和光标变色 */
// /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

// $bg:#283443;
// $light_gray:#fff;
// $cursor: #fff;

// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $cursor;
//   }
// }

// /* reset element-ui css */
// .login-container {
//   .el-input {
//     display: inline-block;
//     height: 47px;
//     width: 85%;

//     input {
//       background: transparent;
//       border: 0px;
//       -webkit-appearance: none;
//       border-radius: 0px;
//       padding: 12px 5px 12px 15px;
//       color: $light_gray;
//       height: 47px;
//       caret-color: $cursor;

//       &:-webkit-autofill {
//         box-shadow: 0 0 0px 1000px $bg inset !important;
//         -webkit-text-fill-color: $cursor !important;
//       }
//     }
//   }

//   .el-form-item {
//     border: 1px solid rgba(255, 255, 255, 0.1);
//     background: rgba(0, 0, 0, 0.1);
//     border-radius: 5px;
//     color: #454545;
//   }
// }
// </style>

// <style lang="scss" scoped>
// $bg:#2d3a4b;
// $dark_gray:#889aa4;
// $light_gray:#eee;

// .login-container {
//   min-height: 100%;
//   width: 100%;
//   background-color: $bg;
//   overflow: hidden;

//   .login-form {
//     position: relative;
//     width: 520px;
//     max-width: 100%;
//     padding: 160px 35px 0;
//     margin: 0 auto;
//     overflow: hidden;
//   }

//   .tips {
//     font-size: 14px;
//     color: #fff;
//     margin-bottom: 10px;

//     span {
//       &:first-of-type {
//         margin-right: 16px;
//       }
//     }
//   }

//   .svg-container {
//     padding: 6px 5px 6px 15px;
//     color: $dark_gray;
//     vertical-align: middle;
//     width: 30px;
//     display: inline-block;
//   }

//   .title-container {
//     position: relative;

//     .title {
//       font-size: 26px;
//       color: $light_gray;
//       margin: 0px auto 40px auto;
//       text-align: center;
//       font-weight: bold;
//     }
//   }

//   .show-pwd {
//     position: absolute;
//     right: 10px;
//     top: 7px;
//     font-size: 16px;
//     color: $dark_gray;
//     cursor: pointer;
//     user-select: none;
//   }

//   .thirdparty-button {
//     position: absolute;
//     right: 0;
//     bottom: 6px;
//   }

//   @media only screen and (max-width: 470px) {
//     .thirdparty-button {
//       display: none;
//     }
//   }
// }
// </style>
