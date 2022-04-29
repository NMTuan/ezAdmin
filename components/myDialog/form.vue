<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-11-19 09:54:00
 * @LastEditTime: 2022-04-28 17:28:08
 * @LastEditors: NMTuan
 * @Description: 通用的 表单 对话框
 * @FilePath: \ezAdmin\components\myDialog\form.vue
-->
<template>
  <el-dialog
    visible
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="close"
    v-bind="{
      'append-to-body': true,
      ...dialogProps
    }"
  >
    <!-- <slot name="beforeForm" /> -->
    <my-form
      v-model="formData"
      v-bind="formProps"
      :cancel="close"
      :succeed="closeAndReload"
    >
      <!-- 插槽嵌套 -->
      <!-- https://stackoverflow.com/questions/53430731/vuejs-nested-slots-how-to-pass-slot-to-grandchild -->
      <!-- TODO 由于formData现在可以v-model了, 所以这里传参中可以去掉formData -->
      <template
        v-for="(_, slot) in $scopedSlots"
        #[slot]="props"
      >
        <slot :name="slot" v-bind="props" />
      </template>
      <slot :formData="formProps" />
    </my-form>
    <!-- <slot name="afterForm" /> -->
  </el-dialog>
</template>
<script>
import dialog from '~/mixins/dialog.vue'
export default {
  mixins: [dialog],
  props: {
    // v-model
    value: {
      type: Object,
      default () {
        return {}
      }
    },
    // 表单属性
    formProps: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  emits: [
    'input'
  ],
  data () {
    return {
      formData: {}
    }
  },
  watch: {
    formData: {
      deep: true,
      handler (value) {
        this.$emit('input', value) // v-model
      }
    }
  },
  mounted () {
    this.formData = { ...this.formData, ...this.value }
  }
}
</script>
