<template>
  <div class="page">
    <div class="title">已购静态数据中心线路明细</div>
    <el-form inline>
      <el-form-item label="线路状态：">
        <el-select v-model="formData.lineStatus" size="small" style="width: 150px;">
          <el-option
            v-for="item in lineStatusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="国家：">
        <el-select v-model="formData.country" size="small" style="width: 150px;">
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
          <el-select v-model="formData.keywordType" size="small" style="width: 120px;flex-shrink: 0;">
            <el-option
              v-for="item in keywordTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
          <el-input v-model="formData.keyword" size="small" :placeholder="placeholder" />
        </div>
      </el-form-item>
      <el-form-item>
        <div style="display: flex;align-items: center;">
          <el-select v-model="formData.timeType" size="small" style="width: 120px;flex-shrink: 0;">
            <el-option
              v-for="item in timeTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
          <el-date-picker
            v-model="formData.time"
            type="datetimerange"
            size="small"
            range-separator="至"
            start-placeholder="起始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" :loading="loading" @click="search">搜索</el-button>
        <el-button size="small" :loading="loading" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" v-loading="loading" border :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" />
      <el-table-column label="线路ID" align="center" prop="lineId" />
      <el-table-column label="线路状态" align="center" prop="lineStatus" />
      <el-table-column label="国家" align="center" prop="country" />
      <el-table-column label="地区" align="center" prop="area" />
      <el-table-column label="服务器地址" align="center" prop="serverAddress" />
      <el-table-column label="端口号" align="center" prop="port" />
      <el-table-column label="出口IP" align="center" prop="exitIp" />
      <el-table-column label="购买时间" align="center" prop="purchaseTime" />
      <el-table-column label="到期时间" align="center" prop="maturityTime" />
      <el-table-column label="是否自动需求" align="center" prop="isAuto">
        <template slot-scope="{ row }">
          <span>{{ row.isAuto ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button v-if="row.isAuto" type="text" @click="handleAuto(row)">取消自动续费</el-button>
          <el-button v-else type="text" @click="handleAuto(row)">自动续费</el-button>
        </template>
      </el-table-column>
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

    <div class="footer">
      <el-button size="small" @click="handleClickCancelSelect">取消</el-button>
      <el-button type="primary" size="small" @click="handleClickAuto">自动续费</el-button>
      <el-button type="primary" size="small" @click="handleClickCancel">取消自动续费</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        lineStatus: '',
        country: '',
        keywordType: 'lineId',
        keyword: '',
        timeType: 'purchaseTime',
        time: []
      },
      lineStatusList: [
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
      keywordTypeList: [
        {
          name: '线路ID',
          value: 'lineId'
        },
        {
          name: '服务器',
          value: 'server'
        },
        {
          name: '出口IP',
          value: 'exitIp'
        },
        {
          name: '端口号',
          value: 'port'
        }
      ],
      timeTypeList: [
        {
          name: '购买时间',
          value: 'purchaseTime'
        },
        {
          name: '到期时间',
          value: 'maturityTime'
        }
      ],
      tableData: [],
      multipleSelection: [],

      loading: false,
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      }
    }
  },
  computed: {
    placeholder() {
      const type = this.keywordTypeList.find(item => item.value === this.formData.keywordType)
      return `请输入${type ? type.name : ''}`
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
            id: 1,
            lineId: 'X123456',
            lineStatus: '可用',
            country: '美国',
            area: '加利福尼亚',
            serverAddress: '127.0.0.1',
            port: '8081',
            exitIp: '192.168.0.1',
            purchaseTime: '2024-01-12 12:48',
            maturityTime: '2024-01-31 12:48',
            isAuto: true
          },
          {
            id: 2,
            lineId: 'X123456',
            lineStatus: '过期',
            country: '美国',
            area: '加利福尼亚',
            serverAddress: '127.0.0.1',
            port: '8081',
            exitIp: '192.168.0.1',
            purchaseTime: '2024-01-12 12:48',
            maturityTime: '2024-01-31 12:48',
            isAuto: false
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

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    handleAuto(row) {
      if (row.isAuto) {
        console.log('取消自动续费')
      } else {
        console.log('自动续费')
      }
    },

    handleClickCancelSelect() {
      this.$refs.multipleTable.clearSelection()
    },

    handleClickAuto() {
      if (this.multipleSelection.length <= 0) {
        return this.$message.error('请勾选数据')
      }
      console.log('批量自动续费', this.multipleSelection)
    },

    handleClickCancel() {
      if (this.multipleSelection.length <= 0) {
        return this.$message.error('请勾选数据')
      }
      console.log('批量取消自动续费', this.multipleSelection)
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

  .footer {
    width: 100%;
    height: 80px;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #ccc;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 30px;
    box-sizing: border-box;
  }
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
