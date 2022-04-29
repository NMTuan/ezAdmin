/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-10-24 16:09:03
 * @LastEditTime: 2022-02-06 12:41:20
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\tailwind.config.js
 */
const colors = require('tailwindcss/colors')
module.exports = {
  // jit: true,
  purge: [],
  darkMode: false, // or 'media' or 'class'
  // exposeConfig: true,
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondPrimary: colors.blueGray
        // 'element-border': '#dcdfe6',
        // 'element-border-hover': '#c0c4cc',
        // 'element-border-focus': '#409eff'
      },
      lineHeight: {
        // 12: '3rem', // 48px
        13: '3.25rem', // 52px
        16: '4rem' // 64px
      }
    }
  },
  variants: {
    extend: {
      margin: ['first', 'last'],
      padding: ['first', 'last']
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
