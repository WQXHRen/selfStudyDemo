import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login/index.vue'
import home from '../views/home/index.vue'
import mune from '../views/menu/index.vue'
import search from '../views/search/index.vue'
import results from '../views/results/index.vue'
import details from '../views/details/index.vue'
import mine from "../views/mine/index.vue"
import profile from "../views/profile/index.vue"
const xiaozhi = () => import("../views/xiaozhi/index.vue")

Vue.use(Router)

export default new Router({
	routes: [

		{
			path: '/login',
			component: login
		},
		{
			path: '/search',
			component: search
		},
		{
			path: '/results/:key',
			component: results

		},
		{
			path: '',
			redirect: '/home'
		},
		{
			path: 'mune',
			component: mune,
			children: [{
				path: '/home',
				component: home
			}, {
				path: '/mine',
				component: mine
			}]
		},
		{
			path: '/mune',
			redirect: '/home'
		},
		{
			path: '/details/:art_id',
			component: details
		},
		{
			path: '/profile',
			component: profile
		},
		{
			path: '/xiaozhi',
			component: xiaozhi
		}


	]
})
