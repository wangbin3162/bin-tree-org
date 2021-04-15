<template>
  <div :class="classes">
    <!--label-->
    <div class="bin-tree-org-node-label">
      <div v-if="data.render" :class="labelClasses" :style="labelStyles" @click="handleClick">
        <render :render="data.render" :data="data" :node="node"></render>
      </div>
      <div v-else-if="isParentRender" :class="labelClasses" :style="labelStyles" @click="handleClick">
        <render :render="parentRender" :data="data" :node="node"></render>
      </div>
      <div v-else :class="labelClasses" :style="labelStyles" @click="handleClick">{{ data.label }}</div>
      <!--expand-->
      <span v-if="collapsable && !isLeaf"
            class="bin-tree-org-node-btn"
            :class="{expand:data.expand}"
            @click.stop.prevent="handleExpand"
      />
    </div>
    <!--children-->
    <template v-if="data[childrenKey] && data[childrenKey].length">
      <div class="bin-tree-org-node-children" v-if="!collapsable || data.expand">
        <tree-node
            v-for="(item, i) in data[childrenKey]"
            :key="i"
            :data="item"
            :children-key="childrenKey"
            :horizontal="horizontal"
            :label-style="labelStyle"
            :collapsable="collapsable"
            :label-class-name="labelClassName"
        />
      </div>
    </template>
  </div>
</template>

<script>
import Render from './render'

const prefixCls = 'bin-tree-org'
export default {
  name: 'TreeNode',
  components: { Render },
  inject: ['TreeInstance'],
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    childrenKey: {
      type: String,
      default: 'children'
    },
    horizontal: Boolean,
    collapsable: Boolean,
    labelStyle: Object,
    labelClassName: String
  },
  data() {
    return {
      prefixCls: prefixCls
    }
  },
  computed: {
    isLeaf() {
      return !(Array.isArray(this.data[this.childrenKey]) && this.data[this.childrenKey].length > 0)
    },
    classes() {
      return [
        `${prefixCls}-node`,
        { 'is-leaf': this.isLeaf },
        { 'collapsed': !this.isLeaf && this.collapsable && (!this.data['expand']) }
      ]
    },
    labelClasses() {
      return [`${prefixCls}-node-label-inner`, this.labelClassName]
    },
    labelStyles() {
      return this.data['style'] ? this.data['style'] : this.labelStyle
    },
    isParentRender() {
      const Tree = this.TreeInstance
      return Tree && Tree.render
    },
    parentRender() {
      const Tree = this.TreeInstance
      if (Tree && Tree.render) {
        return Tree.render
      } else {
        return null
      }
    },
    node() {
      const Tree = this.TreeInstance
      if (Tree) {
        // 将所有的 node（即flatState）和当前 node 都传递
        return [Tree.flatState, Tree.flatState.find(item => item.nodeKey === this.data.nodeKey)]
      } else {
        return []
      }
    }
  },
  methods: {
    handleClick() {
      this.TreeInstance.handleClick(this.data.nodeKey)
    },
    handleExpand() {
      const item = this.data
      if (item.disabled) return
      if (item.isLeaf) return
      if (item[this.childrenKey] && item[this.childrenKey].length) {
        this.$set(this.data, 'expand', !this.data.expand)
        this.TreeInstance.toggleExpand(this.data, this.data.expand)
      }
    }
  }
}
</script>
