<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    components: {
      BScroll
    },
    activated() {
      console.log('-----activated')
    },
    deactivated() {
      console.log('------deactivated')
    },
    props: {
      probetype: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probetype,
        pullUpLoad: this.pullUpLoad
      })
      //监听滚动位置
      this.scroll.on('scroll', (position) => {
        //scroll.on('scroll', function)这里的scroll代表的是监听滚动类型
        this.$emit('scroll', position)
      })
      //监听上拉刷新
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingup')
      })
    },
    methods: {
      scrollTo(x, y, time) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
