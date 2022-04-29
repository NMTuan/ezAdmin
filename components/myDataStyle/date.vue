<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-02-08 17:26:39
 * @LastEditTime: 2022-02-09 16:18:18
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\components\myDataStyle\date.vue
-->
<template>
  <div>
    {{ handlerValue }}
  </div>
</template>
<script>
import defaultComponent from './default'
export default {
  extends: defaultComponent,
  computed: {
    handlerValue () {
      const format = this.props?.format || 'YYYY-MM-DD'
      // 空值、零值，显示设定值或空
      if (this.value === '0' || this.value === 0 || !this.value) {
        return this.props?.empty || ''
      }
      // 10位 & 13位
      if (this.value.toString().length === 10) {
        return this.$dayjs.unix(this.value).format(format)
      } else if (this.value.toString().length === 13) {
        return this.$dayjs(this.value).format(format)
      } else {
        // 处理不了的，直接返回
        return this.value
      }
    }
  }
}
</script>
