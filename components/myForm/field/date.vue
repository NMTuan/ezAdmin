<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-11-22 11:38:39
 * @LastEditTime: 2022-04-22 14:06:45
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\components\myForm\field\date.vue
-->
<template>
  <div>
    <el-date-picker
      v-model="form.formData[item.field]"
      :type="item.type.toLowerCase()"
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
  }

}
</script>
