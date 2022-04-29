<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-10-24 17:05:37
 * @LastEditTime: 2022-02-05 22:18:22
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\pages\login.vue
-->
<template>
  <div
    class="h-full flex flex-col items-center justify-center bg-no-repeat bg-center bg-cover"
    :style="{backgroundImage}"
  >
    <div class="text-3xl">
      {{ $cfg.name }}
    </div>
    <div class="bg-white shadow w-96 my-6 px-8  py-12 rounded">
      <el-input v-model="formData.username" class="mb-4" placeholder="用户名" />
      <el-input
        v-model="formData.pwd"
        show-password
        type="password"
        class="mb-4"
        placeholder="密码"
        @keyup.enter.native="handleLogin"
      />
      <el-button
        class="w-full"
        type="primary"
        :loading="loading"
        @click="handleLogin"
      >
        登录
      </el-button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import trianglify from '@victorioberra/trianglify-browser'
export default {
  layout: 'login',
  data () {
    return {
      loading: false,
      formData: {
        username: '',
        pwd: '',
        type: 1
      },
      backgroundImage: ''
    }
  },
  mounted () {
    // 检测登录状态
    if (this.$auth.loggedIn) {
      this.$router.replace('/')
    } else {
    // 每次进入登录页面, 则表示未登录, 清空一下缓存的tabs
      this.M_clear_opened()
    }
    // 背景图
    const x = 50
    const pattern = trianglify({
      cellSize: Math.random() * x + x,
      width: 1920,
      height: 1080,
      variance: 0.75,
      xColors: ['#EFF6FF', '#60A5FA', '#2563EB'],
      yColors: ['#EFF6FF', '#60A5FA', '#2563EB'],
      seed: null
    }).toCanvas()
    const triangle = pattern.toDataURL('image/png')
    this.backgroundImage = `url('${triangle}')`
  },
  methods: {
    ...mapMutations('user', ['M_update_profile']),
    ...mapMutations('tabs', ['M_clear_opened']),
    handleLogin () {
      this.loading = true
      this.$auth.login({
        data: this.formData
      })
        .then(() => {
          this.loading = false
          this.$router.replace('/')
        })
        .catch(() => {
          this.loading = false
        })
    }
  }

}
</script>
