<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-11-29 15:52:50
 * @LastEditTime: 2022-02-10 10:13:21
 * @LastEditors: NMTuan
 * @Description: 统一数据展示风格
 * @FilePath: \ezAdmin\components\myDataStyle\index.vue
-->
<template>
  <component
    :is="itemComponent"
    :value="value"
    :data="data"
    :props="props"
  />
</template>
<script>
export default {
  props: {
    // 字段名
    field: {
      type: String,
      default: ''
    },

    // 值
    value: {
      type: [String, Number],
      default: ''
    },
    // 类型
    type: {
      type: String,
      default: ''
    },
    // 相关数据
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    // 配置项
    props: {
      type: [Array, Object],
      default () {
        return {}
      }
    }
  },
  computed: {
    itemComponent () {
      // 组件名：【‘组件type值（可能有别名）’】
      const components = {
        date: ['date', 'dateTime', 'datetime'],
        tag: ['tag'],
        map: ['map', 'enum'],
        link: ['link', 'to'],
        thumb: ['thumb', 'img', 'image']
      }
      const name = Object.keys(components).find((key) => {
        return components[key].includes(this.type)
      })
      return 'my-data-style-' + (name || 'default')
    }
  },
  methods: {}
}
</script>
