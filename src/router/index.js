import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login/index.vue'
import home from '../views/home/index.vue'
import mune from '../views/menu/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '',
      redirect: '/login'
    },
    {
      path: 'mune',
      component: mune,
      children: [{
        path: '/home',
        component: home
      }]
    }, {
      path: '/mune',
      redirect: '/home'
    }

  ]
})
