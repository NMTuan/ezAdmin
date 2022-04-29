/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-11-18 16:26:21
 * @LastEditTime: 2022-02-08 17:00:14
 * @LastEditors: NMTuan
 * @Description: 页面内功能的权限判断
 * @FilePath: \ezAdmin\plugins\check.js
 */
import Vue from 'vue'

export default ({ app }, inject) => {
  inject('check', (routeName) => {
    const authList = app.$auth.user.auth
    // 管理员
    if (authList.length === 1 && authList[0] === '*') {
      return true
    }
    return authList.includes(routeName)
  })
  Vue.directive('check', {
    inserted (el, { value }) {
      const authList = app.$auth.user.auth
      // 管理员
      if (authList.length === 1 && authList[0] === '*') {
        return
      }

      // 无权限
      if (value && !authList.includes(value) && el.parentNode) {
        el.parentNode.removeChild(el)
      }
    }
  })
}
