<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-04-29 11:47:29
 * @LastEditTime: 2022-04-29 15:56:29
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\pages\user\list\update\_id.vue
-->
<template>
  <my-dialog-form
    v-model="formData"
    :dialog-props="dialogProps"
    :form-props="formProps"
  />
</template>
<script>
export default {
  page: { name: '编辑用户' },
  data () {
    return {
      formData: {
        id: 123
      },
      dialogProps: {
        title: '编辑用户'
      },
      formProps: {
        fields: [
          { label: '编号', field: 'id', elProps: { disabled: true } },
          { label: '用户名', field: 'userName', elProps: { disabled: true } },
          { label: '昵称', field: 'nickName' },
          {
            label: '所在组',
            field: 'groupName',
            type: 'select',
            fetchOptions: async () => {
              const res = await this.$api.getUserGroup({
                limit: 99
              })
              return res.data.list.reduce((total, item) => {
                total.push({ label: item.groupName, value: item.id })
                return total
              }, [])
            }
          },
          {
            label: '状态',
            field: 'state',
            type: 'select',
            options: [
              { label: '停用', value: 0, type: 'danger' },
              { label: '启用', value: 1, type: 'success' }
            ]
          }
        ],
        submitApi: this.$api.updateUser
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      Object.assign(this.formData, this.$route.params)
    })
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
