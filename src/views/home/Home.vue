<template>
  <div id="home" class="wrapper">
    <nav-bar class="div-nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control
      ref="tabcontrol1"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      class="tab-control" v-show="isTabFixed">
    </tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probetype="3"
      @scroll="scrollcontent"
      :pullUpLoad="true"
      @pullingup="loadmore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        ref="tabcontrol2"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backclick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  import GoodsList from "components/content/goods/GoodsList";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backtop/BackTop";

  import {getHomeMultiData, getGoodsData} from "network/home";

  export default {
    name: "home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,

      NavBar,
      TabControl,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        scrollY: 0
      }
    },

    created() {
      //请求多个数据
      this.getHomeMultiData()
      //请求goods数据
      this.getGoodsData('pop')
      this.getGoodsData('new')
      this.getGoodsData('sell')

      console.log('created')
    },
    destroyed() {
      console.log('destroyed')
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.scrollY, 0)
      console.log('activated')
    },
    deactivated() {
      this.scrollY = this.$refs.scroll.getScrollY
      console.log(this.$refs.scroll.getScrollY)
    },

    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /**
       * 事件监听相关方法
       */
      tabClick(index) {
        // console.log(index)
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabcontrol1.currentIndex = index
        this.$refs.tabcontrol2.currentIndex = index
      },
      backclick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      scrollcontent(position) {
        // 判断backtop是否需要显示
        this.isShowBackTop = (-position.y) > 1000
        //判断tabcontrol是否需要吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadmore() {
        // console.log(1111)
        this.getGoodsData(this.currentType)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
      },

      /**
       * 网络请求相关的方法
       */
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getGoodsData(type) {
        const page = this.goods[type].page + 1;
        getGoodsData(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .div-nav-bar{
    color: #ffffff;
    background-color: var(--color-tint);
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
