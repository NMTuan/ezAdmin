<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-11-19 09:54:00
 * @LastEditTime: 2022-04-29 13:46:49
 * @LastEditors: NMTuan
 * @Description: 确认对话框, 常用语状态转换/删除等操作
 * @FilePath: \ezAdmin\components\myDialog\confirm.vue
-->
<template>
  <el-dialog
    class="myDialogConfirm"
    visible
    :before-close="close"
    v-bind="{
      'append-to-body': true,
      ...dialogProps
    }"
  >
    <div
      v-loading="loading"
    >
      <div class="text-base mb-6">
        <slot />
      </div>
      <div class="text-right">
        <el-button size="medium" :type="confirmProps.cancelType || 'text'" @click="close()">
          {{ confirmProps.cancelText || '取消' }}
        </el-button>
        <el-button size="medium" :type="confirmProps.submitType || 'primary'" @click="submit()">
          {{ confirmProps.submitText || '确定' }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import dialog from '~/mixins/dialog.vue'
export default {
  mixins: [dialog],
  props: {
    confirmProps: {
      type: Object,
      default () {
        return { }
      }
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {

    // 提交表单
    submit () {
      if (!this.confirmProps.submitApi) {
        return
      }
      this.loading = true
      let params = {}
      // 构建参数
      if (this.confirmProps.submitFields) {
        params = this.$utils.handleFetchFields(this.confirmProps.submitFields)
      }

      this.confirmProps.submitApi(params)
        .then((res) => {
          this.loading = false
          if (res.code === this.$cfg.axiosSuccessCode) {
            this.closeAndReload()
          }
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.myDialogConfirm ::v-deep {
  &.el-button--text {
    color: #606266;
    &:hover {
      color: #999
    }
  }
}
</style>
