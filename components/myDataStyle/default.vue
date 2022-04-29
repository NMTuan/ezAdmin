<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-02-08 17:32:09
 * @LastEditTime: 2022-02-09 16:03:00
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\components\myDataStyle\default.vue
-->
<template>
  <div>
    {{ value }}
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    props: {
      type: Object,
      default () {
        return {}
      }
    }

  }
}
</script>
