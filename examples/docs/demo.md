## 使用示例

### 基础用法

可以设置类似的data数据格式来生成树形组织图，并可以通过style精确配置每个节点的样式

::: demo

```html

<template>

  <div>
    <b-tree-org
        ref="treeOrg"
        :data="data"
        @node-click="handleNodeClick"
        @toggle-expand="handleExpand" />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: {
          id: 0,
          label: "xxx科技有限公司",
          expand: true,
          children: [
            {
              id: 2,
              label: "产品研发部",
              expand: true,
              children: [
                { id: 5, label: "研发-前端" },
                { id: 6, label: "研发-后端" },
                { id: 9, label: "UI设计" },
                { id: 10, label: "产品经理" }
              ]
            },
            {
              id: 3,
              label: "销售部",
              expand: true,
              children: [
                { id: 7, label: "销售一部" },
                { id: 8, label: "销售二部" }
              ]
            },
            { id: 4, label: "财务部" },
            { id: 9, label: "HR人事" }
          ]
        },
      }
    },
    methods: {
      handleNodeClick(node) {
        console.log('handleNodeClick: ', node)
      },
      handleExpand(node, expand) {
        console.log('handleExpand: ', node, expand)
      }
    }
  }
</script>
```

:::

### 多种配置

可以配置多种模式以及自定义节点的样式

::: demo

```html

<template>

  <div>
    <div flex="cross:center">
      <div style="padding-left: 30px;">
        <b-switch v-model="horizontal"></b-switch>
        是否是横向
      </div>
      <div style="padding-left: 30px;">
        <b-switch v-model="collapsable"></b-switch>
        可展开收起
      </div>
      <div style="padding-left: 30px;">
        <b-switch v-model="expandAll" @change="handleExpandAll"></b-switch>
        展开全部
      </div>
      <div style="padding-left: 30px;">
        背景色：
        <b-color-picker v-model="style.background" size="small"></b-color-picker>&nbsp;
        文字颜色：
        <b-color-picker v-model="style.color" size="small"></b-color-picker>&nbsp;
      </div>
    </div>
    <br>
    <b-tree-org
        ref="treeOrg"
        :data="data"
        :horizontal="horizontal"
        :collapsable="collapsable"
        :label-style="style"
        @node-click="handleNodeClick"
        @toggle-expand="handleExpand" />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: {
          id: 0,
          label: "xxx科技有限公司",
          expand: true,
          children: [
            {
              id: 2,
              label: "产品研发部",
              expand: true,
              style: {
                background: '#fafafa',
                color: '#1089ff'
              },
              children: [
                { id: 5, label: "研发-前端" },
                { id: 6, label: "研发-后端" },
                { id: 9, label: "UI设计" },
                { id: 10, label: "产品经理" }
              ]
            },
            {
              id: 3,
              label: "销售部",
              expand: true,
              children: [
                { id: 7, label: "销售一部" },
                { id: 8, label: "销售二部" }
              ]
            },
            { id: 4, label: "财务部" },
            { id: 9, label: "HR人事" }
          ]
        },
        horizontal: true,
        collapsable: true,
        expandAll: true,
        style: {
          background: '#fff',
          color: '#5e6d82'
        }
      }
    },
    methods: {
      handleExpandAll(value) {
        if (value) {
          this.$refs.treeOrg.expandAll()
        } else {
          this.$refs.treeOrg.collapseAll()
        }
      },
      handleNodeClick(node) {
        console.log('handleNodeClick: ', node)
      },
      handleExpand(node) {
        console.log('handleExpand: ', node)
      }
    }
  }
</script>
```

:::

### render函数构建节点

通过render可以渲染更加定制化的节点内容，具体需要按照实际业务进行自定义配置，异步加载逻辑也可以按照此方式自行定制

::: demo

```html

<template>
  <div class="custom-tree" style="min-height: 400px;">
    <b-tree-org
        ref="treeOrg"
        :data="data"
        horizontal
        :render="renderContent"
        :label-style="style" />
    <b-modal v-model="modal" title="自定义弹窗">
      <p>{{detail}}</p>
    </b-modal>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        style: {
          display: 'flex',
          alignItems: 'center',
          cursor: 'default',
          padding: 0,
          minHeight: '44px',
          // border: '1px solid #eee',
          // boxShadow: 'none'
        },
        data: {
          id: '001',
          label: '郭小宁',
          icon: 'ios-person',
          sex: 'female',
          width: '200px',
          infoList: [
            { id: '001-001', label: '证件号码：320311********1230' },
            { id: '001-002', label: '完整度：50%' },
            { id: '001-003', label: '更新时间：2020-06-16 14:03' }
          ],
          infoShow: true,
          root: true,
          expand: true,
          children: [
            {
              id: '002',
              label: '基本信息',
              infoList: [
                { id: '002-001', label: '证件号码：320311********1230' },
                { id: '002-002', label: '完整度：50%' },
                { id: '002-003', label: '更新时间：2020-06-16 14:03' }
              ],
              infoShow: true
            },
            {
              id: '003',
              label: '行政许可(2)',
              infoList: [
                {
                  id: '003-001',
                  label: '<i class="iconfont icon-ios-information-circle-outline"></i>第1条 建筑施工特种作业人员操作资格考核',
                  style: { fontSize: '14px', paddingLeft: '20px', lineHeight: '32px' },
                  useHTML: true,
                  showDetail: true
                },
                {
                  id: '003-002',
                  label: '<i class="iconfont icon-ios-information-circle-outline"></i>第2条 建筑施工特种作业人员操作资格考核',
                  style: { fontSize: '14px', paddingLeft: '20px', lineHeight: '32px' },
                  useHTML: true,
                  showDetail: true
                }
              ],
              infoShow: true,
              children: [
                {
                  id: '003-001',
                  label: '清单名称：建筑操作资格考核1',
                },
                {
                  id: '003-002',
                  label: '清单名称：建筑操作资格考核2',
                }
              ]
            },
            {
              id: '004',
              label: '行政处罚',
            }
          ]
        },
        detail: {},
        modal: false
      }
    },
    methods: {
      renderContent(h, { root, node, data }) {
        return h('demo-node', {
          props: {
            data,
            width: '380px'
          },
          on: {
            command: this.handleCommand
          }
        })
      },
      handleCommand(action, node, data) {
        console.log(node, action)
        this.detail = { action, ...node }
        this.modal = true
      },
      customClick(data) {
        console.log(data)
      }
    }
  }
</script>
```

:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| data     | 数据源,必须传入   | []  |  —   |   —   |
| childrenKey    | childrenKey   | String  |  —   |  children  |
| horizontal     | 是否是横向   | Boolean  | true,false  |  false  |
| collapsable     | 是否可以展开收起节点   | Boolean  | true,false  |  false  |
| render     | 渲染函数   | Function  |  —   |   —   |
| labelStyle     | 自定义label标签的样式   | Object  |  —   |   —    |
| labelClassName     | 自定义label节点的样式名   |  String  |  —   |   —   |
| defaultExpand  | 默认展开收起的值   | Boolean  |  —   |   —   |

### Events

| 事件名      | 说明    | 返回值      |
|---------- |-------- |---------- |
| toggle-expand | 展开收起事件  |  data  |
| node-click | 节点点击事件 |  data  |

