// 核心插件
import corePlugin from './plugin/core'
// 组件
import OrgTree from './components/org-tree/index'

const components = [
  OrgTree
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.use(corePlugin)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install, OrgTree
}
