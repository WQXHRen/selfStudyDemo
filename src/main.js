import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import './assets/base.css'
// 导入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.prototype.$toast.allowMultiple()
Vue.use(Vant);

import 'amfe-flexible'
// 引入提示消息
import { Notify } from 'vant';
Vue.use(Notify);

import './assets/navbar.less'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
