<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-11-22 11:38:39
 * @LastEditTime: 2022-04-22 14:03:37
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\components\myForm\field\input.vue
-->
<template>
  <el-input v-model="form.formData[item.field]" :type="item.type" v-bind="item.elProps" />
</template>
<script>
export default {
  inject: ['form'],
  props: {
    item: {
      type: Object,
      default () {
        return {
          label: '', // 字段名称
          field: '', // 字段
          elProps: {} // 配置项
        }
      }
    }
  }
}
</script>
