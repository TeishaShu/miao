(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a9486dea"],{"540a":function(t,e,a){"use strict";var s=a("59e1"),r=a.n(s);r.a},"59e1":function(t,e,a){},"5cd7":function(t,e,a){"use strict";var s=a("7cef"),r=a.n(s);r.a},"7cef":function(t,e,a){},dcdb:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"message-alert"},t._l(t.messages,(function(e,s){return a("div",{key:s,staticClass:"alert alert-dismissible fade show",class:"alert-"+e.status,attrs:{role:"alert"}},[a("i",{staticClass:"fa pr-2",class:e.fontawesome,attrs:{"aria-hidden":"true"}}),a("span",[t._v(t._s(e.message))]),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"alert","aria-label":"Close"},on:{click:function(e){return t.closeMessage(s)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])})),0)},r=[],i={computed:{messages:function(){return this.$store.state.AlertMessageModules.messages}},methods:{closeMessage:function(t){this.$store.commit("AlertMessageModules/CLOSEMESSAHE",t)}}},o=i,n=(a("5cd7"),a("2877")),d=Object(n["a"])(o,s,r,!1,null,null,null);e["a"]=d.exports},eaab:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"modal fade",attrs:{id:"delModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true","data-backdrop":"static","data-keyboard":"false"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content border-0"},[a("div",{staticClass:"modal-header bg-danger text-white"},[a("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[a("b",[t._v("刪除"+t._s(t.titleType))])]),t._m(0)]),a("div",{staticClass:"modal-body"},[t._v(" 是否刪除"+t._s(t.titleType)+" (刪除後將無法恢復)"),a("br"),a("strong",{staticClass:"text-danger"},[t._v("「"+t._s(t.productName)+"」")])]),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-outline-secondary cancelBtn",attrs:{type:"button","data-dismiss":"modal"}},[t._v(" 取消 ")]),a("button",{staticClass:"btn btn-danger confirm",attrs:{type:"button"},on:{click:function(e){return t.delSend()}}},[t._v(" 確認刪除 ")])])])])])])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{staticClass:"text-white",attrs:{"aria-hidden":"true"}},[t._v("×")])])}],i=(a("96cf"),a("1da1")),o=a("1157"),n=a.n(o),d=a("4ec3"),c={props:{titleType:{type:String,required:!0},api:{type:String,required:!0},productName:{type:String,required:!0},reloadApi:{type:String,required:!0},adminProductPage:{type:Object,default:function(){}}},methods:{delSend:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t,n()("#delModal button").prop("disabled",!0),e.next=4,a.$http.delete(a.api).then((function(e){t.reloadPage()}));case 4:n()("#delModal").modal("hide"),n()("#delModal button").prop("disabled",!1);case 6:case"end":return e.stop()}}),e)})))()},reloadPage:function(){switch(this.reloadApi){case"Cart":this.cartApi();break;case"AdminGet":this.adminProductApi();break;case"CouponGet":this.adminCoupon();break}},cartApi:function(){var t=this;Object(d["j"])().then((function(e){t.$store.dispatch("updateLoading",!1),e.data.success&&(t.$store.commit("CartStepModules/STEP1DATAAPI",e.data.data),t.$store.commit("CartStepModules/NOWSTEP",1))}))},adminProductApi:function(){var t=this;Object(d["e"])(this.adminProductPage.current_page).then((function(e){t.$store.dispatch("updateLoading",!1),t.$store.dispatch("backSmToggle",!1),t.$store.commit("AdminProductModules/ADMIN_PRODUCT_DATA",e.data.products),t.$store.commit("AdminProductModules/ADMIN_PRODUCT_PAGE",e.data.pagination)}))},adminCoupon:function(){var t=this;Object(d["r"])(this.dataPage.current_page).then((function(e){e.data.success&&(t.$store.dispatch("updateLoading",!1),t.$store.dispatch("backSmToggle",!1),t.couponsData=e.data.coupons,t.dataPage=e.data.pagination)}))}}},l=c,u=a("2877"),p=Object(u["a"])(l,s,r,!1,null,null,null);e["a"]=p.exports},f805:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row justify-content-center"},[a("AlertMessage"),t.step1DataAPI.carts&&0===t.step1DataAPI.carts.length?a("div",{staticClass:"col-md-12 nothing"},[a("p",[t._v("您的購物車內還沒有任何商品!")]),a("router-link",{attrs:{to:{name:"product"}}},[a("i",{staticClass:"fa fa-angle-double-right pr-2",attrs:{"aria-hidden":"true"}}),t._v(" 快來逛逛 ")])],1):t._e(),t.step1DataAPI.carts&&0!==t.step1DataAPI.carts.length?a("div",{staticClass:"col-md-10"},[a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table"},[t._m(0),a("tbody",[t._l(t.step1DataAPI.carts,(function(e){return a("tr",{key:e.id},[a("td",[a("img",{staticClass:"smNone",attrs:{src:e.product.imageUrl,alt:"產品圖"}}),a("p",[t._v(t._s(e.product.title))])]),a("td",[t._v("NT"+t._s(t._f("currency")(e.product.price)))]),a("td",{staticStyle:{"text-align":"center"}},[t._v(" x "+t._s(e.qty)+" ")]),a("td",{staticClass:"smNone"},[t._v(" NT"+t._s(t._f("currency")(e.product.price*e.qty))+" ")]),a("td",[a("a",{staticClass:"aBtn",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.delOpen(e)}}},[a("i",{staticClass:"fas fa-trash-alt"})])])])})),a("tr",{staticClass:"total"},[t._m(1),a("td",{staticClass:"smNone"}),a("td",[t._v("NT"+t._s(t._f("currency")(t.step1DataAPI.total)))])]),a("tr",{directives:[{name:"show",rawName:"v-show",value:t.dataCoupon.success,expression:"dataCoupon.success"}],staticClass:"total cheep"},[a("td",[t._v("折扣價")]),a("td",{staticClass:"smNone"}),a("td",{staticStyle:{"text-align":"right","white-space":"nowrap"},attrs:{colspan:"2"}},[t._v(" (省了 NT"+t._s(t._f("currency")(t.step1DataAPI.total-t.dataCoupon.data.final_total))+") ")]),a("td",[t._v(" NT"+t._s(t._f("currency")(t.dataCoupon.data.final_total))+" ")])])],2)])])]):t._e(),t.step1DataAPI.carts&&0!==t.step1DataAPI.carts.length?a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"coupon"},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.textCoupon.code,expression:"textCoupon.code",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"請輸入優惠碼"},domProps:{value:t.textCoupon.code},on:{keyup:function(e){return e.type.indexOf("key")||13===e.keyCode?t.sendCoupon(e):null},input:function(e){e.target.composing||t.$set(t.textCoupon,"code",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),a("a",{attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.sendCoupon(e)}}},[t._v("送出")])])]):t._e(),a("div",{staticClass:"col-md-10 mt-3"},[a("form",{staticClass:"needs-validation formInput",attrs:{novalidate:""}},[t.step1DataAPI.carts&&0!==t.step1DataAPI.carts.length?a("div",{staticClass:"form-row"},[a("div",{staticClass:"col-md-12 mb-3"},[a("h5",[t._v("收件人資訊")]),a("label",{attrs:{for:"name"}},[t._v("*收件人姓名")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.name,expression:"user.name"}],staticClass:"form-control",attrs:{id:"name",type:"text",required:""},domProps:{value:t.user.name},on:{input:function(e){e.target.composing||t.$set(t.user,"name",e.target.value)}}}),a("div",{staticClass:"valid-feedback"},[t._v(" 正確! ")]),a("div",{staticClass:"invalid-feedback"},[t._v(" 請輸入收件人姓名 ")])]),a("div",{staticClass:"col-md-12 mb-3"},[a("label",{attrs:{for:"phone"}},[t._v("*收件人電話")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.tel,expression:"user.tel"}],staticClass:"form-control",attrs:{id:"phone",type:"number",required:""},domProps:{value:t.user.tel},on:{input:function(e){e.target.composing||t.$set(t.user,"tel",e.target.value)}}}),a("div",{staticClass:"valid-feedback"},[t._v(" 正確! ")]),a("div",{staticClass:"invalid-feedback"},[t._v(" 請輸入收件人電話 ")])]),a("div",{staticClass:"col-md-12 mb-3"},[a("label",{attrs:{for:"email"}},[t._v("*E-mail")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.email,expression:"user.email"}],staticClass:"form-control",attrs:{id:"email",type:"email",required:""},domProps:{value:t.user.email},on:{input:function(e){e.target.composing||t.$set(t.user,"email",e.target.value)}}}),a("div",{staticClass:"valid-feedback"},[t._v(" 正確! ")]),a("div",{staticClass:"invalid-feedback"},[t._v(" 請輸入收件人E-mail ")])]),a("div",{staticClass:"col-md-12 mb-3"},[a("label",{attrs:{for:"address"}},[t._v("*收件人地址")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.address,expression:"user.address"}],staticClass:"form-control",attrs:{id:"address",type:"text",required:""},domProps:{value:t.user.address},on:{input:function(e){e.target.composing||t.$set(t.user,"address",e.target.value)}}}),a("div",{staticClass:"valid-feedback"},[t._v(" 正確! ")]),a("div",{staticClass:"invalid-feedback"},[t._v(" 地址欄位不得留空 ")])]),a("div",{staticClass:"col-md-12 mb-3"},[a("label",[t._v("留言備註")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.message,expression:"message"}],attrs:{rows:"4"},domProps:{value:t.message},on:{input:function(e){e.target.composing||(t.message=e.target.value)}}}),t._v(" "),a("button",{staticClass:"send",attrs:{type:"submit"}},[t._v(" 送出訂單 ")])])]):t._e()])]),a("DelModal",{attrs:{"title-type":"產品",api:t.delApi,"product-name":t.deleteProductName,"reload-api":"Cart"}})],1)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[a("b",[t._v("購物清單")])]),a("th",[t._v("單價")]),a("th",[t._v("數量")]),a("th",{staticClass:"smNone"},[t._v(" 小計 ")]),a("th",[t._v("刪除")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("td",{attrs:{colspan:"3"}},[a("b",[t._v("總計")])])}],i=(a("4de4"),a("96cf"),a("1da1")),o=a("dcdb"),n=a("eaab"),d=a("1157"),c=a.n(d),l=a("4ec3"),u={components:{DelModal:n["a"],AlertMessage:o["a"]},data:function(){return{textCoupon:{code:""},dataCoupon:{success:!1,data:{final_total:0}},userStyle:{name:!1,email:!1,tel:!1,address:!1},user:{name:"",email:"",tel:"",address:""},message:"",delItem:"",delApi:"",deleteProductName:""}},computed:{step1DataAPI:function(){return this.$store.state.CartStepModules.step1DataAPI}},created:function(){this.api()},mounted:function(){this.validateBootstrap2()},methods:{api:function(){var t=this;this.$store.dispatch("updateLoading",!0),Object(l["j"])().then((function(e){t.$store.dispatch("updateLoading",!1),e.data.success&&(t.$store.commit("CartStepModules/STEP1DATAAPI",e.data.data),t.$store.commit("CartStepModules/NOWSTEP",1))}))},delOpen:function(t){this.delApi=Object(l["n"])(t.id),this.deleteProductName=t.product.title,c()("#delModal").modal("show")},sendCoupon:function(){var t=this;this.$store.dispatch("updateLoading",!0),Object(l["m"])({data:this.textCoupon}).then((function(e){if(t.$store.dispatch("updateLoading",!1),e.data.success){t.dataCoupon=e.data;var a={fontawesome:"fa-check",message:e.data.message,status:"success"};t.$store.dispatch("AlertMessageModules/updateMsg",a)}else{var s={fontawesome:"fa-times",message:e.data.message,status:"danger"};t.$store.dispatch("AlertMessageModules/updateMsg",s)}}))},sentStep1:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t,e.next=3,Object(l["o"])({data:{user:a.user,message:a.message}}).then((function(e){e.data.success&&(a.$router.push("/cart/".concat(e.data.orderId)),t.$store.commit("CartStepModules/NOWSTEP",2))}));case 3:case"end":return e.stop()}}),e)})))()},validateBootstrap2:function(){var t=this,e=document.getElementsByClassName("needs-validation");Array.prototype.filter.call(e,(function(e){e.addEventListener("submit",(function(a){!1===e.checkValidity()?(a.preventDefault(),a.stopPropagation()):(a.preventDefault(),c()(".aBtn").addClass("disabled"),c()("button").prop("disabled",!0),t.sentStep1()),e.classList.add("was-validated")}),!1)}))}}},p=u,m=(a("540a"),a("2877")),v=Object(m["a"])(p,s,r,!1,null,"4c760ed8",null);e["default"]=v.exports}}]);
//# sourceMappingURL=chunk-a9486dea.30b41b2a.js.map