<template>
  <footer>
    <img
      src="@/assets/images/logo_ft.png"
      alt="logo"
    >
    <p>資料、圖片來源皆來自網路，僅個人練習使用．不做商業用途。</p>
    <p>更多訊息: <a href="https://teishashu.github.io/blogger/">Teisha blogger</a></p>
  </footer>
</template>
<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";
  footer{
    background: $or;
    text-align: center;
    color: #fff;
    padding: 20px;
    margin-top: 60px;
  }
  img{
    max-width: 100px;
    margin: 10px 0;
  }
  p{
    margin-bottom: 10px;
    a{
      color:$red;
      font-weight:bold;
      background-color:rgba(255,255,255,.5);
      padding:0 5px;
      &:hover{
        background:darken($or,10%);
        color: #fff;
      }
    }
  }
  @media (max-width:768px) {
    footer{
      padding: 8px 15px;
    }
    p{
      font-size: 12px;
    }
  }
</style>
