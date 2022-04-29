<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-04-28 14:10:45
 * @LastEditTime: 2022-04-29 15:25:31
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\pages\user\group\remove\_id.vue
-->
<template>
  <my-dialog-confirm
    v-model="formData"
    :dialog-props="dialogProps"
    :confirm-props="confirmProps"
  >
    删除后数据无法找回, 确定要删除么?
  </my-dialog-confirm>
</template>
<script>
import authTree from '~/mixins/authTree'

export default {
  page: { name: '删除分组' },
  mixins: [authTree],
  data () {
    return {
      dialogProps: {
        title: '删除分组'
      },
      confirmProps: {
        submitText: '删除',
        submitType: 'danger',
        submitApi: this.$api.removeGroup
      }
    }
  }
}
</script>
