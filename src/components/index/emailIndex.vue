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
        <input type="email" placeholder="請輸入 E-mail 信箱訂閱電子報" v-model="email">
        <div v-show="emailMsg" class="alert mt-3" :class="emailStyle ?'alert-success':'alert-danger' " role="alert">
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
  @media(max-width:1200px){
    .EmailImg{
      img{
        width: 85%;
        bottom: -119px;
      }
    }
    input{
      min-width: 100%;
    }
  }
  @media(max-width:992px){
    .EmailImg{
      img{
        bottom: -105px;
      }
    }
  }
  @media(max-width:768px){
    .title{
      margin-top:0;
    }
    input{
      font-size: 1rem;
      min-width: 300px;
      margin-top: 23px;
    }
    button{
      padding: 3px 25px;
    }
    .EmailImg{
      position: unset;
      margin-top: -53px;
      img{
        position: unset;
        margin-bottom: -95px;
        width: 47%;
      }
    }
  }
  @media(max-width:576px){
    .EmailImg{
      margin-top: -50px;
      img{
        margin-bottom: -97px;
      }
    }
  }
  @media(max-width:558px){
    .EmailImg{
      img{
        margin-bottom: -83px;
      }
    }
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
      const isMail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
      if (!isMail.test(this.email)) {
          this.emailStyle = false;
          this.emailMsg = 'email格式錯誤';
      }
      else {
          this.emailStyle = true;
          this.emailMsg = '成功訂閱電子報!';
      }
      setTimeout(() => {
        vm.emailMsg = "";
      },5000);
    }
  }
}
</script>