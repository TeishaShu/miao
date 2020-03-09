<template>
    <div class="row">
      
      <!--沒東西-->
      <!--<div class="col-md-12 nothing">
        <p>您的購物車內還沒有任何商品!</p>
        <a href="#">快來逛逛</a>
      </div>-->
      <!--有東西-->
      <div class="col-md-12">
        <h5>購物清單</h5>
        <div class="table-responsive">
          <table class="table">
            <tbody>
              <tr>
                <td>
                  <img src="/dryFood/dr01.jpg" alt />
                </td>
                <td>
                  【福壽】貓食-燻雞+茄紅素 20LB（9.07kg） 貓飼料 飼料(A832A02)
                </td>
                <td>$NT800 x <input type="text" value="1" /></td>
                <td><i class="fas fa-trash-alt"></i></td>
              </tr>
              <tr>
                <td>
                  <img src="/dryFood/dr01.jpg" alt />
                </td>
                <td>
                  【福壽】貓食-燻雞+茄紅素 20LB（9.07kg） 貓飼料 飼料(A832A02)
                </td>
                <td>$NT800 x <input type="text" value="1" /></td>
                <td><i class="fas fa-trash-alt"></i></td>
              </tr>
              <tr>
                <td colspan="3">
                  目前總金額
                </td>
                
                <td class="red">$NT800</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-12 info">
        <h5>收件人資訊</h5>
        <input type="text" placeholder="*姓名" />
        <input type="text" placeholder="*電話" />
        <input type="text" placeholder="*E-mail" />
        <input type="text" placeholder="*地址" />
        <textarea rows="4" placeholder="備註"></textarea>
        <a href="#" class="send">送出訂單</a>
      </div>

    </div>
</template>
<style lang="scss" scoped>
@import "../../assets/sass/variables.scss";
@import "step1.scss";
</style>
<script>
export default {};
</script>
