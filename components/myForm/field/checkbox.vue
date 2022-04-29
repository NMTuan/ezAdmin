<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-11-22 11:38:39
 * @LastEditTime: 2022-04-21 15:52:12
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\components\myForm\checkbox.vue
-->
<template>
  <div>
    <el-checkbox
      v-for="(option, index) in item.options"
      :key="`option${item.value}${index}`"
      v-model="form.formData[item.field]"
      :label="option.value"
      v-bind="Object.assign({}, item.elProps, option.elProps)"
    >
      {{ option.label }}
    </el-checkbox>
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
          elProps: {}
        }
      }
    }
  }
}
</script>
