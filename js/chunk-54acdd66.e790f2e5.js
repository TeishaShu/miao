(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-54acdd66"],{"0e43":function(t,e,s){"use strict";var a=s("d54c"),n=s.n(a);n.a},"1dd1":function(t,e,s){},"2b7e":function(t,e,s){t.exports=s.p+"img/coupon.e7f10d55.png"},"5cd7":function(t,e,s){"use strict";var a=s("7cef"),n=s.n(a);n.a},"7a74":function(t,e,s){"use strict";var a=s("1dd1"),n=s.n(a);n.a},"7cef":function(t,e,s){},bce5:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"cart"},[s("em",{directives:[{name:"show",rawName:"v-show",value:0!==t.num,expression:"num!==0"}]},[t._v(t._s(t.num))]),s("router-link",{attrs:{to:{name:"step1"}}},[s("i",{staticClass:"fas fa-shopping-cart"}),s("p",[t._v("購物車")])])],1)},n=[],o={computed:{num:function(){return this.$store.state.AddCartModules.cartBtnNum}},created:function(){this.api()},methods:{api:function(){this.$store.dispatch("AddCartModules/cartBtnApi")}}},c=o,r=(s("7a74"),s("2877")),i=Object(r["a"])(c,a,n,!1,null,"5802e89f",null);e["a"]=i.exports},d129:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"minHeight"},[a("AlertMessage"),a("img",{staticClass:"animate__animated animate__bounceIn",attrs:{src:s("2b7e"),alt:"優惠形象圖"}}),a("div",{staticClass:"coupon"},[a("div",[a("h2",[t._v("開幕慶優惠 !")]),t._m(0),a("div",{staticClass:"box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.couponCode,expression:"couponCode"}],attrs:{id:"codyId",readonly:""},domProps:{value:t.couponCode},on:{input:function(e){e.target.composing||(t.couponCode=e.target.value)}}})])])]),a("CartBtn")],1)},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("p",[t._v(" 輸入以下代碼，即可獲得"),s("br"),s("b",{staticStyle:{"font-size":"24px",color:"red"}},[t._v(" 全館 8折優惠")])])}],o=(s("99af"),s("bce5")),c=s("dcdb"),r={components:{CartBtn:o["a"],AlertMessage:c["a"]},data:function(){return{couponCode:"DTJ00001"}},methods:{dateFormat:function(t){var e=new Date(t);return"".concat(e.getFullYear(),"年").concat(e.getMonth()+1,"月").concat(e.getDate(),"日")},copyInput:function(){this.$store.dispatch("updateLoading",!0);var t={fontawesome:"fa-check",message:"已經複製優惠碼: ".concat(this.couponCode),status:"success"};this.$store.dispatch("AlertMessageModules/updateMsg",t)}}},i=r,u=(s("0e43"),s("2877")),d=Object(u["a"])(i,a,n,!1,null,"0bebd170",null);e["default"]=d.exports},d54c:function(t,e,s){},dcdb:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"message-alert"},t._l(t.messages,(function(e,a){return s("div",{key:a,staticClass:"alert alert-dismissible fade show",class:"alert-"+e.status,attrs:{role:"alert"}},[s("i",{staticClass:"fa pr-2",class:e.fontawesome,attrs:{"aria-hidden":"true"}}),s("span",[t._v(t._s(e.message))]),s("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"alert","aria-label":"Close"},on:{click:function(e){return t.closeMessage(a)}}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])})),0)},n=[],o={computed:{messages:function(){return this.$store.state.AlertMessageModules.messages}},methods:{closeMessage:function(t){this.$store.commit("AlertMessageModules/CLOSEMESSAHE",t)}}},c=o,r=(s("5cd7"),s("2877")),i=Object(r["a"])(c,a,n,!1,null,null,null);e["a"]=i.exports}}]);
//# sourceMappingURL=chunk-54acdd66.e790f2e5.js.map