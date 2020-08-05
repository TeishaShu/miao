<template>
  <div>
    <banner />

    <!--Food safety-->
    <foodSafty/>

    <!--product-->
    <productIndex :productImg="productImg" :backgroundImage="productBackgroundImage"/>

    <!--Email-->
    <emailIndex/>

    <cartBtn />
  </div>
</template>

<script>
import cartBtn from "@/components/frontend/index/CartBtn.vue";
import banner from "./Banner.vue";
import foodSafty from "./FoodSafty.vue";
import productIndex from "./ProductIndex.vue";
import emailIndex from "./EmailIndex.vue";
import $ from "jquery";
import { gsap, ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
gsap.config({nullTargetWarn:false});  // gsap 警告關掉
export default {
  components: {
    banner,
    cartBtn,
    productIndex,
    emailIndex,
    foodSafty
  },
  data() {
    return {
      productImg: [
        {category:'乾糧', en:'dryFood', img:'https://storage.googleapis.com/vue-course-api.appspot.com/teisha%2F1584963971545.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=kACzG3ZSZ76aAayjaLzWlDNh%2Fy4Eec%2BnGy8HBr3xsvzPXfdUX3Fl7T9TsNpoVzIt4akkLoO6A2LCsZH%2B4XSpKRb%2BwW4UxSeVeUojWZH59JqcDjHytpe5px18PeahMQFn8jDV3FEdtOurXzpGiPRDX9ZbQZzFvrTQ2GARzR30VNmIpCdDTYO4S0xx0LjqzdqAanv0mZDatcBJz%2Bru5ONjqdVzU%2BPDTYfESJd7CFlAKoEmDKl9%2FJC1sV9zBKblZ11XgblddhcTQPfGpEuheypfgq0GKstACTJq7Ad6FtMcVnQ7xcC2q8flwgkP9r%2Fm6Jqlxd9iJmJ828I52Pj4XAacnw%3D%3D'},
        {category:'罐頭', en:'can', img:'https://storage.googleapis.com/vue-course-api.appspot.com/teisha%2F1584969131743.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=K7RXbG71xmcjxdKsc5tBFO3QHPry%2Bx8zJSVePusy2ZkMS5lL1lr8pQf9D7irfBzKsEOJqXgOUPNKfdmSPto3pUGs7ft0krk3%2Bo5uprvkO4q9CNp1D9%2FnsYwuR%2BoMxwA5x9DJmtFak6qnvvlEfL9Vnj0YlwuaCYdjSU7LazajBKL7G4pHV5Pf4Cz4HeRXpgTyV%2BqX5UIt1SeTWlV2LH5PxiHb5qHMygVsZXX9zcgP94KJ69OKk8FM4KmByMQM%2Fqys0ZeVbmmCaO62uv%2BXMSOZFwwFGP8q95wGDjVIh%2BZky1xfom6ItR3K6MH4O%2BKQH6ryCvcBgscucZcXd%2BVZ3%2FPefA%3D%3D'},
        {category:'零食', en:'snack', img:'https://storage.googleapis.com/vue-course-api.appspot.com/teisha%2F1584970157125.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=QBd%2FVVDJ20OIfvU1%2Bcnr4BjhtWtSQwNJZyEOgivT1VUXPYPG3QtpGrhj059nN0kdNE2Cxyx9bq5I%2BuC7MeFN3Nc2iBtCY7uc2dCfpdBSj1Myi1UXCvR7L4GV3I%2FYJxIZ1%2FBucFI05sVv9X9eDZ2SJgjeU9Lt99L2%2FG2oBezV1E3Mws8gItyCBVNS6lfBGxSMqt%2BgwdtCjx%2BTNQOCO37yfUPc4yxJiNhwgw5BEEHDkoCtqfpajxU1Q80X1xGW8Zv%2Bihy1IvyrUGrGnyp0T%2FleR%2FN9%2B5be%2Ffepot8NaKx8VZWOg4FqKQOgWkrzhk0vU%2B3raiA347AOC5GAid9eKEkD4g%3D%3D'},
        {category:'營養品', en:'nutrition', img:'https://storage.googleapis.com/vue-course-api.appspot.com/teisha%2F1584971232407.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=pO0TdjAUcBGPVKDgM%2FK%2B2erCi4vjqd%2BT8xgH5J6QL54b6yDtlmSal1XnmW%2FOqfPWIbvdTlr6a%2FCOfS5Cu8Ych1BHGYScHkq8O4SeG5uW1bYHEL6b7RtZ%2FwlggM6R28dLupd1qMAjedEpsRLSfQn5wMzfMTF9hz34ue4dfYg5kWAZOcA6ujFRykrfZE12iD2GAzwmPjyLaRVvi3VawUqzpKvnC9JfSKYVtqIG%2B2ealqwzVqHT47M71KSQAsB8WW%2FYSLEMGMVO%2Fi8Ph22LrGsSmZhLbRV8IbxQIhNZa0DXvFP1P8KOqq9aswUlOrM4yXjYCWsgWBaNMM2ckrdm%2BFRYzg%3D%3D'},
      ],
      productBackgroundImage: "'@/assets/images/index/productBg.jpg",
    };
  },
  mounted(){
    const t1 = gsap.timeline({
      scrollTrigger:{
        trigger: ".product_animate",
        start: "top 90%",
        toggleActions: "restart none none none",
        marker: true,
      },
    });

    // 特效-首頁產品
    t1.from(".product_animate", {
      x: 400,
      y: 400,
      option: .5,
      duration: 1,
      scale:0.5
    });

    // 特效-首頁email
    t1.from("#email", {
      x: -1000,
      scale:0.5,
      duration: 0.8
    });


    // 特效-餅乾移動
    $.fn.parallax = function(resistance, mouse, num, negative, negative2) {
      const $el = $(this);
      gsap.to($el, num, {
        x: -((mouse.clientX - window.innerWidth / 4) / resistance) * negative,
        y: -((mouse.clientY - window.innerHeight / 2) / resistance) * negative2
      });
    };
    $(document).mousemove(function(e) {
      $(".parallax_level_1").parallax(50, e, 0.8, 1, -1);
      $(".parallax_level_2").parallax(20, e, 0.3, 1, 1);
      $(".parallax_level_3").parallax(80, e, 0.9, -1, 1);
      $(".parallax_level_4").parallax(120, e, 0.9, 1, 1);
    });
  }
};
</script>
