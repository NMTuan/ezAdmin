/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-09-17 09:50:33
 * @LastEditTime: 2022-02-05 22:18:41
 * @LastEditors: NMTuan
 * @Description: axios相关处理
 * @FilePath: \ezAdmin\plugins\axios.js
 */

import {
  Message,
  MessageBox
} from 'element-ui'
export default ({
  $axios,
  $cfg
}) => {
  $axios.defaults.baseURL = $cfg.axiosBaseUrl

  // 请求拦截器
  $axios.interceptors.request.use((config) => {
    if (config.data === undefined) {
      return config
    }
    config.headers.post['Content-Type'] = 'application/json'
    config.transformRequest = [function (data, headers) {
      // 对 data 进行任意转换处理
      Object.keys(data).forEach((key) => {
        // null
        if (data[key] === null) {
          data[key] = ''
        }
        // 13位时间戳
        if (typeof data[key] === 'number' && data[key].toString().length === 13) {
          data[key] = Math.trunc(data[key] / 1000)
        }
      })
      return JSON.stringify(data)
    }]

    return config
  })
  // 响应拦截器
  $axios.interceptors.response.use((res) => {
    if (res.data.code !== $cfg.axiosSuccessCode) {
      MessageBox.alert(res.data.msg, res.data.code)
    } else if (res.data.msg) {
      Message({
        type: 'success',
        message: res.data.msg
      })
    }
    return res.data
  })
}
