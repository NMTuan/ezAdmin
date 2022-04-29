/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-10-27 15:00:12
 * @LastEditTime: 2022-04-29 16:45:32
 * @LastEditors: NMTuan
 * @Description: 多窗口标签
 * @FilePath: \ezAdmin\store\tabs.js
 */

export const state = () => {
  return {
    opened: [] // 保存route 供tabs多标签使用
  }
}

export const mutations = {
  // 插入一个标签
  M_insert_opened (state, route) {
    // 当前tab是否存在
    const exist = state.opened.some(item => item.filePath === route.path)
    const page = this.$pages.find(item => item.filePath === route.path) // 找不到, 应该是动态路由, 动态路由不放入tab
    if (!exist && page) {
      state.opened.push({
        ...page,
        route: {
          fullPath: route.fullPath,
          hash: route.hash,
          name: route.name,
          params: route.params,
          path: route.path,
          query: route.query
        }
      })
    }
  },

  // 关闭一个标签
  M_remove_opened (state, opened) {
    // 关闭的窗口是否是高亮窗口
    const current = this.$router.currentRoute.path === opened.filePath
    // 如果是当前页, 则需要路由跳转
    // TODO 跳转到来源页
    if (current) {
      let index = state.opened.findIndex(item => item.filePath === this.$router.currentRoute.path)
      index = index === 0 ? 1 : (index - 1)
      this.$router.replace(state.opened[index].route)
    }
    state.opened = state.opened.filter(item => item.filePath !== opened.filePath)
  },
  // 关闭其它
  M_remove_other (state) {
    state.opened = state.opened.filter(item => item.filePath === this.$router.currentRoute.path)
  },
  // 清空
  M_clear_opened (state) {
    state.opened = []
  }
}
