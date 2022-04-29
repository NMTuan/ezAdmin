<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-04-29 11:47:29
 * @LastEditTime: 2022-04-29 14:03:12
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\pages\user\group\update\_id.vue
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
  page: { name: '编辑分组' },
  mixins: [authTree],
  data () {
    return {
      formData: {
        state: 1,
        auth: []
      },
      dialogProps: {
        title: '编辑分组'
      },
      formProps: {
        fields: [
          { label: '编号', field: 'id', elProps: { readonly: true } },
          { label: '组名称', field: 'groupName' },
          {
            label: '分配权限',
            field: 'auth'
          }
        ],
        fetchApi: this.$api.fetchGroup,
        fetchFields: ['id'],
        submitApi: this.$api.updateGroup
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
