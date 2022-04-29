<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-11-19 10:57:10
 * @LastEditTime: 2022-04-11 22:31:44
 * @LastEditors: NMTuan
 * @Description: 对话框 公共方法
 * @FilePath: \ezAdmin\mixins\dialog.vue
-->
<script>
export default {
  props: {
    // 对话框属性
    dialogProps: {
      type: Object,
      default () {
        return {
        }
      }
    }
  },
  methods: {
    // 关闭对话框
    // params, 供下面的closeAndReload方法传参.
    close (params) {
      // 点击对话框右上角关闭按钮, 默认会传递fun进来, 需要容错一下
      if (typeof params === 'function') {
        params = undefined
      }

      const route = this.$route.matched[this.$route.matched.length - 2]
      const name = route.name

      this.$router.replace({
        name,
        params: params || this.$route.params
      })
    },
    // 关闭并重载, 增加reload参数, 通知上层页面进行数据重载.
    closeAndReload (res) {
      this.close({
        ...this.$route.params,
        reload: true
      })
      // TODO
      if (this.dialogProps.closed) {
        this.dialogProps.closed(res)
      }
    }
  }
}
</script>
