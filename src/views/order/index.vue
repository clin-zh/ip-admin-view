<template>
  <div class="page">
    <div class="title">我的订单</div>

    <el-form inline>
      <el-form-item label="订单类型：">
        <el-select v-model="formData.orderType" size="small" style="width: 120px;" clearable>
          <el-option
            v-for="item in orderTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="代理类型：">
        <el-select v-model="formData.agencyType" size="small" style="width: 120px;" clearable>
          <el-option
            v-for="item in agencyTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="国家：">
        <el-select v-model="formData.country" size="small" style="width: 120px;" clearable>
          <el-option label="所有国家" :value="''" />
          <el-option
            v-for="item in countryList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <div style="display: flex;">
          <el-select v-model="formData.lineType" size="small" style="width: 140px;">
            <el-option
              v-for="item in lineTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input v-model="formData.lineId" size="small" placeholder="请输入线路ID" />
        </div>
      </el-form-item>
      <el-form-item label="下单时间：">
        <el-date-picker
          v-model="formData.time"
          type="datetimerange"
          size="small"
          style="width: 300px;"
          range-separator="至"
          start-placeholder="起始时间"
          end-placeholder="结束时间"
        />
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" :loading="loading" @click="search">搜索</el-button>
        <el-button size="small" :loading="loading" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" border :data="tableData">
      <el-table-column label="订单号" align="center" prop="orderId" />
      <el-table-column label="订单类型" align="center" prop="orderType" />
      <el-table-column label="代理类型" align="center" prop="agencyType" />
      <el-table-column label="国家" align="center" prop="country" />
      <el-table-column label="地区" align="center" prop="area" />
      <el-table-column label="购买时长" align="center" prop="duration" />
      <el-table-column label="单价" align="center" prop="unitPrice">
        <template slot-scope="{ row }">
          <div>¥ {{ row.unitPrice }}</div>
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center" prop="num">
        <template slot-scope="{ row }">
          <div>{{ row.num }}次</div>
        </template>
      </el-table-column>
      <el-table-column label="总价" align="center" prop="totalPrice">
        <template slot-scope="{ row }">
          <div>¥ {{ row.totalPrice }}</div>
        </template>
      </el-table-column>
      <el-table-column label="下单时间" align="center" prop="createTime" />
    </el-table>

    <div class="pagination">
      <el-pagination
        :current-page="pageInfo.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        orderType: '',
        agencyType: '',
        country: '',
        lineType: '',
        lineId: '',
        time: []
      },
      orderTypeList: [
        {
          label: '全部',
          value: ''
        }
      ],
      agencyTypeList: [
        {
          label: '全部',
          value: ''
        }
      ],
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
      lineTypeList: [
        {
          label: '订单号',
          value: ''
        }
      ],
      loading: false,
      tableData: [],

      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      }

    }
  },
  created() {
    this.getData(1)
  },
  methods: {
    getData(val) {
      if (val) {
        this.pageInfo.pageNum = 1
      }
      this.loading = true
      setTimeout(() => {
        const data = [
          {
            orderId: 'X123456111',
            orderType: '新购',
            agencyType: '静态数据中心',
            country: '美国',
            area: '加利福尼亚',
            duration: '30天',
            unitPrice: 40,
            num: 1,
            totalPrice: 40,
            createTime: '2024-01-31 12:48'
          }
        ]
        this.tableData = data
        this.loading = false
      }, 1000)
    },

    search() {
      console.log('搜索', this.formData)
      this.getData(1)
    },

    reset() {
      this.formData = this.$options.data().formData
      this.getData(1)
    },

    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getData(1)
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.getData()
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
.pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
