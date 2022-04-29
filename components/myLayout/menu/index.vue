<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-10-24 17:38:16
 * @LastEditTime: 2022-04-29 16:45:03
 * @LastEditors: NMTuan
 * @Description: 侧边菜单
 * @FilePath: \ezAdmin\components\myLayout\menu\index.vue
-->
<template>
  <my-layout-menu-list :menus="firstLevelMenus" class="bg-secondPrimary-800 text-secondPrimary-50" />
</template>
<script>
export default {
  computed: {
    // 一级菜单
    firstLevelMenus () {
      const authList = this.$auth?.user?.auth || []
      if (authList.length === 0) {
        return []
      }

      return this.$pages.filter((item) => {
        // 先检测权限, 如果为*, 则管理员
        const checkAuth = () => {
          if (authList.length === 1 && authList[0] === '*') {
            return true
          } else {
            return authList.includes(item.routeName)
          }
        }
        return checkAuth() && item.level === 1
      })
    }
  }
}
</script>
