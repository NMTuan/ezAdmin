<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-04-18 16:11:25
 * @LastEditTime: 2022-04-21 16:02:57
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\pages\ez\dialog.vue
-->
<template>
  <div>
    <p>
      <el-button @click="$router.push({name: 'ez-dialog-normal'})">
        常规对话框 my-dialog
      </el-button>
    </p>
    <p>
      <el-button @click="$router.push({name: 'ez-dialog-form'})">
        表单对话框 my-dialog-form
      </el-button>
    </p>
    <p>
      <el-button @click="$router.push({name: 'ez-dialog-confirm'})">
        确认对话框 my-dialog-confirm
      </el-button>
    </p>
    <my-layout-view />
  </div>
</template>
<script>
export default {
  page: {
    name: '对话框',
    sort: 400
  }
}
</script>
