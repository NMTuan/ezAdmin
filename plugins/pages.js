/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-10-24 21:21:11
 * @LastEditTime: 2022-04-29 16:45:29
 * @LastEditors: NMTuan
 * @Description: 处理页面自定义配置项 page: {}
 * @FilePath: \ezAdmin\plugins\pages.js
 */

/**
 * object.page
 *
 * name             [String]  当前栏目/页面的名字
 * icon             [String]  当前栏目/页面名字前面的图标class 没有则不显示
 * disabledCache    [Boolean] 是否禁止keep-alive, 注意如果vue组件定义了name, 则无法被缓存.
 * hideMenu         [Boolean] 不在侧边显示
 * highLightMenu    []        TODO: 手工指定高亮哪个菜单项
 * sort             [number]  排序
 */
// import { MessageBox } from 'element-ui'

const allPage = require.context('~/pages', true, /\.vue$/)
// 所有页面
const pages = allPage.keys().reduce((total, page) => {
  const fileName = page.replace(/^\.\/(.*)\.\w+$/, '$1')
  const object = allPage(page).default
  if (object.page) {
    total.push({
      ...object.page, // 见头部注释
      routeName: fileName.replace(/\/_/g, '-').replace(/\//g, '-').replace(/^(.*)-index$/, '$1'), // 路由 name
      filePath: '/' + fileName.replace(/^(.*)index$/, '$1'), // 文件路径 跟route.path相同, 动态路由除外
      level: fileName.split('/').length // 层级
    })
  }
  return total
}, [])

export default ({ app, $api }, inject) => {
  inject('pages', pages)
}
