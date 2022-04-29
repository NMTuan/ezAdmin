<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-04-11 21:14:40
 * @LastEditTime: 2022-04-18 16:04:38
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\pages\ez\table\create\index.vue
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
  page: {
    name: '添加操作'
  },
  data () {
    return {
      dialogProps: {
        title: '标题啊'
      },
      formData: {
        name: '112233'
      },
      formProps: {
        fields: [
          { label: '姓名', field: 'name' },
          { label: '性别', field: 'sex' },
          {
            label: '年龄',
            field: 'age',
            type: 'select',
            options: [
              { label: '男', value: '1' },
              { label: '女', value: '2' },
              { label: '未知', value: '0' }
            ]
          }
        ],
        submitApi: this.$api.fetchForm
      }
    }
  }
}
</script>
