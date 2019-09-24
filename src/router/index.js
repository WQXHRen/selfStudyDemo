import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login/index.vue'
import home from '../views/home/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      component:login
    },
    {
      path:'',
      redirect:'/login'
    },
    {
      path:'/home',
      component:home
    }
  ]
})
