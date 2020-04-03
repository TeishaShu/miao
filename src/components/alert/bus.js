import Vue from 'vue';
Vue.prototype.$bus = new Vue(); 

//蓋掉.....如果資料很多通常是用vueX

//prototype掛在原形下
//$bus是變數
//完成後掛到main.js下面
//其他搭配的是alertMessage.vue的created
//因為規則要傳什麼的會忘記.可以筆記在這裡。

//使用筆記
// this.$bus.$emit('message:push', message, status);
// message(String): 訊息內容
// status(String):Alert 的樣式