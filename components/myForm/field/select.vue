<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-11-22 11:38:39
 * @LastEditTime: 2022-04-22 14:04:00
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\components\myForm\field\select.vue
-->
<template>
  <div>
    <el-select v-model="form.formData[item.field]" :disabled="loading || elProps.disabled" v-bind="elProps">
      <el-option
        v-for="(option, index) in options"
        :key="`option${item.value}${index}`"
        :label="option.label"
        :value="option.value"
        v-bind="option.elProps"
      />
    </el-select>
    <i v-if="loading" class="el-icon-loading " />
  </div>
</template>
<script>
export default {
  inject: ['form'],
  props: {
    item: {
      type: Object,
      default () {
        return {
          label: '',
          field: '',
          options: [],
          elProps: {},
          // watchFields: [], // 监视字段
          fetchOptions: '' // 异步加载options
          // remoteOptions: '' // 异步查询options
        }
      }
    }
  },
  data () {
    return {
      options: this.item.options || [],
      elProps: Object.assign({}, this.item.elProps)
    }
  },
  async fetch () {
    if (typeof this.item.fetchOptions !== 'function') {
      return
    }
    // 如果有动态候选项, 则使用方法处理
    this.options = await this.item.fetchOptions(this.form.formData)
    // TODO 如果已选中的value没有在options中, 须清空
  },
  computed: {
    loading () {
      return this.$fetchState.pending && typeof this.item.fetchOptions === 'function'
    }
    // watch对象时, new/old值是相同的, 通过计算属性转一下就能拿到差异
    // watchData () {
    //   return JSON.parse(JSON.stringify(this.form.formData))
    // }
  },
  // watch: {
  //   watchData: {
  //     deep: true,
  //     handler (value, old) {
  //       // 没有watchFields或者没有fetchOptions时, 退出.
  //       if (this.item.watchFields && this.item.watchFields.length > 0 && typeof this.item.fetchOptions === 'function') {
  //       // 手工对比, 只有watch的field改变了, 才触发$fetch
  //         const change = this.item.watchFields.some((field) => {
  //           return value[field] !== old[field]
  //         })
  //         if (change) {
  //           this.$fetch()
  //         }
  //       }
  //     }
  //   }
  // },
  mounted () {
    // this.handleRemoteOptions()
  },
  methods: {
    // 异步检索
    // handleRemoteOptions () {
    //   if (typeof this.item.remoteOptions !== 'function') {
    //     return
    //   }
    //   this.elProps.filterable = true
    //   this.elProps.remote = true
    //   this.elProps['remote-method'] = async (query) => {
    //     this.options = await this.item.remoteOptions(query, this.form.formData)
    //   }
    // }
  }

}
</script>
