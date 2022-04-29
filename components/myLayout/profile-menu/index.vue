<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-11-15 21:57:19
 * @LastEditTime: 2021-11-16 19:50:00
 * @LastEditors: NMTuan
 * @Description: 用户菜单
 * @FilePath: \nuxt_admin\components\layout\profile-menu\index.vue
-->
<template>
  <div>
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        <div class="mr-3">
          {{ realName }} <i class="el-icon-arrow-down el-icon--right" />
        </div>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>帐号信息</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item>等等等</el-dropdown-item>
        <el-dropdown-item divided command="exit">
          安全退出
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  computed: {
    realName () {
      return this.$auth.user.real_name
    }
  },
  methods: {
    handleCommand (command) {
      if (this[command] && typeof this[command] === 'function') { this[command]() }
    },
    exit () {
      this.$confirm('确定要退出吗?', '退出')
        .then(() => {
          this.$auth.logout()
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar {
  @apply block w-10 h-10 mx-3 leading-10 rounded-full bg-primary-400 text-white text-center cursor-pointer;
}
</style>
