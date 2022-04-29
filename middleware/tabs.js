/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-10-27 15:03:42
 * @LastEditTime: 2021-10-31 10:21:36
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \nuxt_admin\middleware\tabs.js
 */
export default function ({ route, store }) {
  store.commit('tabs/M_insert_opened', route)
}
