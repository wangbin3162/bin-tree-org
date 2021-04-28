// 核心插件
import corePlugin from './plugin'
// 组件
import TreeOrg from './components/tree'

const components = [
  TreeOrg
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
  install, TreeOrg
}
