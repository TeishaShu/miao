<template>
  <div class="row">
    <div class="col-md-12">
      <div class="table-responsive step2table">
        <table class="table">
          <thead>
            <tr>
              <th>商品資訊</th>
              <th>單價</th>
              <th>數量</th>
              <th>總價</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src="/dryFood/dr01.jpg" alt />
                <p>
                  【福壽】貓食-燻雞+茄紅素 20LB（9.07kg） 貓飼料 飼料(A832A02)
                </p>
              </td>
              <td>$NT800</td>
              <td>1</td>
              <td>$NT800</td>
            </tr>
            <tr>
              <td>
                <img src="/dryFood/dr01.jpg" alt />
                <p>
                  【福壽】貓食-燻雞+茄紅素 20LB（9.07kg） 貓飼料 飼料(A832A02)
                </p>
              </td>
              <td>$NT800</td>
              <td>1</td>
              <td>$NT800</td>
            </tr>
            <tr>
              <td colspan="3">小計</td>
              <td>$NT800</td>
            </tr>
            <tr>
              <td colspan="3">運費</td>
              <td>$NT60</td>
            </tr>
            <tr class="total">
              <td colspan="3">總計</td>
              <td>$NT6000</td>
            </tr>
            <tr class="total cheep">
              <td colspan="3">折扣價</td>
              <td>$NT860</td>
            </tr>


          </tbody>
        </table>
      </div>

      <div class="table-responsive step2table two">
        <table class="table">
          <thead>
            <tr>
              <th colspan="2">訂購者資訊</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                姓名
              </td>
              <td>123</td>
            </tr>
            <tr>
              <td>
                電話
              </td>
              <td>11111111111111111</td>
            </tr>
            <tr>
              <td>E-mail</td>
              <td>@hjlhjl</td>
            </tr>
            <tr>
              <td>地址</td>
              <td>rtttttttttttttttttttttttttttttt</td>
            </tr>
            <tr>
              <td>備註</td>
              <td></td>
            </tr>
            <tr>
              <td>付款狀態</td>
              <td class="red">尚未付款</td>
            </tr>

          </tbody>
        </table>
      </div>
        <a href="#" class="send">確認付款</a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/sass/variables.scss";
// @import "step1.scss";
@import "step2.scss";
</style>
<script>
export default {
  data() {
    return {
      isLoading: false,
      dataAPI: {},
      textCoupon: { code: "" }
    };
  },
  methods:{
    sendCoupon(){}
  }
}
</script>