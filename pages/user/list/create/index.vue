<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-04-28 14:10:45
 * @LastEditTime: 2022-04-28 16:20:02
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\pages\user\list\create\index.vue
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
  page: { name: '添加用户' },
  data () {
    return {
      formData: {
        state: 1
      },
      dialogProps: {
        title: '添加用户'
      },
      formProps: {
        fields: [
          { label: '用户名', field: 'userName' },
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
        submitApi: this.$api.createUser
      }
    }
  }
}
</script>
