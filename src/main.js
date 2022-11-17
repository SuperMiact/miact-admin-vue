import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Fragment from 'vue-fragment'
import 'default-passive-events'

Vue.use(ElementUI)
Vue.use(Fragment.Plugin)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
