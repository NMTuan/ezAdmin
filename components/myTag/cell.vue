<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-11-21 19:51:17
 * @LastEditTime: 2022-04-29 16:45:26
 * @LastEditors: NMTuan
 * @Description: 表格中的tag
 * @FilePath: \ezAdmin\components\myTag\cell.vue
-->
<template>
  <el-tag
    v-bind="props"
    :type="handleType"
  >
    <slot>{{ label }}</slot>
  </el-tag>
</template>
<script>
export default {
  props: {
    // 显示的文字
    label: {
      type: String,
      default: ''
    },
    // 状态值
    value: {
      type: [String, Number],
      default: ''
    },
    // 状态
    type: {
      type: String,
      default: ''
    },
    // 所有状态值 状态:[状态值, 状态值, ...]
    types: {
      type: Object,
      default () {
        return {
          success: [],
          info: [],
          warning: [],
          danger: []
        }
      }
    },
    props: {
      type: Object,
      default () {
        return {
          size: 'small'
        }
      }
    }
  },
  computed: {
    handleType () {
      if (this.type) {
        return this.type
      }
      const current = Object.keys(this.types).find(item => this.types[item].includes(this.value))
      return current || ''
    }
  }
}
</script>
