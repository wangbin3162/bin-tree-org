<template>
    <div class="tree-org-container">
        <div class="tree-org" :class="{horizontal, collapsable}">
            <tree-org-node
                    :data="data"
                    :props="props"
                    :horizontal="horizontal"
                    :label-style="labelStyle"
                    :collapsable="collapsable"
                    :render-content="renderContent"
                    :label-class-name="labelClassName"
                    @on-expand="(e, data) => {$emit('on-expand', e, data)}"
                    @on-node-click="(e, data) => { $emit('on-node-click', e, data)}"
            />
        </div>
    </div>
</template>

<script>
  import render from './node'

  export default {
    name: 'BTreeOrg',
    components: {
      TreeOrgNode: {
        render,
        functional: true
      }
    },
    props: {
      data: {
        type: Object,
        required: true
      },
      props: {
        type: Object,
        default: () => ({
          label: 'label',
          expand: 'expand',
          children: 'children'
        })
      },
      horizontal: Boolean,
      selectedKey: String,
      collapsable: Boolean,
      renderContent: Function,
      labelStyle: Object,
      labelClassName: [Function, String],
      selectedClassName: [Function, String]
    }
  }
</script>
