<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-02-10 09:30:06
 * @LastEditTime: 2022-02-10 10:10:31
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\components\myDataStyle\thumb.vue
-->
<template>
  <el-image
    v-if="value"
    :src="value"
    :class="props.class || 'w-8 h-8'"
    :fit="handlerFit"
    :preview-src-list="handlerPreview"
  />
</template>
<script>
import defaultComponent from './default'
export default {
  extends: defaultComponent,
  computed: {
    handlerFit () {
      const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
      if (this.props.fit && fits.includes(this.props.fit)) {
        return this.props.fit
      } else {
        return ''
      }
    },
    handlerPreview () {
      const images = []
      // 如果有设置previewField字段，则从data中找。
      // 适配字符串和数组。
      if (this.props.previewField && this.data[this.props.previewField]) {
        if (typeof this.data[this.props.previewField] === 'string') {
          images.push(this.data[this.props.previewField])
        } else {
          this.data[this.props.previewField].forEach((item) => { images.push(item) })
        }
      } else {
        images.push(this.value)
      }
      return images
    }
  }
}
</script>
