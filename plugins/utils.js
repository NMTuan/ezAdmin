/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-02-06 12:36:29
 * @LastEditTime: 2022-04-29 14:02:20
 * @LastEditors: NMTuan
 * @Description: 工具箱
 * @FilePath: \ezAdmin\plugins\utils.js
 */
// 这里的content中, 只用到了params, 但不能写成{params}, 实测值不同.
export default (context, inject) => {
  inject('utils', {
    // 处理请求参数,
    // Array 从当前的route.params中找key/value
    // Object 直接作为参数
    handleFetchFields (fetchFields) {
      let fields = {}
      if (Array.isArray(fetchFields)) {
        // Array
        fetchFields.forEach((item) => {
          if (context.params[item]) {
            fields[item] = context.params[item]
          }
        })
      } else if (typeof fetchFields === 'object') {
        // Object
        fields = fetchFields
      }
      return fields
    }
  })
}
