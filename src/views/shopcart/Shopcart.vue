<template>
  <div class="shopCart">
    <nav-bar class="cartNavBar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";
  import {mapGetters} from 'vuex'
  export default {
    name: "shopcart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters([
        'cartLength',
      ])
    }
  }
</script>

<style scoped>
  .cartNavBar {
    background-color: var(--color-tint);
    color: #fff;
  }
  .shopCart {
    height: 100vh;
  }
</style>
