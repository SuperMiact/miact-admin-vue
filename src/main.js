import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Fragment from 'vue-fragment'
import 'default-passive-events'
import store from '@/store'

Vue.use(ElementUI)
Vue.use(Fragment.Plugin)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store, // 配置全局使用store对象
  render: h => h(App),
})
