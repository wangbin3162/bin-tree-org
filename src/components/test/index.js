import Test from './test.vue'

/* istanbul ignore next */
Test.install = function (Vue) {
  Vue.component(Test.name, Test)
}

export default Test
