<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-04-28 10:39:29
 * @LastEditTime: 2022-04-29 15:40:44
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\pages\user\list.vue
-->
<template>
  <my-table v-bind="tableProps" />
</template>

<script>
export default {
  page: {
    name: '用户列表',
    sort: 100
  },
  data () {
    return {
      tableProps: {
        fields: [
          { label: '编号', field: 'id' },
          { label: '用户名', field: 'userName' },
          { label: '昵称', field: 'nickName' },
          // { label: '组编号', field: 'groupId' },
          { label: '组名称', field: 'groupName' },
          {
            label: '状态',
            field: 'state',
            type: 'map',
            props: {
              items: [
                { label: '已停用', value: 0, type: 'danger' },
                { label: '已启用', value: 1, type: 'success' }
              ]
            }
          },
          { label: '最近登录', field: 'lastLoginAt' },
          {
            label: '操作',
            type: 'action',
            elProps: {
              width: '300px'
            },
            actionItems: [
              { label: '详情' },
              { label: '编辑', toName: 'user-list-update-id' },
              { label: '停用', type: 'warning', toName: 'user-list-state-id', hidden: { state: [0] } },
              { label: '启用', type: 'success', toName: 'user-list-state-id', hidden: { state: [1] } },
              { label: '删除', type: 'danger', toName: 'user-list-remove-id' }
            ]
          }
        ],
        fetchApi: this.$api.getUserList,
        searchItems: [
          {
            label: '分组',
            field: 'groupId',
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
          }
        ],
        actions: [
          { label: '添加用户', toName: 'user-list-create' }
        ]
      }
    }
  }
}
</script>
