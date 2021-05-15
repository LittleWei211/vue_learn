// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import "babel-polyfill"
import "element-ui/lib/theme-chalk/index.css"
import "../static/css/common.css"
import  "../static/css/global.css"
import "jquery"
import "jquery.nicescroll"

Vue.config.productionTip = false
Vue.filter('fixedOrUnfixed',function(value){
  switch (value) {
    case 0:
      return "新发现"
      break;
    case 1:
      return "已确认"
      break;
    case 2:
      return "已修复"
      break;
    case 3:
      return "误报"
      break;
    case 4:
      return "忽略"
      break;
    default:
      break;
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
