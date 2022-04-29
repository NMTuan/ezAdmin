<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-10-27 11:33:45
 * @LastEditTime: 2021-11-16 16:01:03
 * @LastEditors: NMTuan
 * @Description: 面包屑导航
 * @FilePath: \nuxt_admin\components\layout\guide\index.vue
-->
<template>
  <div
    class="flex flex-row items-center text-sm text-gray-600 px-2 py-3 leading-none"
  >
    <i class="icon ri-home-2-line" />
    <template
      v-for="(item, index) in guide"
    >
      <span :key="`guide${index}`">
        {{ item.name }}
      </span>
      <i
        v-if="index !== guide.length - 1"
        :key="`guideIcon${index}`"
        class="icon ri-arrow-right-s-line"
      />
    </template>
  </div>
</template>
<script>
export default {
  computed: {
    guide () {
      return this.$route.matched.reduce((total, item) => {
        const page = this.$pages.find((page) => {
          if (item.path === '') {
            return page.filePath === '/'
          }
          return item.path === page.filePath
        })
        if (page && page.name) {
          total.push(page)
        }
        return total
      }, [])
    }
  }
}
</script>
<style lang="scss" scoped>
.icon {
  @apply mx-2 text-gray-400;
}
</style>
