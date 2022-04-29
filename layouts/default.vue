<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-10-24 16:53:57
 * @LastEditTime: 2022-04-29 14:15:01
 * @LastEditors: NMTuan
 * @Description: 默认框架
 * @FilePath: \ezAdmin\layouts\default.vue
-->
<template>
  <div v-if="$auth.loggedIn" class="flex h-full">
    <!-- <div class="flex flex-1 overflow-hidden"> -->
    <div
      class="flex-col flex-shrink-0 bg-secondPrimary-800
      hidden
      sm:flex sm:w-48
      lg:w-64
    "
    >
      <my-layout-logo />
      <my-layout-menu class="flex-1 __hidScrollBar" />
    </div>
    <div class="flex flex-col flex-1 overflow-hidden bg-secondPrimary-200">
      <my-layout-header class=" flex-shrink-0 bg-white" />
      <my-layout-tabs class="flex-shrink-0 p-2 pb-0" />
      <div
        v-if="$route.name === 'index'"
        class="h-full flex justify-center items-center "
      >
        <div class="text-secondPrimary-100 text-5xl opacity-30 select-none">
          ezAdmin
        </div>
      </div>
      <Nuxt
        v-else-if="checkAuth"
        class="flex-1 overflow-auto bg-white"
      />
      <div
        v-else
        class="h-full flex justify-center items-center bg-white"
      >
        <div class="text-lg text-gray-400 text-center">
          <i class="text-9xl block mb-4 text-gray-100 ri-shield-keyhole-line" />
          无权访问
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    checkAuth () {
      const authList = this.$auth?.user?.auth || []
      if (authList.length === 1 && authList[0] === '*') {
        return true
      } else {
        return authList.includes(this.$route.name)
      }
    }
  },
  updated () {
    console.log('route.params: ' + JSON.stringify(this.$route.params, null, 2))
  }
}
</script>
