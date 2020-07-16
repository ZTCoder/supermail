<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick"/>
    <scroll class="detail-content" ref="detailscroll" :probetype="3" @scroll="contentScroll">
      <detail-item :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info ref="detailparam" :param-info="paramInfo"/>
      <detail-comment-info ref="detailcomment" :comment-info="commentInfo"/>
      <goods-list ref="detailrecomment" :goods="recomments"/>
    </scroll>
    <DetailBottomBar @addCart="addCart"/>
    <back-top @click.native="backclick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailItem from "./childComps/DetailItem";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import Scroll from "components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import {getDetail, Goods, Shop, GoodsParam, getRecommends} from "network/detail";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backtop/BackTop";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailItem,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop,
    },
    data() {
      return {
        iid: null,
        topImages: null,
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recomments: [],
        themeTopYs: [],
        currentIndex: 0,
        isShowBackTop: false,
      }
    },
    methods: {
      imgLoad() {
        this.$refs.detailscroll.finishPullUp

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.detailparam.$el.offsetTop)
        this.themeTopYs.push(this.$refs.detailcomment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.detailrecomment.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      },
      titleClick(index) {
        this.$refs.detailscroll.scrollTo(0, -this.themeTopYs[index]+44, 200)
      },
      contentScroll(position) {
        const positionY = -position.y
        const length = this.themeTopYs.length
        for(let i =0; i < length-1; i++) {
          if(this.currentIndex !== i && (positionY >=  this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        this.isShowBackTop = (-position.y) > 1000
      },
      backclick() {
        this.$refs.detailscroll.scrollTo(0, 0, 500)
      },
      addCart() {
        // 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        //加入到购物车
        if(product.iid) {
          // this.$store.commit('addToCart', product)
          this.$store.dispatch('realAddToCart', product)
        }
      }
    },
    created() {
      //获取iid
      this.iid = this.$route.params.iid

      //获取详情信息
      getDetail(this.iid).then(res => {
        // console.log(res)
        const data = res.result
        //获取轮播图
        this.topImages = data.itemInfo.topImages
        //获取详情信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //获取店家信息
        this.shop = new Shop(data.shopInfo)
        //获取商品详情
        this.detailInfo = data.detailInfo
        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //获取评价信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
      //获取推荐信息
      getRecommends().then(res => {
        this.recomments = res.data.list
      })
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .detail-content {
    height: calc(100% - 44px - 49px);
  }
</style>
