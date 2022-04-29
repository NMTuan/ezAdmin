<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-11-19 09:54:00
 * @LastEditTime: 2022-04-18 16:38:45
 * @LastEditors: NMTuan
 * @Description: 通用的 表单 对话框
 * @FilePath: \ezAdmin\components\myDialog\index.vue
-->
<template>
  <el-dialog
    visible
    :before-close="close"
    v-bind="{
      'append-to-body': true,
      ...dialogProps
    }"
  >
    <slot />
  </el-dialog>
</template>
<script>
import dialog from '~/mixins/dialog.vue'
export default {
  mixins: [dialog]
}
</script>
