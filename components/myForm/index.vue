<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-11-22 13:57:19
 * @LastEditTime: 2022-04-28 16:37:45
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\components\myForm\index.vue
-->
<template>
  <el-form
    ref="form"
    v-loading="
      ($fetchState.pending && typeof fetchApi === 'function') || loading
    "
    class="myForm"
    :model="formData"
    v-bind="{
      'label-position': 'right',
      'label-width': 'auto',
      size: 'medium',
      ...elProps
    }"
  >
    <!-- 循环表单项 -->
    <template v-for="(field, index) in fields">
      <slot :name="field.field" :field="field" :formData="formData">
        <my-form-field :key="`formField${index}`" :field="field" />
      </slot>
    </template>
    <slot :formData="formData" />

    <!-- 新提交按钮 -->
    <el-form-item v-if="buttons && buttons.length > 0">
      <template
        v-for="(btn, index) in insideButtons"
      >
        <el-dropdown
          v-if="Array.isArray(btn.dropdown) && btn.dropdown.length > 0"
          :key="`formBtn${index}`"
          @command="handleCommand"
        >
          <el-button
            v-bind="btn.elProps"
            @click="buttonEvent(btn, index)"
          >
            {{ btn.label }}
            <i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, i) in btn.dropdown"
              :key="`formBtnDropdown${index}_${i}`"
              :command="item.command"
              v-bind="item.elProps"
            >
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          v-else
          :key="`formBtn${index}`"
          v-bind="btn.elProps"
          @click="buttonEvent(btn, index)"
        >
          {{ btn.label }}
        </el-button>
      </template>
    </el-form-item>
    <!-- <pre>myForm {{ formData }}</pre> -->
  </el-form>
</template>
<script>
export default {
  provide () {
    return {
      data: this.formData,
      form: this
    }
  },

  props: {
    // v-model
    value: {
      type: Object,
      default () {
        return {}
      }
    },
    // 表单项
    fields: {
      type: Array,
      default () {
        return []
      }
    },

    // 操作按钮
    buttons: {
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
    // Array: 遍历Array做field, $route.params中取value
    // Object: 直接作为参数
    fetchFields: {
      type: [Array, Object],
      default () {
        return undefined
      }
    },
    // 自定义数据处理
    handleFetchData: {
      type: Function,
      default: undefined
    },

    // 拉取数据后整理数据
    afterFetched: {
      type: Function,
      default: undefined
    },

    // 提交前的钩子(表单验证之后)
    beforeSubmit: {
      type: Function,
      default: undefined
    },

    // 提交的接口
    submitApi: {
      type: Function,
      default: undefined
    },

    // 成功 钩子
    succeed: {
      type: Function,
      default: undefined
    },
    // 取消 钩子
    cancel: {
      type: Function,
      default: undefined
    },

    // elementUI的配置
    elProps: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  // vue2没有此配置, 为了集中管理, 这里还是声明一下
  emits: [
    'input' // v-model
  ],
  data () {
    return {
      loading: false,
      insideButtons: this.buttons || [],
      formData: {} // 表单数据
    }
  },
  fetchOnServer: false,
  async fetch () {
    // 如果有配置fetchApi, 则进入表单时, 先通过api获取表单最新数据.
    if (typeof this.fetchApi !== 'function') {
      return
    }
    // 构建参数
    let params = {}
    if (this.fetchFields) {
      params = this.$utils.handleFetchFields(this.fetchFields)
    }

    // 请求
    const res = await this.fetchApi(params)
    if (res.code === this.$cfg.axiosSuccessCode) {
      // 成功, 如果有自定义处理, 则走自定义处理
      if (this.handleFetchData) {
        this.handleFetchData(res, this.formData)
      } else {
        // 否则, 把返回数据合并到表单中.
        Object.keys(this.formData).forEach((field) => {
          if (res.data[field] !== undefined) {
            this.$set(this.formData, field, res.data[field])
          }
        })
      }
    } else if (this.cancel) {
      // 失败, 如果有cancel, 则执行cancel()
      this.cancel()
    }
    // 自定义数据处理
    if (this.afterFetched) {
      this.afterFetched(this.formData, res)
    }
  },
  watch: {
    value: {
      deep: true,
      handler (value) {
        this.formData = value
      }
    },
    formData: {
      deep: true,
      handler (value) {
        this.$emit('input', value) // v-model
      }
    }
  },
  mounted () {
    // 构建formData数据, 构建所有表单项的data对象.
    // TODO 由于已经有了v-model模式绑定数据, 所以这里可以不再处理默认值. 看看找个合适处理方式.
    // 主要是没有默认值, 有些地方会直接使用Array.find, 但实际是个String, 就报错了.
    const fd = {}
    this.fields.forEach((item) => {
      // 如果v-model的value有值, 则用, 否则留空
      let val = this.value[item.field] || ''
      if (item.type === 'checkbox') {
        // 特殊值, 需要处理为数组
        val = this.value[item.field] || []
      }
      this.$set(fd, item.field, val)
    })
    // 合并一下
    this.formData = { ...this.formData, ...this.value, ...fd }
    // 清理表单验证
    this.$nextTick(() => {
      this.$refs.form.clearValidate()
    })

    // 如果有配置submitApi, 但没有配置buttons, 则增加提交按钮
    if (typeof this.submitApi !== 'undefined' && this.insideButtons.length === 0) {
      this.insideButtons.push({
        label: '提交',
        elProps: {
          type: 'primary'
        }
      })
    }
    // 如果有配置cancel, 但buttons.length === 1, 则增加取消按钮
    if (typeof this.cancel !== 'undefined' && this.insideButtons.length === 1) {
      this.insideButtons.push({
        label: '取消',
        elProps: {
          type: 'text'
        }
      })
    }
  },
  methods: {
    // 切换loading状态
    changeLoading (state = false) {
      this.loading = !!state
    },
    // 处理按钮的点击事件
    buttonEvent (btn, index) {
      // 如果定义了command, 则$emit(command)
      if (btn.command) {
        this.$emit(btn.command, {
          form: this.$refs.form, // form元素
          formData: this.formData,
          changeLoading: this.changeLoading, // 切换loading的放放
          submit: this.submit, // 提交方法
          cancel: this.cancel // 取消方法
        })
      } else {
        // 没定义处理事件的,
        // 第一个按钮为提交
        if (index === 0) {
          this.submit()
        }
        // 第二个按钮为取消
        if (index === 1 && typeof this.cancel === 'function') {
          this.cancel()
        }
      }
    },
    // 下拉菜单的点击事件
    handleCommand (eventName) {
      if (eventName) {
        this.$emit(eventName, {
          form: this.$refs.form, // form元素
          formData: this.formData,
          changeLoading: this.changeLoading, // 切换loading的放放
          submit: this.submit, // 提交方法
          cancel: this.cancel // 取消方法
        })
      }
    },

    // 表单提交
    submit () {
      if (!this.submitApi) {
        return
      }
      // 表单验证
      this.$refs.form.validate((success) => {
        if (!success) {
          return
        }
        if (typeof this.beforeSubmit === 'function') {
          this.beforeSubmit(this.formData)
        }
        this.changeLoading(true)
        this.submitApi(this.formData)
          .then((res) => {
            this.changeLoading()
            if (res.code === this.$cfg.axiosSuccessCode) {
              if (this.succeed) {
                this.succeed(res)
              }
            }
          })
          .catch(() => {
            this.changeLoading()
          })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.myForm {
  .el-dropdown + .el-button,
  .el-button + .el-dropdown,
  .el-dropdown + .el-dropdown {
    margin-left: 10px;
  }
}
</style>
