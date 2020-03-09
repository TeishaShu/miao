import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',  //對應的虛擬路徑
    name: 'home',
    component: () => import('../views/home.vue'),  //對應到的文件
    children:[
      {
        path: '',
        name: 'index',
        component: () => import('../components/index/index.vue')
      },
      {
        path: 'product2',
        name: 'product2',
        component: () => import('../components/product2/product2.vue')
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('../components/coupon/coupon.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../components/cart/cart.vue'),
        children:[
          {
            path: '',
            name: 'step1',
            component: () => import('../components/cart/step1.vue')
          },
          {
            path: 'step2',
            name: 'step2',
            component: () => import('../components/cart/step2.vue')
          },
        ]
      },
    ]
  },
  
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/admin/login.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../components/admin/admin.vue'),
    children:[
      {
        path: '',
        name: 'admin_product',
        component: () => import('../components/admin_product/admin_product.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
