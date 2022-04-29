<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-02-09 17:24:30
 * @LastEditTime: 2022-04-29 15:12:00
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\components\myDataStyle\link.vue
-->
<template>
  <nuxt-link
    :class="handlerClass"
    :to="handlerTo"
  >
    {{ value }}
  </nuxt-link>
</template>
<script>
import defaultComponent from './default'
export default {
  extends: defaultComponent,
  computed: {
    handlerClass () {
      return this.props.class || 'text-primary-400 hover:underline'
    },
    handlerTo () {
      const to = {}
      to.name = this.props.toName
      // 传递数据
      if (typeof this.props.handleRef === 'function') {
        // 手工处理
        to.params = this.props.handleRef(this.data) || {}
      } else if (this.props.byRef !== false) {
        // 默认全传
        to.params = {
          // ...this.$route.params,
          ...this.data
        }
      }
      return to
    }
  }
}
</script>
