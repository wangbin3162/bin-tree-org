<template>
  <div class="bin-tree-org-wrap">
    <div class="bin-tree-org" :class="{horizontal, collapsable}">
      <tree-node
          :data="data"
          :children-key="childrenKey"
          :horizontal="horizontal"
          :label-style="labelStyle"
          :collapsable="collapsable"
          :label-class-name="labelClassName"
      />
    </div>
  </div>
</template>

<script>
import TreeNode from './node.vue'

export default {
  name: 'BTreeOrg',
  components: { TreeNode },
  provide() {
    return { TreeInstance: this }
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    childrenKey: {
      type: String,
      default: 'children'
    },
    render: Function,
    horizontal: Boolean,
    collapsable: {
      type: Boolean,
      default: true
    },
    labelStyle: Object,
    defaultExpand: Boolean, // 默认展开状态
    labelClassName: String
  },
  data() {
    return {
      stateTree: this.data,
      flatState: []
    }
  },
  created() {
    this.flatState = this.compileFlatState()
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.stateTree = this.data
        this.flatState = this.compileFlatState()
      }
    }
  },
  methods: {
    compileFlatState() { // 每个结点都有一个关系父结点/子结点
      let keyCounter = 0
      let { childrenKey, defaultExpand } = this
      const flatTree = []

      const flattenChildren = (node, parent) => {
        this.$set(node, 'nodeKey', keyCounter++)
        if (typeof node.expand === 'undefined') {
          this.$set(node, 'expand', defaultExpand)
        }
        flatTree[node.nodeKey] = { node: node, nodeKey: node.nodeKey }
        if (typeof parent !== 'undefined') {
          flatTree[node.nodeKey].parent = parent.nodeKey
          flatTree[parent.nodeKey][childrenKey].push(node.nodeKey)
        }

        if (node[childrenKey]) {
          flatTree[node.nodeKey][childrenKey] = []
          node[childrenKey].forEach(child => flattenChildren(child, node))
        }
      }

      flattenChildren(this.data)
      return flatTree
    },
    handleClick(nodeKey) {
      const node = this.flatState[nodeKey].node
      this.$emit('node-click', node)
    },
    toggleExpand(node, expand) {
      this.$emit('toggle-expand', node, expand)
    },
    /* public API 折叠所有 */
    collapseAll() {
      this.flatState.forEach(node => {
        node.node.expand = false
      })
    },
    /* public API 展开所有 */
    expandAll() {
      this.flatState.forEach(node => {
        node.node.expand = true
      })
    }
  }
}
</script>
