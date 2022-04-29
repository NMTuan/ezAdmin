<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-15 16:25:01
 * @LastEditTime: 2022-04-29 16:45:21
 * @LastEditors: NMTuan
 * @Description: 移动端菜单
 * @FilePath: \ezAdmin\components\myLayout\menuMobile\index.vue
-->
<template>
  <div
    class="
  block
  sm:hidden
  "
  >
    <i class="ri-menu-fill text-lg p-4 -mr-4 " @click="showDrawer" />
    <el-drawer
      :with-header="false"
      :visible.sync="drawer"
      direction="ltr"
      :append-to-body="true"
      :show-close="false"
      size="80%"
      :before-close="hideDrawer"
    >
      <div class="flex flex-col h-full bg-secondPrimary-800">
        <my-layout-logo />
        <my-layout-menu class="flex-1 __hidScrollBar" />
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  watch: {
    '$route' (value) {
      this.hideDrawer()
    }
  },
  methods: {
    showDrawer () {
      this.drawer = true
    },
    hideDrawer () {
      this.drawer = false
    }
  }
}
</script>
