import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/product2',
    name: 'product2',
    component: () => import('../components/product2/product2.vue')
  },
  {
    path: '/coupon',
    name: 'coupon',
    component: () => import('../components/coupon/coupon.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/admin/login.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../components/admin/admin.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
