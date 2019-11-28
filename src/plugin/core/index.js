import config from '../../../package.json'
// 功能插件
import util from '../../utils/util'
import log from '../../utils/log'

export default {
  async install (Vue, options) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示 https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false

    Vue.prototype.$log = log
    Vue.prototype.$util = util

    Vue.prototype.$open = util.open
    Vue.prototype.$print = log.print
    // 打印UI官网
    log.pretty('[' + config.name + '] ' + config.version, 'https://wangbin3162.github.io/docs/bin-org-tree/', 'success')
  }
}
