<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-11-22 11:38:39
 * @LastEditTime: 2022-04-22 14:06:57
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\components\myForm\field\time.vue
-->
<template>
  <div>
    <el-time-picker
      v-model="form.formData[item.field]"
      v-bind="item.elProps"
    />
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
          elProps: {}
        }
      }
    }
  },
  data () {
    return {
      options: this.item.options || []
    }
  },
  mounted () {
    // 处理候选项: 如果有传参, 则使用传参
    if (this.item.options && Array.isArray(this.item.options)) {
      this.options = this.item.options
    }
  }

}
</script>
