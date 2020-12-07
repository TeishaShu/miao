<template>
  <div class="container minHeight">
    <div class="row">
      <!--步驟-->
      <div class="col-md-12">
        <div class="step">
          <div
            class="line"
            :class="{'activeRound activeStep' : nowStep===1}"
          >
            <!--拿到step------- 是用route拿值。(不是component方式.因為切換畫面方式')-->
            <span>1</span>
            <p>
              訂單資料
            </p>
          </div>
          <div
            class="line"
            :class="{'activeRound activeStep' : nowStep===2 }"
          >
            <span>2</span>
            <p>
              確認訂單並付款
            </p>
          </div>
          <div :class="{'activeStep' : nowStep===3}">
            <span>3</span>
            <p>
              完成訂單
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--內容-->
    <router-view :step="nowStep" />
  </div>
</template>

<script>
export default {
  computed: {
    nowStep () {
      return this.$store.state.cartStepModules.nowStep
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/scss/variables.scss";
  .minHeight{
    margin-top: 20px;
    min-height: calc(100vh - 320px);
  }
  .pd0{
    padding-left: 0;
    padding-right: 0;
  }
  .step{
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
    div{
      display: inline-block;
      margin: 0 20px;
    }
    span{
      border: 2px solid $light_gray;
      border-radius: 100%;
      color: #a7a7a7;
      padding: 7px 13px;
      font-weight: bold;
      background: #fff;
    }
    p{
      margin-top: 13px;
      font-size: 14px;
      color: #a7a7a7;
    }
  }
  .activeStep{
    span{
      border: 2px solid #ffd2aa;
      color: #fff;
      background: $red;
    }
    p{
      color: $red;
      font-weight: bold;
    }
  }
  .line{
    position: relative;
    &::after{
      content: '';
      border-bottom: 2px solid $light_gray;
      width: 100px;
      position: absolute;
      top: 12px;
      z-index: -2;
    }
  }
  .activeRound {
    &::after{
      border-bottom: 2px solid $red;
    }
    &::before{
      content: '';
      width: 10px;
      height: 10px;
      position: absolute;
      background: $red;
      border-radius:100%;
      z-index: -1;
      top: 8px;
      animation-name: stepAnimate;
      animation-duration: 3s;
      animation-iteration-count: infinite;
    }
  }

  @keyframes stepAnimate{
    from{
      left: 35px;
    }
    to{
      left: 126px;
    }
  }
</style>
