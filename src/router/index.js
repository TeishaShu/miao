import Vue from 'vue'
import VueRouter from 'vue-router'
// 官方的元件

Vue.use(VueRouter)

const routes = [
  {
    path: '/', // 對應的虛擬路徑.有children.且第一個path是空的.因次外層會到這裡.外層的name就要刪除(重複了)
    component: () => import('../views/Home.vue'), // 對應到的文件
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('../components/frontend/index/Index.vue')
      },
      {
        path: 'product',
        name: 'product',
        redirect: 'product/all'
      },
      {
        path: 'product/:id',
        name: 'product0',
        component: () => import('../components/frontend/product/Product.vue')
      },
      {
        path: 'product2/:id', // 動態路由
        name: 'product2',
        component: () => import('../components/frontend/product/Product2.vue')
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('../components/frontend/coupon/Coupon.vue')
      },
      {
        path: 'cart',
        component: () => import('../components/frontend/cart/Cart.vue'),
        children: [
          {
            path: '',
            name: 'step1',
            component: () => import('../components/frontend/cart/Step1.vue')
          },
          {
            path: ':orderId',
            name: 'step2',
            component: () => import('../components/frontend/cart/Step2.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/backend/admin/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('../components/backend/admin/Admin.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'admin_product',
        component: () => import('../components/backend/admin_product/Admin_product.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'admin_book',
        name: 'admin_book',
        component: () => import('../components/backend/admin_product/Admin_book.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'admin_coupon',
        name: 'admin_coupon',
        component: () => import('../components/backend/admin_product/Admin_coupon.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '*',
    redirect: '/' // 指向
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
