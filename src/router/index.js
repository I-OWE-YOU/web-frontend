import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/voor-de-ondernemer',
    name: 'Entrepreneur',
    component: () =>
      import(
        /* webpackChunkName: "Entrepreneur" */ '../views/Entrepreneur.vue'
      ),
  },
  {
    path: '/ik-wil-helpen',
    name: 'LetMeHelp',
    component: () =>
      import(/* webpackChunkName: "LetMeHelp" */ '../views/LetMeHelp.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

export default router
