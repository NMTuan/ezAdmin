<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-04-28 10:39:57
 * @LastEditTime: 2022-04-29 15:06:02
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\pages\user\group.vue
-->
<template>
  <my-table v-bind="tableProps" />
</template>

<script>
export default {
  page: {
    name: '分组管理',
    sort: 200
  },
  data () {
    return {
      tableProps: {
        fields: [
          { label: '编号', field: 'id' },
          { label: '组名称', field: 'groupName' },
          {
            label: '成员',
            field: 'total',
            type: 'link',
            props: {
              toName: 'user-list',
              // byRef: false,
              handleRef: (rowData) => {
                return { groupId: rowData.id }
              }
            }
          },
          { label: '创建时间', field: 'createAt' },
          {
            label: '操作',
            type: 'action',
            actionItems: [
              { label: '编辑', toName: 'user-group-update-id' },
              { label: '删除', type: 'danger', toName: 'user-group-remove-id' }
            ]
          }
        ],
        fetchApi: this.$api.getUserGroup,
        actions: [
          { label: '添加分组', toName: 'user-group-create' }
        ]
      }
    }
  }
}
</script>
