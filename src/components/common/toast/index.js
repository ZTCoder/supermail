import Toast from "./Toast"
import Vue from 'vue'

const obj = {}

obj.install = function (Vue) {
  //创建构造器
  const toastContrustor = Vue.extend(Toast)

  //创建组件对象
  const toast = new toastContrustor()

  //组件对象挂载到某一元素上
  toast.$mount(document.createElement('div'))

  //toast.$el就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
