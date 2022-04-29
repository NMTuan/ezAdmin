<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-04-18 16:16:21
 * @LastEditTime: 2022-04-19 14:21:51
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\pages\ez\dialog\form.vue
-->
<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-04-18 16:13:43
 * @LastEditTime: 2022-04-18 16:13:43
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\pages\ez\dialog\index.vue
-->
<template>
  <my-dialog-form
    v-model="formData"
    :dialog-props="dialogProps"
    :form-props="formProps"
  >
    <!-- 123 -->
  </my-dialog-form>
</template>
<script>
export default {
  page: {
    name: '表单对话框'
  },
  data () {
    return {
      formData: {
        name: 123
      },
      dialogProps: {
        title: '创建用户信息'
      },
      formProps: {
        fields: [
          { label: '姓名', field: 'name' },
          { label: '年龄', field: 'age' },
          {
            label: '性别',
            field: 'sex',
            options: [
              { label: '男', value: '1' },
              { label: '女', value: '2' },
              { label: '未知', value: '0' }
            ]
          }
        ],
        // fetchApi: this.$api.fetchForm,
        submitApi: this.$api.updateForm
      }
    }
  }
}
</script>
