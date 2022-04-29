<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-11-19 11:57:15
 * @LastEditTime: 2022-04-28 16:47:26
 * @LastEditors: NMTuan
 * @Description: 权限树 数据及配置
 * @FilePath: \ezAdmin\mixins\authTree.vue
-->
<script>
export default {
  data () {
    return {
      // 级联选择器 属性
      authCascaderProps: {
        emitPath: false, // 返回整个路径值
        checkStrictly: true, // 随意选
        multiple: true // 多选
      }
    }
  },
  computed: {
    // 级联选择器 数据
    authTree () {
      const data = JSON.parse(JSON.stringify(this.$pages))
      const root = this.composeTree(data)
      return root
    }
  },
  methods: {
    // 构建树
    composeTree (data, level = 1, name = '') {
      return data.reduce((total, item) => {
        if (item.level === level && item.routeName.indexOf(name) === 0) {
          const obj = {}
          obj.label = item.name
          obj.value = item.routeName
          const children = this.composeTree(data, level + 1, item.routeName)
          const grandson = this.composeTree(data, level + 2, item.routeName)
          if (children.length > 0) {
            obj.children = children
          } else if (grandson.length > 0) {
            obj.children = grandson
          }
          total.push(obj)
        }
        return total
      }, [])
    }
  }

}
</script>
