<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-11-08 10:34:38
 * @LastEditTime: 2022-04-29 15:19:31
 * @LastEditors: NMTuan
 * @Description: 表格列表
 * @FilePath: \ezAdmin\components\myTable\index.vue
-->
<template>
  <div>
    <div
      v-loading="$fetchState.pending"
      class="myTable flex flex-col h-full overflow-hidden"
    >
      <!-- 头部操作区域 -->
      <div class="p-4 border-b shadow relative z-10">
        <!-- <pre>{{ query }}</pre> -->

        <div
          v-if="actions.length > 0"
          class="flex items-center flex-1"
        >
          <div class="flex-1">
            <el-button
              v-for="(action, index) in actions"
              :key="`action${index}`"
              v-check="action.toName"
              :type="action.type || ''"
              v-bind="{size: 'small', ...action.elProps}"
              :disabled="handlerActionDisabled(action)"
              @click="handlerActionClick(action)"
            >
              {{ action.label }}
            </el-button>
          </div>
          <div
            v-if="searchItems.length > 0"
            class="flex-shrink-0 flex items-center"
          >
            <my-form
              v-model="query"
              :fields="baseSearchItems"
              :el-props="{
                inline: true,
                size: 'small'
              }"
              :buttons="searchButtons"
              @handleSearch="handleSearch"
              @showAdvSearchDialog="showAdvSearchDialog"
            />

            <!-- <el-dropdown
              split-button
              type="primary"
              size="small"
              class="ml-2"
              trigger="click"
              @click="handleSearch"
              @command="searchCommand"
            >
              搜索
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <excel
                    :fetch="exportSearch"
                    :stringify-long-num="true"
                    :fields="exportTitle()"
                    :name="`${$dayjs().format('YYYY_MM_DD_HH_mm_ss')}.xls`"
                    style="display: inline"
                  >
                    导出结果
                  </excel>
                </el-dropdown-item>
                <el-dropdown-item command="resetSearch">
                  重置查询
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="searchItems.length > baseSearchNumber"
                  command="showAdvSearchDialog"
                >
                  高级查询
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
          </div>
        </div>
      </div>

      <!-- 表格主体 -->
      <div class="flex-1 overflow-auto p-4 bg-secondPrimary-100">
        <slot name="beforeTable" :fetchData="fetchData" />
        <el-table
          class="shadow rounded"
          v-bind="tableProps"
          @current-change="handlerTableCurrentChange"
          @selection-change="handlerTableSelectChange"
        >
          <el-table-column
            v-if="type"
            :type="type"
          />
          <template v-for="(field, index) in fields">
            <el-table-column
              :key="`tableColumn${index}`"
              v-bind="field.elProps"
              :prop="field.field "
              :label="field.label"
            >
              <template #default="{ row, column, $index }">
                <slot
                  :name="field.field && field.field.replaceAll('.', '_')"
                  :field="field"
                  :row="row"
                  :rowIndex="$index"
                  :column="column"
                  :columnIndex="index"
                  :value="handlerValue(field, row)"
                >
                  <my-table-column
                    :field="field"
                    :row="row"
                    :column="column"
                    :value="handlerValue(field, row)"
                  />
                </slot>
              </template>
            </el-table-column>
          </template>
        </el-table>
        <slot name="afterTable" :fetchData="fetchData" />
      </div>

      <!-- 分页 -->
      <div v-if="fetchApi" class="flex items-center p-3 border-t">
        <div class="flex-shrink-0 text-center">
          <i
            class="
              ri-refresh-line
              block
              w-7
              h-7
              mr-1
              leading-7
              bg-gray-100
              text-gray-400
              rounded-sm
              cursor-pointer
              hover:text-white hover:bg-primary-400
            "
            @click="$fetch"
          />
        </div>
        <el-pagination
          background
          layout=" prev, pager, next, jumper, ->, sizes, total"
          :current-page="query[queryPageKey]"
          class="flex-1"
          :page-size="query[queryLimitKey]"
          :total="fetchTotalData"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <my-layout-view />
    <!-- 高级搜索 -->
    <my-dialog-adv-search
      v-if="advSearchDialogState"
      v-model="query"
      :show="advSearchDialogState"
      v-bind="advSearchProps"
      @search="handleSearch"
      @cancel="hideAdvSearchDialog"
    />
  </div>
</template>
<script>
export default {
  props: {
    // 列表项
    fields: {
      type: Array,
      default () {
        return []
      }
    },
    // 列首显示编号、复选、展开。
    // selection/index/expand
    type: {
      type: String,
      default: '',
      validator (value) {
        if (!value) {
          return true
        }
        return ['selection', 'index', 'expand'].includes(value)
      }
    },
    // 静态数据
    data: {
      type: Array,
      default () {
        return []
      }
    },
    // 异步数据接口, 默认空. 空时不执行异步操作
    fetchApi: {
      type: Function,
      default: undefined
    },
    // 拉取数据的参数
    // Array: 遍历Array做key, $route.params中取value
    // Object: 直接作为参数
    fetchFields: {
      type: [Array, Object],
      default () {
        return undefined
      }
    },
    // 异步数据的key
    fetchDataKey: {
      type: String,
      default: 'data.list'
    },
    fetchTotalKey: {
      type: String,
      default: 'data.total'
    },
    // 查询参数的配置
    queryPageKey: {
      type: String,
      default: 'page'
    },
    queryLimitKey: {
      type: String,
      default: 'limit'
    },
    queryLimitValue: {
      type: Number,
      default: 20
    },
    // el表格配置项
    elProps: {
      type: Object,
      default () {
        return {
        }
      }
    },
    // 表格操作项
    actions: {
      type: Array,
      default () {
        return []
      }
    },
    // 搜索项
    searchItems: {
      type: Array,
      default () {
        return []
      }
    },
    // 搜索项在界面上显示的数量, 0为不限.
    // 如果设置的数值小于searchItems的数量, 则会显示高级搜索.
    searchItemsLimit: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // 接口返回的数据
      fetchData: {},
      // 搜索参数
      query: {},
      // 高级搜索窗口状态
      advSearchDialogState: false,
      // 选中的行数据
      currentRow: {}, // 单选
      selected: [] // 复选
    }
  },
  // fetchOnServer: false,
  async fetch () {
    if (typeof this.fetchApi !== 'function') {
      return
    }
    // 初始化query的page和limt
    if (!this.query[this.queryPageKey] && !this.query[this.queryLimitKey]) {
      this.query[this.queryPageKey] = 1
      this.query[this.queryLimitKey] = this.queryLimitValue
    }

    // 构建参数
    // 如果有传参, 则带上传参, 但可以被覆盖.
    if (this.fetchFields) {
      this.query = {
        ...this.$utils.handleFetchFields(this.fetchFields),
        ...this.query
      }
    }

    // 通过route.params传参
    this.query = {
      ...this.$route.params,
      ...this.query
    }

    const res = await this.fetchApi(this.query)
    this.fetchData = res
  },
  computed: {
    // 异步返回的数据中，取列表数据
    fetchListData () {
      let data = []
      if (this.fetchApi && typeof this.fetchData === 'object') {
      // 异步, 则找数据
        data = this.fetchDataKey.split('.').reduce((total, item) => {
          if (total[item]) {
            total = total[item]
          } else {
            total = [] // 找不到则返回空数组，防止报错
          }
          return total
        }, this.fetchData)
      }

      return Array.isArray(data) ? data : [] // 保证返回array
    },
    // 异步返回的数据中，取总条数
    fetchTotalData () {
      let total = 0
      if (this.fetchApi && typeof this.fetchData === 'object') {
        total = this.fetchTotalKey.split('.').reduce((total, item) => {
          if (total[item]) {
            total = total[item]
          }
          return total
        }, this.fetchData)
      }
      return typeof total === 'number' ? total : 0
    },
    // 处理表格参数
    tableProps () {
      const defaultProps = {
        'highlight-current-row': true, // 选中行
        border: false
      }
      const _props = { ...defaultProps, ...this.elProps }
      if (this.fetchApi) {
        // 如果异步， 则展示异步数据
        _props.data = this.fetchListData
      } else if (Array.isArray(this.data) && this.data.length > 0) {
        // 如果有同步数据, 则展示同步数据
        _props.data = this.data
      }
      return _props
    },
    // 搜索按钮
    searchButtons () {
      const btns = [
        {
          label: '搜索',
          elProps: {
            type: 'primary'
          },
          command: 'handleSearch',
          dropdown: []
        }
      ]
      // 当搜索项限制小于搜索项数量时, 增加高级搜索
      if (this.searchItemsLimit > 0 && this.searchItemsLimit < this.searchItems.length) {
        btns[0].dropdown.push({ label: '高级搜索', command: 'showAdvSearchDialog' })
      }
      return btns
    },
    // 搜索项显示的数量
    baseSearchItems () {
      if (this.searchItemsLimit > 0) {
        return this.searchItems.slice(0, this.searchItemsLimit)
      } else {
        return this.searchItems
      }
    },
    // 高级搜索配置项
    advSearchProps () {
      return {
        dialogProps: {
          title: '高级搜索'
        },
        formProps: {
          fields: this.searchItems,
          buttons: [
            {
              label: '搜索',
              command: 'search',
              elProps: { type: 'primary' }
            },
            {
              label: '取消',
              command: 'cancel'
            }
          ]
        }

      }
    }
  },
  watch: {
    // 监听重载参数, 刷新数据
    '$route.params.reload' (value) {
      if (value) {
        this.$fetch()
        // this.$emit('reloaded') // 重载后的钩子
        this.$nextTick(() => {
          this.$route.params.reload = false // 保证连续操作, 页面每次都重载
        })
      }
    }
  },
  methods: {
    // 处理单元格的value
    handlerValue (field, row) {
      if (!field?.field) {
        return field?.field
      }
      return field.field.split('.').reduce((total, item) => {
        total = total?.[item]
        return total
      }, row)
    },
    // 处理操作按钮的disabled状态
    // current 和 selected 有一个是true即可操作
    handlerActionDisabled (action) {
      const state = [false, false]
      if (action.forCurrent) {
        state[0] = Object.keys(this.currentRow).length === 0
      }
      if (action.forSelected) {
        state[1] = this.selected.length === 0
      }
      return state.includes(true)
    },
    // 处理操作
    handlerActionClick (action, row) {
      if (action.handler && typeof action.handler === 'function') {
        // 如果有自定义方法，则执行自定义方法
        action.handler({
          current: this.currentRow,
          selected: this.selected
        })
      } else if (action.toName) {
        this.$router.push({
          name: action.toName,
          params: {
            ...this.$route.params,
            current: this.currentRow,
            selected: this.selected
          }
        })
      }
    },
    // 表格 选择行
    handlerTableCurrentChange (row) {
      this.currentRow = row
    },
    // 表格 勾选行
    handlerTableSelectChange (selection) {
      this.selected = selection
    },

    // 分页 条数改变时
    handleSizeChange (limit) {
      this.query[this.queryLimitKey] = limit
      this.query[this.queryPageKey] = 1
      this.$fetch()
    },
    // 分页 页码改变时
    handleCurrentChange (page) {
      this.query[this.queryPageKey] = page
      this.$fetch()
    },

    // 搜索
    handleSearch () {
      this.query.page = 1
      this.$fetch()
    },
    handleCancel () {
      console.log('handleCancel')
    },

    // 显示高级搜搜
    showAdvSearchDialog () {
      this.advSearchDialogState = true
    },
    hideAdvSearchDialog () {
      this.advSearchDialogState = false
    }

  }
}
</script>
<style lang="scss" scoped>
.myTable ::v-deep {
  // 去除搜索项下方的空白间距
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
