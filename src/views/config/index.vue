<template>
  <div class="page">
    <div class="title">自动续费</div>
    <div class="content">
      <div class="content-item">
        <div class="label">静态数据中心自动续费</div>
        <el-switch v-model="formData.autoDataCenter" @change="handleAutoDataCenterChange" />
      </div>
      <div class="content-item">
        <div class="label">静态住宅自动续费</div>
        <el-switch v-model="formData.autoDwelling" @change="handleAutoDwellingChange" />
      </div>
    </div>

    <div class="title">IP白名单认证</div>
    <div class="content">
      <div class="content-item">
        <div class="label">开启认证</div>
        <el-switch v-model="formData.authentication" @change="handleAuthenticationChange" />
      </div>
      <div class="add-white-list">
        <div class="label">添加白名单地址</div>
        <p class="tips">IP 地址操作添加开启IP白名单认证前，请确认你配置线路的环境IP在IP列表内。中国大陆地区的IP不能设置为白名单，IP白名单同步时间为5-10分钟</p>
        <div class="add-area">
          <el-input v-model="formData.whiteList" size="small" />
          <el-button type="primary" size="small" @click="addWhiteList">添加</el-button>
        </div>
      </div>

      <div class="label">已添加白名单</div>
      <div class="table">
        <el-table border :data="tableData">
          <el-table-column label="地址" align="center" prop="ip" />
          <el-table-column label="状态" align="center" prop="status">
            <template slot-scope="{ row }">
              <div>{{ row.status ? '启用' : '禁用' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row }">
              <div>
                <el-button v-if="!row.status" type="text" @click="enable(row)">启用</el-button>
                <el-button v-else type="text" @click="forbidden(row)">禁用</el-button>
                <el-button type="text" @click="del(row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="title">修改密码</div>
    <el-form ref="passwordForm" label-width="120px" style="width: 400px;" :model="passwordForm" :rules="rules" :hide-required-asterisk="true">
      <el-form-item label="旧密码：" prop="oldPassword">
        <el-input v-model="passwordForm.oldPassword" size="small" />
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassword">
        <el-input v-model="passwordForm.newPassword" size="small" />
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirmPassword">
        <el-input v-model="passwordForm.confirmPassword" size="small" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" style="width: 100px;" @click="confirmChangePassword">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        autoDataCenter: false,
        autoDwelling: false,
        authentication: false,
        whiteList: ''
      },
      tableData: [
        {
          id: 1,
          ip: '172.0.0.1',
          status: true
        },
        {
          id: 2,
          ip: '172.0.0.1',
          status: false
        }
      ],
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [{
          required: true,
          trigger: 'blur',
          message: '请输入旧密码'
        }],
        newPassword: [{
          required: true,
          trigger: 'blur',
          message: '新密码不能为空'
        }],
        confirmPassword: [{
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error('新密码不能为空'))
            }
            if (value !== this.passwordForm.newPassword) {
              return callback(new Error('两次密码输入不一致'))
            }
            callback()
          }
        }]
      }
    }
  },
  methods: {
    handleAutoDataCenterChange() {
      console.log('静态数据中心自动续费更改')
    },

    handleAutoDwellingChange() {
      console.log('静态住宅自动续费更改')
    },

    handleAuthenticationChange() {
      console.log('开启认证更改')
    },

    // 添加白名单
    addWhiteList() {
      if (!this.formData.whiteList) {
        return this.$message.error('请输入白名单地址')
      }
      console.log('添加白名单')
    },

    // 启用
    enable(row) {
      console.log('启用', row)
    },
    // 禁用
    forbidden(row) {
      console.log('禁用', row)
    },
    // 删除
    del(row) {
      console.log('删除', row)
    },

    confirmChangePassword() {
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          console.log('成功')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding-bottom: 80px !important;
  position: relative;
  padding: 20px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #DCDFE6;
  padding-bottom: 20px;
  margin-bottom: 20px;
}
.content {
  margin-bottom: 40px;
  width: 610px;

  .content-item {
    display: flex;
    margin-bottom: 20px;
  }
  .add-white-list {
    margin: 40px 0;

    .tips {
      margin: 15px 0;
    }

    .add-area {
      display: flex;

      .el-input {
        width: 300px;
        margin-right: 10px;
      }

      .el-button {
        width: 100px;
      }
    }
  }
  .label {
    width: 400px;
    font-size: 18px;
  }
  .el-table {
    margin-top: 20px;
  }
}
</style>

