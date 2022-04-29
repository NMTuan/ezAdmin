/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-02-05 20:29:02
 * @LastEditTime: 2022-02-05 22:19:16
 * @LastEditors: NMTuan
 * @Description: 配置文件
 * @FilePath: \ezAdmin\plugins\cfg.js
 */

const baseConfig = {
  name: '后台管理系统', // 平台名称
  axiosBaseUrl: 'http://rap2api.taobao.org/app/mock/297892', // 异步接口基本地址
  axiosSuccessCode: 200 // 异步返回的正常状态码
}

// 这里可以让你在不同环境下调用不同配置
let envConfig = {}
try {
  envConfig = require(`~/env/${process.env.NODE_ENV}.js`)
} catch (err) {
}

export default (context, inject) => {
  inject('cfg', Object.assign({}, baseConfig, envConfig))
}
