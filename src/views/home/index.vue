<template>
  <div class="page">
    <div class="left">
      <el-row class="mb-10">
        <el-col :span="12">
          <el-card class="area">
            <div class="title"> 静态数据中心代理 </div>
            <el-button
              size="small"
              type="primary"
              plain
              icon="fa-solid fa-cart-plus mr-10"
              class="buy-button"
              @click="handleBuyDataCenter"
            >购买新代理</el-button>
            <el-row class="content">
              <el-col :span="8">
                <div class="content-title">独享数据中心</div>
                <span class="text-btn" @click="toDataCenterDetails">查看详情 <i class="fa-solid fa-angle-right" /></span>
              </el-col>
              <el-col :span="8">
                <div class="content-item">
                  <span class="num">{{ dataCenterUsableNum }}</span>个
                </div>
                <div class="usable">目前可用</div>
              </el-col>
              <el-col :span="8">
                <div class="content-item">
                  <span class="num">{{ dataCenterExpiring }}</span>个
                </div>
                <div class="expiring">即将过期</div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="area">
            <div class="title"> 静态住宅代理 </div>
            <el-button
              size="small"
              type="primary"
              plain
              icon="fa-solid fa-cart-plus mr-10"
              class="buy-button"
              @click="handleBuyDwelling"
            >购买新代理</el-button>
            <el-row class="content">
              <el-col :span="8">
                <div class="content-title">独享静态住宅</div>
                <span class="text-btn" @click="toDwellingDetails">查看详情 <i class="fa-solid fa-angle-right" /></span>
              </el-col>
              <el-col :span="8">
                <div class="content-item">
                  <span class="num">{{ dwellingUsableNum }}</span>个
                </div>
                <div class="usable">目前可用</div>
              </el-col>
              <el-col :span="8">
                <div class="content-item">
                  <span class="num">{{ dwellingExpiring }}</span>个
                </div>
                <div class="expiring">即将过期</div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-card class="table-card">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="`静态数据中心（${dataCenterNum}）`" name="first" />
          <el-tab-pane :label="`静态住宅（${dwellingNum}）`" name="second" />
        </el-tabs>

        <el-table :data="tableData" border>
          <el-table-column label="线路ID" align="center" prop="lineId" />
          <el-table-column label="国家" align="center" prop="country" />
          <el-table-column label="服务器地址" align="center" prop="serverAddress" />
          <el-table-column label="端口号" align="center" prop="port" />
          <el-table-column label="出口IP" align="center" prop="exitIp" />
          <el-table-column label="到期日期" align="center" prop="deadlineDate" />
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row }">
              <el-button type="text" @click="renew(row)">续费</el-button>
              <el-button type="text" @click="close(row)">关闭</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div class="right">
      <el-card class="right-card">
        <div class="user-info">
          <img :src="user.avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <div class="name">
            <div class="user-name">{{ userInfo.userName }}</div>
            <el-button type="primary" plain size="mini" @click="editUserInfo">修改资料</el-button>
          </div>
          <div class="email">
            {{ userInfo.email }}
          </div>
        </div>
        <div class="account-balance">
          <div class="balance-box">
            <span class="label">账号余额</span>
            <span class="balance">¥{{ userInfo.balance || 0 }}</span>
          </div>
          <el-button type="primary" size="small" @click="toTopUp">去充值</el-button>
        </div>
        <div class="current-ip">
          <div class="ip">
            您当前的IP地址：
            <span>{{ userInfo.currentIp }}</span>
          </div>
          <div class="home-place">
            IP归属地：{{ userInfo.homePlace }}
          </div>
          <div class="tips">
            <i class="fa-solid fa-circle-exclamation" />
            依据国家法律法规，XX所有代理产品仅支持【中国大陆地区之外】的网络环境使用
          </div>
        </div>
        <div class="ip-whitelist">
          <div class="label">IP白名单</div>
          <el-switch v-model="userInfo.whiteListSwitch" @change="whitelistChange" />
        </div>
        <div class="account">
          <div class="title">线路链接账密</div>
          <div class="account">
            账号：{{ userInfo.account }}
          </div>
          <div class="password">
            密码：
            <span v-if="showPassword">{{ userInfo.password }}</span>
            <span v-else>*******</span>
            <i v-if="showPassword" class="fa-solid fa-eye" @click="showPassword = !showPassword" />
            <i v-else class="fa-solid fa-eye-slash" @click="showPassword = !showPassword" />
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      dataCenterUsableNum: 0, // 静态数据中心代理-目前可用
      dataCenterExpiring: 0, // 静态数据中心代理-即将过期
      dwellingUsableNum: 0, // 静态住宅代理-目前可用
      dwellingExpiring: 0, // 静态住宅代理-即将过期
      activeName: 'first',
      dataCenterNum: 0,
      dwellingNum: 0,

      tableData: [
        {
          lineId: 'X123456',
          country: '美国',
          serverAddress: '127.0.0.1',
          port: 8081,
          exitIp: '192.168.0.3',
          deadlineDate: '2024-01-31 12:48'
        }
      ],
      showPassword: false,
      userInfo: {
        userName: '欢迎',
        email: 'yuyun123@gmail.com',
        balance: 100,
        currentIp: '192.134.106.115',
        homePlace: 'US-California',
        whiteListSwitch: true,
        account: 'xxxx1234xxxx',
        password: '123456'
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    handleBuyDataCenter() {
      this.$router.push('/staticData/purchasingDataCenter')
    },
    toDataCenterDetails() {
      this.$router.push('/staticData/purchasedDetails')
    },
    handleBuyDwelling() {
      this.$router.push('/staticDwelling/purchasingDwelling')
    },
    toDwellingDetails() {
      this.$router.push('/staticDwelling/purchasedDetails')
    },

    handleClick() {},

    renew(row) {
      console.log('续费', row)
    },

    close(row) {
      console.log('关闭', row)
    },

    editUserInfo() {
      console.log('修改资料')
    },

    toTopUp() {
      console.log('去充值')
    },

    whitelistChange(val) {
      if (val) {
        console.log('白名单开启')
      } else {
        console.log('白名单关闭')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  padding: 20px;
}

.left {
  flex: 1;
  flex-grow: 1;
  flex-shrink: 1;
  padding-right: 10px;

  .table-card {
    min-height: calc(100% - 190px);
  }

  .el-card {
    margin: 0 5px;
  }
}

.right {
  width: 380px;
  flex-shrink: 0;
  .right-card {
    min-height: 100%;
  }
}

.area {
  position: relative;

  .title {
    font-size: 18px;
    line-height: 32px;
  }

  .buy-button {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  .content {
    margin-top: 30px;

    .text-btn {
      cursor: pointer;
      user-select: none;
    }

    .content-item {
      line-height: 50px;
      font-size: 16px;
    }

    .content-title {
      font-size: 18px;
      line-height: 56px;
    }

    .num {
      font-size: 32px;
      margin-right: 10px;
    }

    .usable, .expiring {
      padding-left: 16px;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
    }

    .usable::after {
      background-color: #67C23A;
    }
    .expiring::after {
      background-color: #F56C6C;
    }
  }

}

.user-info {
  border-bottom: 1px solid #eee;
  padding: 0 0 20px 60px;
  position: relative;
  min-height: 50px;

  .user-avatar {
    width: 50px;
    height: 50px;
    background-color: #ccc;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
  }

  .name {
    position: relative;
    padding-right: 90px;
    line-height: 28px;

    .user-name {
      font-size: 18px;
      line-height: 28px;
      font-weight: bold;
    }

    .el-button {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .email {
    line-height: 25px;
  }
}

.account-balance {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .label {
    margin-right: 20px;
  }

  .balance {
    color: #409EFF;
  }

}

.current-ip {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  .ip {
    font-size: 18px;
     span {
      color: #409EFF;
    }
  }
  .home-place {
    font-size: 14px;
    line-height: 40px;
  }
  .tips {
    background-color: #E6A23C;
    color: #fff;
    padding: 4px 10px;
    font-size: 14px;
  }
}

.ip-whitelist {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
}

.account {
  padding: 20px 0;

  .title {
    font-size: 18px;
  }

  .password {
    display: flex;
    align-items: center;

    .fa-solid {
      margin-left: 20px;
      cursor: pointer;
    }
  }
}

</style>

