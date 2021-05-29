// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import AlleyUI from "./components"
Vue.use(AlleyUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.directive('focus', {
  bind(el, binding, vnode) {
    el.placeholder = "请输入..."
  },
  inserted(el, binding, vnode) {
    el.focus();
  },
});
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
