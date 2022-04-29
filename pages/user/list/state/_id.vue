<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-04-28 14:10:45
 * @LastEditTime: 2022-04-29 15:58:30
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\pages\user\list\state\_id.vue
-->
<template>
  <my-dialog-confirm
    :dialog-props="dialogProps"
    :confirm-props="confirmProps"
  >
    确定要 {{ $route.params.state === 1 ? '停用':'启用' }} {{ $route.params.nickName }} 的账户吗?
  </my-dialog-confirm>
</template>
<script>
import authTree from '~/mixins/authTree'

export default {
  page: { name: '停用/启用' },
  mixins: [authTree],
  data () {
    return {
      dialogProps: {
        title: this.$route.params.state === 1 ? '停用' : '启用'
      },
      confirmProps: {
        submitApi: this.$api.updateUser,
        submitFields: {
          state: this.$route.params.state === 1 ? 0 : 1
        }
      }
    }
  },
  methods: {
    isMaster (formData) {
      return JSON.stringify(formData.auth) === JSON.stringify(['*'])
    },
    handleMaster (formData) {
      const isMaster = this.isMaster(formData)
      if (isMaster) {
        formData.auth = JSON.parse(JSON.stringify(this.authCache || []))
        this.authCache = ''
      } else {
        this.authCache = JSON.parse(JSON.stringify(formData.auth || []))
        formData.auth = ['*']
      }
    }
  }

}
</script>
