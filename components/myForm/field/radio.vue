<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-11-22 11:38:39
 * @LastEditTime: 2022-04-22 14:05:35
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\components\myForm\field\radio.vue
-->
<template>
  <el-radio-group
    v-model="form.formData[item.field]"
    v-bind="item.elProps"
  >
    <component
      :is="component"
      v-for="(option, index) in item.options"
      :key="`option${item.value}${index}`"
      :label="option.value"
      v-bind="option.elProps"
    >
      {{ option.label }}
    </component>
  </el-radio-group>
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
  },
  computed: {
    component () {
      return this.item.type !== 'radio' ? 'el-radio-button' : 'el-radio'
    }
  }
}
</script>
