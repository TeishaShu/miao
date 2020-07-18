import Vue from 'vue';
import VueRouter from 'vue-router';
//官方的元件

Vue.use(VueRouter)

const routes = [

  {
    path: '*',
    redirect:'/', //指向
  },
  {
    path: '/',  //對應的虛擬路徑.有children.且第一個path是空的.因次外層會到這裡.外層的name就要刪除(重複了)
    component: () => import('../views/home.vue'),  //對應到的文件
    children:[
      {
        path: '',
        name: 'index',
        component: () => import('../components/index/index.vue')
      },
      // {
      //   path: 'product',
      //   name: 'product',
        // component: () => import('../components/product/product.vue')
        // redirect: 'product/all',
      // },
      {
        path: 'product/:id?',
        name: 'product',
        component: () => import('../components/product/product.vue')
      },
      {
        path: 'product2/:id', //動態路由
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
        component: () => import('../components/cart/cart.vue'),
        children:[
          {
            path: '',
            name: 'step1',
            component: () => import('../components/cart/step1.vue')
          },
          {
            path: ':orderId',
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
    component: () => import('../components/admin/admin.vue'),
    meta: { requiresAuth: true },
    children:[
      {
        path: '',
        name: 'admin_product',
        component: () => import('../components/admin_product/admin_product.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'admin_book',
        name: 'admin_book',
        component: () => import('../components/admin_product/admin_book.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'admin_coupon',
        name: 'admin_coupon',
        component: () => import('../components/admin_product/admin_coupon.vue'),
        meta: { requiresAuth: true }
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
