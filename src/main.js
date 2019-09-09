import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './router.js'
import store from './store'


Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
