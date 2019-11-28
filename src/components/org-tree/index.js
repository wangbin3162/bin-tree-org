import OrgTree from './org-tree.vue'

/* istanbul ignore next */
OrgTree.install = function (Vue) {
  Vue.component(OrgTree.name, OrgTree)
}

export default OrgTree
