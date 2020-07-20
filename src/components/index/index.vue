<template>
  <div>
    <banner />

<!--Food safety-->
    <div class="row ml-0 mr-0 safty">
      <div class="col-md-5 title">
        <h2>
          <div>食安把關</div>健康營養別擔心
        </h2>
        <p>
        嚴選產品嚴格控管<br>
        多元創意貓口味<br>
        天然原料檢驗超放心<br>
        任君搭配貓開心!<br>
        </p>
      </div>
      <div class="col-md-6">
        123
      </div>
    </div>

    <!--product-->
    <productIndex :productImg="productImg" :backgroundImage="productBackgroundImage"/>

    
    

    <!--Email-->
    <emailIndex/>

    <cartBtn />
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/sass/variables.scss";
@import "title.scss";
@import "index.scss";
</style>
<script>
import banner from "./banner.vue";
import cartBtn from "@/layout/footerStyle/cartBtn.vue";
import productIndex from "./productIndex.vue";
import emailIndex from "./emailIndex.vue";
export default {
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
  components: {
    banner,
    cartBtn,
    productIndex,
    emailIndex,
  },
  // methods: {
  //   addCart(item) {
  //     // this.isLoading = true;
  //     let addCartSend = {
  //       product_id: item.id,
  //       qty: 1,
  //     };
  //     const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/cart`;
  //     this.$http.post(api, { data: addCartSend }).then((response) => {
  //       // this.isLoading = false;
  //     });
  //   },
  // },
};
</script>
