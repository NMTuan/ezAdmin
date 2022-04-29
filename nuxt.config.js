/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-01-27 23:20:06
 * @LastEditTime: 2022-02-10 14:22:19
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\nuxt.config.js
 */
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ezAdmin',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: {
    color: '#1191ff',
    height: '3px'
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/element-variables.scss',
    'remixicon/fonts/remixicon.css'
    // '~/assets/scss/element-ui.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/cfg',
    '@/plugins/utils',
    '@/plugins/axios',
    '@/plugins/api',
    '@/plugins/check',
    '@/plugins/pages',
    '@/plugins/element-ui'
    // '@/plugins/dialog',
    // '@/plugins/check'

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dayjs'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/style-resources'
  ],

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          maxAge: 60 * 60 * 24 * 7,
          global: true
        },
        user: {
          property: 'profile'
        },
        endpoints: {
          login: {
            url: '/login/admin-login',
            method: 'POST'
          },
          logout: {
            url: '/user/logout',
            method: 'POST'

          },
          user: {
            url: '/user/profile',
            method: 'GET'
          }
        }
      }
    },
    // https://github.com/nuxt-community/auth-module/issues/731#issuecomment-653948164
    redirect: {
      login: '/login', // 登陆页面，进入需要权限的页面，没有本地 token 就会往这里跳
      logout: '/login', // 退出后往这里跳
      callback: '/login', // 第三方平台 OAuth2 使用的重定向回来的地址，这里用不到
      home: false // 个人主页，如果配置 auth: 'guest' 时，已登录用户访问该页面会跳到该地址（也就是限于访客）
    },
    // cookie: {
    //   options: {
    //     maxAge: 60 * 60 * 24 * 7
    //   }
    // },
    localStorage: false
  },

  router: {
    middleware: [
      'auth',
      'tabs'
      // 'from'
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true

  },
  styleResources: {
    scss: ['@/assets/scss/common.scss']
  }

}
