<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-02-09 14:08:59
 * @LastEditTime: 2022-02-09 16:21:18
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\components\myTable\column.vue
-->
<template>
  <div>
    <!-- 操作列 -->
    <template v-if="field.type === 'action' && Array.isArray(field.actionItems) && field.actionItems.length > 0">
      <el-button
        v-for="(action, actionIndex) in field.actionItems"
        v-show="handlerRowActionHidden(row, action)"
        :key="`rowAction${actionIndex}`"
        v-check="action.auth || action.toName"
        plain
        :type="action.type"
        size="mini"
        @click="handlerActionClick(action, row)"
      >
        {{ action.label }}
      </el-button>
    </template>

    <!-- 统一格式处理 -->
    <my-data-style
      v-else-if="field.type"
      :value="value"
      :data="row"
      :type="field.type"
      :props="field.props"
    />

    <!-- 实现原本的formatter()方法 -->
    <template v-else-if="typeof field.formatter === 'function'">
      {{ field.formatter(row, column, value) }}
    </template>

    <!-- 默认展示 -->
    <template v-else>
      {{ value }}
    </template>
  </div>
</template>
<script>
export default {
  props: {
    field: {
      type: Object,
      default () {
        return {}
      }
    },
    row: {
      type: Object,
      default () {
        return {}
      }
    },
    // rowIndex: {
    //   type: Number,
    //   default: undefined
    // },
    column: {
      type: Object,
      default () {
        return {}
      }
    },
    // columnIndex: {
    //   type: Number,
    //   default: undefined
    // },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    // 处理行操作按钮隐藏状态
    handlerRowActionHidden (row, { hidden }) {
      if (typeof hidden === 'object' && Object.keys(hidden).length > 0) {
        const res = Object.keys(hidden).some((field) => {
          return hidden[field].includes(row[field])
        })
        return !res
      } else {
        return true
      }
    },
    // 处理操作项的点击事件
    handlerActionClick (action, row) {
      if (action.handler && typeof action.handler === 'function') {
      // 如果有自定义，则走自定义
        action.handler(row)
      } else if (action.toName) {
      // 如果有toName，则跳转
        this.$router.push({
          name: action.toName,
          params: {
            ...this.$route.params,
            ...row
          }
        })
      }
    }

  }

}
</script>
