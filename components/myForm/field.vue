<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-11-22 11:35:57
 * @LastEditTime: 2022-04-22 14:01:58
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\components\myForm\field.vue
-->
<template>
  <el-form-item
    v-if="!field.hidden"
    :label="field.label"
    :prop="field.field"
    :rules="field.elProps && field.elProps.rules"
  >
    <component :is="itemComponent" :item="field" />
  </el-form-item>
</template>
<script>
export default {
  props: {
    field: {
      // 表单项
      type: Object,
      default () {
        return {
          label: '',
          field: '',
          type: '',
          elProps: {
          }
        }
      }
    }
  },
  computed: {
    itemComponent () {
      let name = ''
      // TODO 简化
      // const component = {
      //   radio: ['radio'],
      //   select: ['select'],
      //   date: ['date', 'datetime'],
      //   time: ['time'],
      //   upload: ['upload'],
      //   vditor: ['vditor'],
      //   wangEditor: ['wangEditor']
      // }

      switch (this.field.type) {
        case 'radio':
        case 'radioBtn':
        case 'radioButton':
          name = 'my-form-field-radio'
          break
        case 'checkbox':
          name = 'my-form-field-checkbox'
          break
        case 'select':
          name = 'my-form-field-select'
          break
        case 'date':
        case 'year':
        case 'month':
        case 'dates':
        case 'week':
        case 'datetime':
        case 'datetimerange':
        case 'daterange':
        case 'monthrange':
          name = 'my-form-field-date'
          break
        case 'time':
          name = 'my-form-field-time'
          break
        // case 'upload':
        //   name = 'my-form-field-upload'
        //   break
        // case 'wangEditor':
        //   name = 'my-form-field-wang-editor'
        //   break
        default:
          name = 'my-form-field-input'
      }
      return name
    }
  }
}
</script>
