import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import '@/assets/css/global.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(axios)
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:8081/api'
Vue.prototype.$http = axios
// axios.defaults.headers.post['Content-Type'] = 'application/json'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export const devServer = {
  disableHostCheck: true
}
