// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.use(ElementUI)
//把axios对象挂到Vue实例上面，使用axios的时候直接全局调用this.$axios就可以了 
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api' // 设置跨域代理基本路径前缀

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
