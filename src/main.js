import Vue from 'vue'
import App from './App.vue'
import Fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import router from "./router";
import store from "./store";
import toast from 'components/common/toast'
Vue.config.productionTip = false

Vue.use(toast)
Vue.use(VueLazyLoad)
Fastclick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
