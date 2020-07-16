<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backclick">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          class="title-item"
          @click="titleclick(index)"
          :class="{active: index == currentIndex}">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return{
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleclick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backclick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 14px;
  }
  .title-item{
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .back {
    margin-top: 5px;
  }
</style>
