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

import dayjs from 'dayjs'
// 导入相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 加载这个插件
dayjs.extend(relativeTime)
// 导入中文包
import 'dayjs/locale/zh-cn'
// 使用中文包
dayjs.locale('zh-cn')

Vue.filter('relvTime',(value) => {
   return dayjs(value).from( dayjs() );
})  

import './assets/navbar.less'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
