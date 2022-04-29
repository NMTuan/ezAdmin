<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-04-18 17:01:35
 * @LastEditTime: 2022-04-18 17:01:35
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\pages\ez\dialog\normal\index.vue
-->
<template>
  <my-dialog :dialog-props="dialogProps">
    这里是对话框内容
  </my-dialog>
</template>
<script>
export default {
  page: { name: '常规对话框' },
  data () {
    return {
      dialogProps: {
        title: '对话框的标题',
        width: '320px',
        top: '10px'
      }
    }
  }
}
</script>
