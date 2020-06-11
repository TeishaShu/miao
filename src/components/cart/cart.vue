<template>
  <div class="container minHeight">
    <div class="row">
      <!--步驟-->
      <div class="col-md-12">
        <div class="step">
          <div class="line" :class="{'active-round active-step' : nowStep===1}" >  <!--拿到step------- 是用route拿值。(不是component方式.因為切換畫面方式')-->
            <span>1</span>
            <p>
              訂單資料
            </p>
          </div>
          <div class="line" :class="{'active-round active-step' : nowStep===2 }" > 
            <span>2</span>
            <p>
              確認訂單並付款
            </p>
          </div>
          <div :class="{'active-step' : nowStep===3}">
            <span>3</span>
            <p>
              完成訂單
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--內容-->
    <router-view :step="nowStep" @nextStep="nextStep"></router-view>
  </div>
</template>
<style lang="scss">
@import "../../assets/sass/variables.scss";
@import "cart.scss";
</style>
<script>
export default {
  data(){
    return{
      nowStep:1
    }
  },
  methods: {
    nextStep(val) {
      this.nowStep = val;
    }
  }
}
</script>
