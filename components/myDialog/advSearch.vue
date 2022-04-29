<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-11-20 19:41:20
 * @LastEditTime: 2022-04-21 15:27:44
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\components\myDialog\advSearch.vue
-->
<template>
  <el-dialog
    visible
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
    destroy-on-close
    :before-close="close"
    v-bind="{
      'append-to-body': true,
      ...dialogProps
    }"
  >
    <my-form
      v-model="formData"
      v-bind="formProps"
      @search="handleSearch"
      @cancel="close"
    />
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
  },
  methods: {
    close () {
      this.$emit('cancel')
    },
    handleSearch () {
      this.$emit('search')
      this.close()
    }
  }
}
</script>
