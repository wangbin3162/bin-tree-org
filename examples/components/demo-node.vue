<template>
  <div class="demo-node" :style="{width:data.width||width||'auto'}">
    <template v-if="isRoot">
      <div class="root-node" @click.stop.prevent="toggleInfo">
        <i :class="`iconfont icon-${data.icon} ${data.sex}`" v-if="data.icon" />
        <span class="title">{{ data.label || data.title }}</span>
        <span class="sex" v-if="data.sex">{{ sexMap[data.sex] }}</span>
      </div>
    </template>
    <template v-else>
      <div class="normal-node" @click.stop.prevent="toggleInfo">
        <i :class="`iconfont icon-${data.icon} ${data.sex}`" v-if="data.icon" />
        <span class="title">{{ data.label || data.title }}</span>
      </div>
    </template>
    <transition name="fade-in">
      <div class="info-list-wrap" v-if="data.infoList && data.infoShow">
        <p v-for="(item,index) in data.infoList"
           :key="item.id||index"
           class="info-item"
           :class="{'has-btn':item.showDetail}"
           :style="item.style"
        >
          <span v-if="item.useHTML" v-html="item.label"></span>
          <span v-else>{{ item.label }}</span>
          <span v-if="item.showDetail" class="detail" @click.stop.prevent="handleCommand('detail',item)">查看>></span>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'demo-node',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    width: String
  },
  computed: {
    isRoot() {
      return !!this.data.root
    }
  },
  data() {
    return {
      sexMap: { male: '男', female: '女' }
    }
  },
  methods: {
    toggleInfo() {
      if (typeof this.data['infoShow'] !== 'undefined') {
        this.data['infoShow'] = !this.data['infoShow']
      }
    },
    handleCommand(action, node) {
      this.$emit('command', action, node, this.data)
    }
  }
}
</script>

<style scoped lang="stylus">
.demo-node {
  position: relative;
  display: inline-block;
  padding: 5px 12px 5px 5px;
  .root-node {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .iconfont {
      width: 32px;
      height: 32px;
      line-height: 32px;
      border-radius: 4px;
      text-align: center;
      font-size: 28px;
      background: rgba(89, 126, 247, 1);
      color: #fff;
      margin-right: 8px;
      &.female {
        background: #f97a81;
      }
    }
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .sex {
      font-size: 18px;
      margin-left: 24px;
    }
  }
  .normal-node {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    transition: .3s;
    .title {
      font-size: 18px;
    }
    &:hover {
      background: rgba(67, 207, 124, 0.05);
    }
  }
  .info-list-wrap {
    width: 100%;
    background: #fff;
    padding-top: 8px;
    .info-item {
      position: relative;
      margin: 0;
      line-height: 26px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &.has-btn {
        padding-right: 40px;
      }
      .detail {
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
        font-size: 12px;
        &:hover {
          color: #1089ff;
        }
      }
    }
  }
}
</style>
