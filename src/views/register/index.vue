<template>
  <div class="register-page">
    <div class="logo">
      <div class="logo-icon" />
      <span>项目LOGO</span>
    </div>
    <div class="register-box">
      <div class="title">欢迎注册XXXX代理</div>
      <el-form ref="formRef" :model="formData" :rules="rules">
        <el-form-item prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱账号" clearable />
        </el-form-item>
        <el-form-item prop="smsCode">
          <div class="sms-code">
            <el-input v-model="formData.smsCode" placeholder="请输入验证码" clearable />
            <el-button type="primary" :disabled="countdown > 0" @click="getSmsCode">{{ countdown > 0 ? `${countdown}s` : '发送验证码' }}</el-button>
          </div>
        </el-form-item>
        <el-form-item prop="password1">
          <el-input v-model="formData.password1" placeholder="请输入登录密码" show-password clearable />
        </el-form-item>
        <el-form-item prop="password2">
          <el-input v-model="formData.password2" placeholder="确认登录密码" show-password clearable />
        </el-form-item>
        <el-form-item prop="purpose">
          <el-select v-model="formData.purpose" placeholder="请选择业务用途" clearable style="width: 100%;">
            <el-option
              v-for="item in purposeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.inviteCode" placeholder="邀请码（可选）" clearable />
        </el-form-item>
      </el-form>
      <el-checkbox v-model="isAgree" class="checkbox">
        我已经阅读并且同意
        <a class="link" href="https://privacy.baidu.com/policy" target="__blank">隐私协议</a>
        和
        <a class="link" href="https://passport.baidu.com/static/passpc-account/html/protocal.html" target="__blank">法律条款</a>
      </el-checkbox>
      <div class="register-button">
        <el-button type="primary" style="width: 100%;" :loading="loading" :disabled="!isAgree" @click="register">立即注册</el-button>
      </div>
      <div class="login">
        已有账号 <el-button type="text" @click="toLogin">立即登录</el-button>
      </div>
    </div>
    <div class="tips">
      XXX代理产品不支持任何形式的翻墙服务，仅支持在境外网络环境下合法合规使用
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: '',
        smsCode: '',
        password1: '',
        password2: '',
        purpose: '',
        inviteCode: ''
      },
      isAgree: '',
      countdown: 0,
      timer: null,
      rules: {
        email: [{
          required: true,
          trigger: 'blur',
          message: '请输入邮箱账号'
        }],
        smsCode: [{
          required: true,
          trigger: 'blur',
          message: '请输入验证码'
        }],
        password1: [{
          required: true,
          trigger: 'blur',
          message: '请输入登录密码'
        }],
        password2: [{
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error('密码不能为空'))
            }
            if (value !== this.formData.password1) {
              return callback(new Error('两次密码输入不一致'))
            }
            callback()
          }
        }],
        purpose: [{
          required: true,
          trigger: 'blur',
          message: '请选择业务用途'
        }]
      },
      purposeList: [
        {
          label: 'Palpay',
          value: 'Palpay'
        },
        {
          label: 'Amazon',
          value: 'Amazon'
        },
        {
          label: 'Shopify',
          value: 'Shopify'
        }
      ],
      loading: false
    }
  },
  methods: {
    getSmsCode() {
      this.$refs.formRef.validateField('email', error => {
        if (!error) {
          this.countdown = 60
          this.timer = setInterval(() => {
            this.countdown--
            if (this.countdown === 0) {
              clearInterval(this.timer)
            }
          }, 1000)
        }
      })
    },

    register() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.$router.push('/home')
          }, 1000)
        }
      })
    },

    toLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.register-page {
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/images/bg-image.png');
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.register-box {
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

  .sms-code {
    display: flex;

    .el-button {
      width: 240px;
      margin-left: 10px;
    }
  }

  .register-button {
    margin-top: 10px;
  }

  .login {
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
