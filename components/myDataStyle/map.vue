<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-02-09 17:06:37
 * @LastEditTime: 2022-04-28 13:29:21
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\components\myDataStyle\map.vue
-->
<template>
  <div>
    <el-tag
      v-if="handlerValue.type && handlerValue.label"
      :type="handlerValue.type"
      size="small"
    >
      {{ handlerValue.label }}
    </el-tag>
    <template v-else>
      {{ handlerValue.label }}
    </template>
  </div>
</template>
<script>
import defaultComponent from './default'
export default {
  extends: defaultComponent,
  computed: {
    handlerValue () {
      return this.props?.items.find(item => item.value === this.value) || {}
    }
  }
}
</script>
