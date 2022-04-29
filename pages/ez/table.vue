<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-02-05 22:28:02
 * @LastEditTime: 2022-04-21 14:28:06
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\pages\ez\table.vue
-->
<template>
  <my-table v-bind="tableProps">
    <!-- <template #date="{rowIndex, columnIndex}">
      {{ rowIndex }} | {{ columnIndex }}
    </template> -->
    <!-- <template #a_b="{value}">
      {{ value }}
    </template> -->
  </my-table>
</template>
<script>
export default {
  page: {
    name: '表格',
    sort: 200
  },
  data () {
    return {
      tableProps: {
        fields: [
          { label: '战争名称', field: 'name', elProps: { width: 100 } },
          // {
          //   label: 'thumb',
          //   field: 'thumb',
          //   type: 'thumb',
          //   props: {
          //     preview: true,
          //     previewField: 'thumbs'
          //   }
          // },
          {
            label: '时间/年',
            field: 'date',
            type: 'link',
            props: {
              toName: 'ez'
            },
            elProps: {
              width: 100
            }
          },
          // {
          //   label: '性别',
          //   field: 'sex',
          //   type: 'map',
          //   props: {
          //     items: [
          //       { label: '男', value: 1 },
          //       { label: '女', value: 2, type: 'danger' },
          //       { label: '未知', value: 0 }
          //     ]
          //   }
          // },
          // {
          //   label: 'timestamp',
          //   field: 'timestamp',
          //   type: 'date',
          //   props: {
          //     format: 'HH:mm:ss',
          //     empty: '-'
          //   }
          // },
          // {
          //   label: 'a/b',
          //   field: 'a.b',
          //   type: 'tag',
          //   props: {
          //     field: 'name',
          //     types: {
          //       primary: [11],
          //       success: [22],
          //       danger: [44, 55]
          //     }
          //   }
          // },
          {
            label: '双方统帅',
            field: 'leader',
            elProps: {
              width: 100,
              sortable: true
            }
          },
          {
            label: '结果',
            field: 'result'
          },
          {
            label: '操作',
            type: 'action',
            actionItems: [
              {
                label: '123',
                toName: 'ez-table-list',
                hidden: {
                  date: ['190']
                },
                handler () {
                  alert(123)
                }
              }
            ],
            elProps: {
              width: 80
            }
          }
        ],
        // data: [
        //   // https://baike.baidu.com/item/%E4%B8%89%E5%9B%BD/5428#7_2
        //   { name: '黄巾起义', thumb: 'https://dummyimage.com/300/09f.png/fff', sex: 1, timestamp: 1218196800000, a: { b: 11 }, date: '184-186', leader: '何进、张角', result: '何进依靠众多地方军阀击败张角' },
        //   {
        //     name: '讨伐董卓',
        //     thumb: 'http://dummyimage.com/200x100',
        //     thumbs: [
        //       'https://dummyimage.com/300/09f.png/fff',
        //       'https://dummyimage.com/300/369.png/fff',
        //       'https://dummyimage.com/300/491.png/fff',
        //       'https://dummyimage.com/300/f4a.png/fff',
        //       'https://dummyimage.com/300/95e.png/fff'
        //     ],
        //     sex: 2,
        //     timestamp: '',
        //     a: { b: 22 },
        //     date: '189-191',
        //     leader: '董卓、袁绍',
        //     result: '董卓迁都长安，盟军决裂，形成军阀割据局面'
        //   },
        //   {
        //     name: '江夏之战',
        //     thumb: 'https://dummyimage.com/200x300&text=dummyimage.com+rocks!',
        //     thumbs: 'https://dummyimage.com/300/491.png/fff',
        //     sex: 0,
        //     timestamp: 1644394236251,
        //     a: { },
        //     date: '190',
        //     leader: '刘表、孙坚',
        //     result: '刘表杀孙坚，孙策接任'
        //   },
        //   { name: '兖州之战', thumb: 'http://dummyimage.com/100x100', sex: '', timestamp: 1328356800, a: { b: 44 }, date: '192', leader: '曹操、青州黄巾军', result: '曹操击败黄巾军，取得兖州' },
        //   { name: '宛城之战', thumb: '', sex: 1, timestamp: 1218196800, a: { b: 55 }, date: '197-199', leader: '曹操、张绣', result: '第一次战斗曹操损失爱子曹昂与爱将典韦，第二次战斗取胜' }
        // ],
        fetchApi: this.$api.myTable,
        fetchFields: { titleA: '123' },
        // elProps: {
        //   border: true
        // },
        type: 'selection',
        actions: [
          {
            label: '按钮',
            toName: 'ez-table-create'
          },
          {
            label: '单选多选都可',
            forCurrent: true,
            forSelected: true,
            toName: 'ez'
          },
          {
            label: '处理单选',
            toName: 'ez',
            forCurrent: true
          },
          {
            label: '处理多选',
            toName: 'ez',
            type: 'danger',
            forSelected: true
          }
        ],
        searchItems: [
          { label: '关键字A', field: 'titleA' },
          {
            label: '关键字B',
            field: 'titleB',
            type: 'select',
            options: [
              { label: '设计师', value: '1' },
              { label: '程序员', value: '2' },
              { label: '产品经理', value: '3' }
            ]
          },
          { label: '关键字C', field: 'titleC' }
        ],
        searchItemsLimit: 1
      }
    }
  }
}
</script>
