<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-04-28 14:10:45
 * @LastEditTime: 2022-04-28 16:43:06
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\pages\user\group\create\index.vue
-->
<template>
  <my-dialog-form
    v-model="formData"
    :dialog-props="dialogProps"
    :form-props="formProps"
  >
    <template #auth="{field}">
      <el-form-item :label="field.label">
        <div class="flex flex-row">
          <el-checkbox
            :value="isMaster(formData)"
            @click.native.prevent="handleMaster(formData)"
          >
            管理员
          </el-checkbox>

          <el-cascader
            v-show="!isMaster(formData)"
            v-model="formData.auth"
            class="w-full ml-4"
            :options="authTree"
            :props="authCascaderProps"
          />
        </div>
      </el-form-item>
      <pre>{{ formData.auth }}</pre>
    </template>
  </my-dialog-form>
</template>
<script>
import authTree from '~/mixins/authTree'

export default {
  page: { name: '添加分组' },
  mixins: [authTree],
  data () {
    return {
      formData: {
        state: 1,
        auth: []
      },
      dialogProps: {
        title: '添加分组'
      },
      formProps: {
        fields: [
          { label: '组名称', field: 'userName' },
          {
            label: '分配权限',
            field: 'auth'
          }
        ],
        submitApi: this.$api.createUser
      }
    }
  },
  methods: {
    isMaster (formData) {
      return JSON.stringify(formData.auth) === JSON.stringify(['*'])
    },
    handleMaster (formData) {
      const isMaster = this.isMaster(formData)
      if (isMaster) {
        formData.auth = JSON.parse(JSON.stringify(this.authCache || []))
        this.authCache = ''
      } else {
        this.authCache = JSON.parse(JSON.stringify(formData.auth || []))
        formData.auth = ['*']
      }
    }
  }

}
</script>
