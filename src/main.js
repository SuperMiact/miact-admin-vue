import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Fragment from 'vue-fragment'
import 'default-passive-events'

Vue.use(ElementUI)
Vue.use(Fragment.Plugin)
Vue.use(VueCookies)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
