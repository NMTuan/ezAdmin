<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-10-27 15:39:04
 * @LastEditTime: 2022-02-11 09:27:38
 * @LastEditors: NMTuan
 * @Description: 多标签
 * @FilePath: \ezAdmin\components\myLayout\tabs\index.vue
-->
<template>
  <div
    v-show="opened.length > 0"
    class="tabs"
  >
    <i
      v-if="overflow"
      class="ri-arrow-left-s-fill ri-xl tabs__btn "
      @click="handleClickBtn('left')"
    />
    <div
      ref="container"
      class="tabs__container"
      @mousewheel="handleMouseWheel"
      @wheel="handleMouseWheel"
    >
      <div
        ref="scroll"
        class="tabs__scroll"
        :style="{transform: `translate(${scrollLeft}px, 0)`}"
      >
        <!-- TODO 需要确认一下，这里是否需要传递params -->
        <nuxt-link
          v-for="(tab, index) in opened"
          :key="`tab${index}`"
          ref="item"
          :to="{name: tab.routeName, params: tab.route.params, query: tab.route.query}"
          class="tabs__item"
          :class="{current: $route.path === tab.filePath}"
        >
          <!-- <i
            v-if="tab.icon"
            class="titleIcon"
            :class="tab.icon"
          /> -->
          <pre>{{ tab.name }}</pre>
          <i
            v-if="opened.length > 1"
            class="ri-close-line closeIcon opacity-0 group-hover:opacity-100"
            @click.stop.prevent="remove(tab)"
          />
        </nuxt-link>
      </div>
    </div>
    <i
      v-if="overflow"
      class="ri-arrow-right-s-fill ri-xl tabs__btn"
      @click="handleClickBtn('right')"
    />

    <el-dropdown size="small" trigger="click" @command="handleCommand">
      <i class="ri-more-fill ri-xl tabs__more" />
      <el-dropdown-menu>
        <el-dropdown-item command="closeOtherTabs">
          关闭其它标签
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { debounce } from 'throttle-debounce'
export default {
  data () {
    return {
      overflow: false, // 是否滚动
      scrollLeft: 0, // 滚动位置
      step: 200, // 步长
      formRoute: {}, // 路由来源
      formName: '', // 路由来源name
      formPath: '' // 路由来源path
    }
  },
  computed: {
    ...mapState('tabs', ['opened'])
  },
  watch: {
    opened: {
      deep: true,
      handler () {
        this.checkOverFlow()
      }
    },
    $route (value, old) {
      this.handleCurrentTab()
      this.formRoute = old
      this.formPath = old.path
      this.formName = old.name
    }
  },
  mounted () {
    // 修正滚动位置 防抖
    this.debounceHandleScroll = debounce(100, () => {
      this.handleScroll()
    })
    window.addEventListener('resize', this.debounceHandleScroll)

    // 检测是否超出 防抖
    this.debounceCheckOverFlow = debounce(100, this.checkOverFlow)
    this.debounceCheckOverFlow()
    window.addEventListener('resize', this.debounceCheckOverFlow)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceHandleScroll)
    window.removeEventListener('resize', this.debounceCheckOverFlow)
  },
  methods: {
    ...mapMutations('tabs', ['M_remove_opened', 'M_remove_other']),

    // 右侧菜单
    handleCommand (command) {
      if (this[command] && typeof this[command] === 'function') { this[command]() }
    },

    // 关闭其它标签
    closeOtherTabs () {
      this.M_remove_other()
    },

    // 鼠标滚动
    handleMouseWheel (e) {
      // 滚轮往下滚 页面往右走
      const distance = this.step * (e.deltaY > 0 ? -1 : 1)
      this.handleScroll(this.scrollLeft + distance)
    },

    // 点击翻页
    handleClickBtn (dir) {
      // 点左 页面往左走
      const distance = this.step * (dir === 'left' ? 1 : -1)
      this.handleScroll(this.scrollLeft + distance)
    },

    // 处理滚动
    handleScroll (distance = 0) {
      const scrollWidth = this.$refs?.scroll?.scrollWidth || 0 // 滚动容器总宽度
      const viewWidth = this.$refs.container.clientWidth // 可视窗口宽度
      // 滚动距离 永远小于等于0
      // distance = this.scrollLeft + distance
      // 滚到最左
      if (distance > 0) {
        distance = 0
      }
      // 滚到最右
      if (viewWidth - distance >= scrollWidth) {
        distance = viewWidth - scrollWidth
      }
      this.scrollLeft = distance
    },

    // 检测内容是否超出
    checkOverFlow () {
      this.$nextTick(() => {
        // 滚动容器总宽度 > 可视窗口宽度
        this.overflow =
          this.$refs?.scroll?.scrollWidth > this.$refs?.container?.clientWidth
      })
    },

    // 处理高亮项
    handleCurrentTab () {
      const viewWidth = this.$refs.container.clientWidth // 可视窗口宽度

      this.$nextTick(() => {
        const el = this.$refs.item?.find(item =>
          item.$el.classList.contains('current')
        )?.$el
        if (!el) {
          return
        }
        // 超出右侧了
        if (el.offsetLeft + el.clientWidth > viewWidth - this.scrollLeft) {
          this.handleScroll(viewWidth - el.offsetLeft - el.clientWidth)
        }
        // 超出左侧了
        if (el.offsetLeft < Math.abs(this.scrollLeft)) {
          this.handleScroll(-el.offsetLeft)
        }
      })
    },

    // 删除tab
    remove (tab) {
      this.M_remove_opened(tab)
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs {
  @apply flex flex-row text-sm px-1 leading-none;
  // 滚动容器
  &__container {
    @apply flex-1 items-center rounded-t mx-1 overflow-hidden;
  }
  // 滚动部分
  &__scroll {
    @apply flex flex-row flex-nowrap transition-all;
  }
  // 左右按钮
  &__btn {
    @apply flex-shrink-0 h-6 leading-6 bg-white rounded  px-0 mx-1 relative whitespace-nowrap cursor-pointer hover:bg-secondPrimary-50;
  }
  // 右侧更多菜单
  &__more {
    @apply flex-shrink-0 h-6 leading-6  rounded  px-1 mx-1 relative whitespace-nowrap cursor-pointer hover:bg-secondPrimary-100;
  }
  // tab项
  &__item {
    @apply flex flex-row flex-shrink-0 items-center overflow-hidden rounded-t py-2 px-4 mr-1 relative text-gray-500 whitespace-nowrap transition-colors;
    @apply hover:bg-secondPrimary-100 hover:text-gray-900;
    @apply first:ml-0 last:mr-0;
    @apply group;
    // 栏目图标
    .titleIcon {
      @apply mr-2;
    }
    // 关闭按钮
    .closeIcon {
      @apply absolute top-0 right-0 ml-2 rounded-bl text-secondPrimary-300 transition-opacity;
      @apply hover:bg-red-500 hover:text-secondPrimary-50;
    }
    // 高亮
    &.current {
      @apply bg-white text-primary-400 shadow;
      .closeIcon {
        // @apply text-secondPrimary-100;
      }
    }
  }
}
</style>
