<template>
  <div class="tabbar-item" @click="itclick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itclick() {
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tabbar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 12px;
  }
  .tabbar-item img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-top: 2px;
  }
  .Active {
    color: #ff0000;
  }
</style>
