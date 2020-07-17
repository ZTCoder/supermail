<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :product="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import CartListItem from "./CartListItem";
  import Scroll from "components/common/scroll/Scroll";
  import {mapGetters} from 'vuex'
  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters([
        'cartList',
      ])
    },
    //bug不起作用
    activated() {
      console.log(111)
      this.$refs.scroll.refresh
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
