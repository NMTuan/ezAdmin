<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-10-26 06:29:09
 * @LastEditTime: 2021-12-13 20:56:50
 * @LastEditors: NMTuan
 * @Description: 循环同级菜单
 * @FilePath: \ezAdmin\components\myLayout\menu\list.vue
-->
<template>
  <div>
    <my-layout-menu-item
      v-for="(menu, index) in sortMenus"
      :key="`menu${index}`"
      :menu="menu"
    />
  </div>
</template>
<script>
export default {
  props: {
    // 同级的菜单数据
    menus: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    sortMenus () {
      let menus = JSON.parse(JSON.stringify(this.menus))
      menus = menus.filter(menu => !menu.hideMenu)
      return menus.sort((a, b) => {
        let x = a.sort || 10000
        let y = b.sort || 10000
        x = typeof x === 'string' ? Number(x) : x
        y = typeof y === 'string' ? Number(y) : y
        return x - y
      })
    }
  }
}
</script>
