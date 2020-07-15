<template>
  <div>
    <detail-nav-bar/>
    <detail-item :top-images="topImages"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childNavBar/DetailNavBar";
  import DetailItem from "./childNavBar/DetailItem";

  import {getDetail} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailItem
    },
    data() {
      return {
        iid: null,
        topImages: null
      }
    },
    created() {
      //获取iid
      this.iid = this.$route.params.iid
      //获取轮播图
      getDetail(this.iid).then(res => {
        console.log(res)
        this.topImages = res.result.itemInfo.topImages
      })
    }
  }
</script>

<style scoped>

</style>
