<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 title">
        <h2>
          掌握貓關鍵
        </h2>
        <p>
        搶先得到更多新品、貓食訊息
        </p>
        <input type="email" placeholder="請輸入 E-mail 信箱訂閱電子報" v-model="email" :class="emailStyle ? 'is-valid':'is-invalid'">
        <div v-show="emailMsg" class="invalid-feedback valid-feedback alert mt-3 " :class="emailStyle ?'alert-success':'alert-danger' " role="alert">
            {{ emailMsg }}
        </div>
        <button type="button" @click="sendEmail()">送出資料</button>
      </div>
      <div class="col-md-6 EmailImg">
        <img src="@/assets/images/index/email.png" alt="">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/variables.scss";
@import "title.scss";
  input{
    border: none;
    border-bottom: 3px solid $or;
    text-align: center;
    min-width: 400px;
    font-size: 1.4rem;
    margin-top: 30px;
    color: $or;
    &::placeholder{
      color: $or;
    }
  }
  button{
    display: block;
    margin: 0 auto;
    border: none;
    color: white;
    background-color: #ef9240;
    padding: 6px 25px;
    border-radius: 50px;
    margin-top: 30px;
  }
  .EmailImg{
    position: relative;
    img{
      width: 70%;
      position: absolute;
      bottom: -119px;
    }
  }
  .title{
    margin-top: 20px;
  }
</style>

<script>
export default {
  name:"email-index",
  data(){
    return{
      email:"",
      emailStyle : true,
      emailMsg: ""
    }
  },
  methods:{
    sendEmail(){
      const vm = this;
      const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      // if(pattern.test(vm.email)){
      //   console.log('ok')
      // }else{
      //   console.log('no')
      // }

      const isMail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
      if (!isMail.test(this.email)) {
          this.emailStyle = false;
          this.emailMsg = 'email格式錯誤';
      }
      else {
          this.emailStyle = true;
          this.emailMsg = '成功訂閱電子報!';
      }
    }
  }
}
</script>