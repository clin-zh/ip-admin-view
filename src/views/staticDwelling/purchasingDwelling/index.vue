<template>
  <div class="page">
    <div class="title">购买静态住宅代理</div>
    <el-form ref="formRef" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="需求国家" prop="country">
        <el-select v-model="formData.country" size="small" clearable @change="handleCountryChange">
          <el-option
            v-for="item in countryList"
            :key="item.value"
            :label="`${item.name}（${item.value}）`"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="formData.area" size="small" clearable>
          <el-option
            v-for="item in areaList"
            :key="item.value"
            :label="`${item.name}（${item.value}）`"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="IP购买数数量" required>
        <el-input-number v-model="formData.quantity" size="small" :min="1" :precision="0" />
      </el-form-item>
      <el-form-item label="购买时长" required>
        <el-radio-group v-model="formData.duration" size="small">
          <el-radio-button
            v-for="item in durationList"
            :key="item.value"
            :label="item.value"
          >{{ item.label }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="交付协议" required>
        <el-radio-group v-model="formData.agreement" size="small">
          <el-radio-button
            v-for="item in agreementList"
            :key="item.value"
            :label="item.value"
          >{{ item.label }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="IP授权类型">
        <el-radio-group v-model="formData.authorizationType" size="small">
          <el-radio-button
            v-for="item in authorizationTypeList"
            :key="item.value"
            :label="item.value"
          >{{ item.label }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="footer">
      <div class="left">
        已选
        <span v-if="formData.country" class="country-name">
          {{ countryName }} - {{ formData.country }}
        </span>
      </div>
      <div class="right">
        <div class="unit-price">
          <div class="label">单价：</div>
          <div class="price">
            <div style="color: #409EFF;">{{ price.unitPrice }}元</div>
            <div class="old-price">{{ price.oldUnitPrice }}元</div>
          </div>
        </div>
        <div class="total-price">
          <div class="label">总价：</div>
          <div class="price">
            <div style="color: #F56C6C;">{{ price.totalPrice }}元</div>
            <div class="old-price">{{ price.oldTotalPrice }}元</div>
          </div>
        </div>
        <el-button type="primary" size="small" :loading="loading" @click="confirmBuy">{{ loading ? '购买中' : '确认购买' }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        country: '',
        area: '',
        quantity: 1,
        duration: 1,
        agreement: 1,
        authorizationType: 1
      },
      rules: {
        country: [{
          required: true,
          trigger: 'change',
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请选择需求国家'))
            }
            if (!this.formData.area) {
              return callback(new Error('请选择地区'))
            }
            callback()
          }
        }]
      },
      countryList: [
        {
          name: '美国',
          value: 'US',
          areaList: [
            {
              name: '加利福尼亚',
              value: 'California'
            }
          ]
        }
      ],
      durationList: [
        {
          label: '30天',
          value: 1
        },
        {
          label: '60天',
          value: 2
        },
        {
          label: '90天',
          value: 3
        },
        {
          label: '180天',
          value: 4
        },
        {
          label: '270天',
          value: 5
        },
        {
          label: '1年',
          value: 6
        },
        {
          label: '2年',
          value: 7
        }
      ],
      agreementList: [
        {
          label: 'HTTPS',
          value: 1
        },
        {
          label: 'Socks',
          value: 2
        }
      ],
      authorizationTypeList: [
        {
          label: '独享',
          value: 1
        }
      ],
      loading: false,
      price: {
        unitPrice: 35,
        oldUnitPrice: 35,
        totalPrice: 35,
        oldTotalPrice: 35
      }
    }
  },
  computed: {
    countryName() {
      const country = this.countryList.find(item => item.value === this.formData.country)
      return country && country.name || ''
    },
    areaList() {
      const country = this.countryList.find(item => item.value === this.formData.country)
      return country && country.areaList || []
    }
  },
  methods: {
    handleCountryChange(val) {
      if (!val) {
        this.formData.area = ''
      }
    },

    confirmBuy() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.loading = true
          setTimeout(() => {
            this.$alert('您的账号余额不足以支付本次购买，请联系客服', '购买失败', {
              confirmButtonText: '联系客服',
              center: true
            }).then(() => {
              console.log('联系客服')
            }).catch(() => {})
            this.loading = false
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding-bottom: 80px !important;
  min-height: calc(100vh - 50px);
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

.footer {
  width: 100%;
  height: 80px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1000;
  border-top: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  .left {
    font-weight: bold;
    .country-name {
      color: #409EFF;
      margin-left: 10px;
    }
  }
  .right {
    display: flex;
    align-items: center;
  }
  .unit-price, .total-price {
    display: flex;
    align-items: center;
    margin-right: 40px;
    .label {
      margin-right: 10px;
    }
    .price {
      font-weight: bold;
    }
    .old-price {
      text-decoration: line-through;
    }
  }
}

</style>
