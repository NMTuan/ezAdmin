<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-10-26 06:27:39
 * @LastEditTime: 2022-04-29 16:45:06
 * @LastEditors: NMTuan
 * @Description: 菜单项, 若有子菜单, 则引用list组件
 * @FilePath: \ezAdmin\components\myLayout\menu\item.vue
-->
<template>
  <div>
    <!-- 没有子菜单 -->
    <template v-if="subset.length === 0">
      <nuxt-link
        :to="{name: menu.routeName}"
        class="item"
        :class="[className, currentClass]"
      >
        <!-- 图标 -->
        <i
          v-if="menu.icon"
          :class="menu.icon "
          class="flex-shrink-0 mr-2 text-xl"
        />
        <!-- 标题 -->
        <span>{{ menu.name }}</span>
      </nuxt-link>
    </template>

    <!-- 有子菜单, 但只有一项, 并且没有子集 -->

    <!-- 有子菜单 -->
    <template v-else>
      <div
        class="item"
        :class="className"
        @click="handleClick"
      >
        <!-- 图标 -->
        <i
          v-if="menu.icon"
          :class="menu.icon"
          class="flex-shrink-0 mr-2 text-xl"
        />
        <!-- 标题 -->
        <span class="flex-1">{{ menu.name }}</span>
        <!-- 右侧展开状态的图标 -->
        <i
          class=" flex-shrink-0"
          :class="{
            'ri-arrow-down-s-line ri-lg': !openSubSet,
            'ri-arrow-up-s-line ri-lg': openSubSet
          }"
        />
      </div>
      <!-- 循环子菜单 -->
      <my-layout-menu-list
        :menus="subset"
        class="bg-secondPrimary-700"
        :class="{hidden: !openSubSet}"
      />
    </template>
  </div>
</template>
<script>
export default {
  props: {
    // 菜单项
    menu: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      openSubSet: false
    }
  },
  computed: {
    // 控制缩进的class
    className () {
      let className = ''
      switch (this.menu.level) {
        case 1:
          className = 'pl-4'
          break
        case 2:
          className = 'pl-8'
          break
        case 3:
          className = 'pl-12'
          break
        case 4:
          className = 'pl-16'
          break
        case 5:
          className = 'pl-20'
          break
        case 6:
          className = 'pl-24'
          break
        case 7:
          className = 'pl-28'
          break
        case 8:
          className = 'pl-32'
          break
        case 9:
          className = 'pl-36'
          break
        case 10:
          className = 'pl-40'
          break
      }
      return className
    },

    // 子集
    subset () {
      const authList = this.$auth?.user?.auth || []
      if (authList.length === 0) {
        return []
      }

      const children = this.$pages.filter((item) => {
        const reg = new RegExp(`^${this.menu.filePath}/`)
        // 先检测权限, 如果为*, 则管理员
        const checkAuth = () => {
          if (authList.length === 1 && authList[0] === '*') {
            return true
          } else {
            return authList.includes(item.routeName)
          }
        }
        // level = 当前level+1
        // 正则匹配当前path/
        // 并且排除 /_ 动态路由
        return checkAuth() &&
          item.level === this.menu.level + 1 &&
          reg.test(item.filePath) &&
          !item.filePath.includes('/_')
      })
      return children
    },

    // 高亮菜单
    currentClass () {
      if (this.$route.path === this.menu.filePath || this.$route.path === this.menu.filePath + '/') {
        return 'current'
      } else {
        return ''
      }
    }

  },
  watch: {
    $route () {
      // 路由切换后, 把高亮菜单的父级全部展开
      this.handleOpenState()
    }
  },
  mounted () {
    // 高亮菜单上级的默认为展开状态
    this.handleOpenState()
  },
  methods: {
    // 点击切换子菜单
    handleClick () {
      this.openSubSet = !this.openSubSet
    },
    // 处理菜单的展开状态
    handleOpenState () {
      if (this.subset.length > 0) {
        if (this.$route.path.includes(this.menu.filePath)) {
          this.openSubSet = true
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
  @apply flex items-center pr-4 leading-13 hover:bg-secondPrimary-600 cursor-pointer transition-colors;
  &.current {
    @apply bg-primary-500;
  }
}
</style>
