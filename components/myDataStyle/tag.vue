<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-02-09 16:29:19
 * @LastEditTime: 2022-02-09 16:47:42
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\components\myDataStyle\tag.vue
-->
<template>
  <el-tag
    v-if="value"
    size="small"
    :type="handlerType"
  >
    {{ handlerValue }}
  </el-tag>
</template>
<script>
import defaultComponent from './default.vue'
export default {
  extends: defaultComponent,
  computed: {
    handlerValue () {
      if (this.props.field) {
        return this.data[this.props.field]
      } else {
        return this.value
      }
    },
    handlerType () {
      if (!this.props.types) {
        return ''
      }
      return Object.keys(this.props.types).find(item => this.props.types[item].includes(this.value)) || ''
    }
  }
}
</script>
