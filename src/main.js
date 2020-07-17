import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap'; // 4.4
import Loading from 'vue-loading-overlay';
import animated from 'animate.css';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App.vue';
import router from './router';
import store from './store';
import currencyFilter from './components/filters/currency';
import '@/components/alert/bus'; //bus..蓋掉.比較不常這樣用

Vue.config.productionTip = false
Vue.use(VueAxios, axios, animated);
Vue.filter('currency', currencyFilter); //全域包成不同的資料來放

//跨域.成功的話會有一大段存在cookie
axios.defaults.withCredentials = true;

//引用loading.全域的啟用方式
Vue.component('Loading',Loading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//導航守衛.切換頁面時觸發..to到達頁面.from從哪個頁面開始
router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    //這裡需要驗證
    const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/user/check`;
      //因為在router裡面所以下面this不是在vue下.換成上面的axios就好。
      // this.$http.post(api).then(response => {
        axios.post(api).then(response => {
        if(response.data.success){
          next()
        }else{
          alert('請先登入')
          //如果不是登錄的狀態回登錄的頁面..next裡面包個物件
          next({
            path:'/login'
          })
        }
      });
  }else{
    next()
  }
  
})