<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-02-05 22:28:55
 * @LastEditTime: 2022-04-22 14:06:06
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\pages\ez\form.vue
-->
<template>
  <!-- <div> -->
  <my-form
    v-bind="formProps"
    v-model="formData"
    @submit="handleSubmit"
    @reset="handleReset"
  />
  <!-- <pre>page {{ formData }}</pre> -->
  <!-- </div> -->
</template>
<script>
export default {
  page: {
    name: '表单',
    sort: 300
  },
  data () {
    return {
      formData: { name: '222', sex: ['1', '2'] },
      formProps: {
        fields: [

          {
            label: '姓名',
            field: 'name',
            elProps: {
              // readonly: true,
              rules: [
                { required: true, message: '提示' }
              ]
            }
          },
          {
            label: '年龄',
            field: 'age',
            type: 'time'
            // elProps: {
            //   disabled: true
            // }
          },

          {
            label: '性别',
            field: 'sex',
            type: 'checkbox',
            options: [
              { label: '男', value: '1' },
              { label: '女', value: '2', elProps: { disabled: true } },
              { label: '未知', value: '0' }
            ]
          }
        ],
        buttons: [
          {
            label: '下拉按钮',
            elProps: {
              type: 'primary'
            },
            dropdown: [
              { label: '重置表单', command: 'reset' },
              { label: '测试按钮', command: 'test' }
            ]
          },
          {
            label: '提交',
            command: 'submit'
          },
          { label: '取消' },
          {
            label: '下拉按钮',
            command: 'submit',
            elProps: {
              type: 'primary'
            },
            dropdown: [
              { label: '重置表单', command: 'reset' },
              { label: '测试按钮', command: 'test' }
            ]
          },
          {
            label: '下拉按钮',
            elProps: {
              type: 'primary'
            },
            dropdown: [
              { label: '重置表单', command: 'reset' },
              { label: '测试按钮', command: 'test' }
            ]
            // handle
          },
          { label: '取消' }

        ],
        submitApi: this.$api.fetchForm
        // cancel () {
        //   console.log('cancel')
        // }
        // fetchFields: { a: 1 }
      }
    }
  },
  methods: {
    handle (payload) {
      console.log('click', payload)
    },
    handleCommand (payload) {
      console.log('handleCommand', payload)
    },
    handleSubmit (payload) {
      console.log('handleSubmit', payload)
      payload.changeLoading(true)
      setTimeout(() => {
        payload.changeLoading()
      }, 2000)
    },
    handleReset (payload) {
      console.log('handleReset', payload)
    }
  }

}
</script>
