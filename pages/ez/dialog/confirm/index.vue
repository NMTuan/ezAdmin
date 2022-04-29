<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-04-21 16:03:19
 * @LastEditTime: 2022-04-21 16:47:35
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\pages\ez\dialog\confirm\index.vue
-->
<template>
  <my-dialog-confirm
    :dialog-props="dialogProps"
    :confirm-props="confirmProps"
  >
    操作后数据将无法找回, 确定要操作吗?
  </my-dialog-confirm>
</template>
<script>
export default {
  page: { name: '确认对话框' },
  data () {
    return {
      dialogProps: {
        title: '删除'
      },
      confirmProps: {
        submitText: '删除',
        submitType: 'danger',
        submitApi: this.$api.confirm
      }
    }
  }
}
</script>
