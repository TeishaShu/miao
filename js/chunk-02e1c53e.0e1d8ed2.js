(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-02e1c53e"],{"4e79":function(t,a,s){"use strict";var e=s("5315"),r=s.n(e);r.a},5315:function(t,a,s){},9186:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row justify-content-center"},[e("div",{staticClass:"col-md-10"},[t.dataAPI.is_paid?e("div",{staticClass:"link"},[e("img",{attrs:{src:s("988c"),alt:"訂單完成"}}),e("div",{staticClass:"aStyle"},[e("router-link",{attrs:{to:{name:"product"}}},[e("i",{staticClass:"fa fa-angle-double-right pr-2",attrs:{"aria-hidden":"true"}}),t._v("繼續購物 ")])],1)]):t._e(),e("div",{staticClass:"table-responsive step2table"},[e("table",{staticClass:"table"},[t._m(0),e("tbody",[t._l(t.dataAPI.products,(function(a){return e("tr",{key:a.id},[e("td",[e("img",{attrs:{src:a.product.imageUrl,alt:"訂單產品"}}),e("p",[t._v(" "+t._s(a.product.title)+" ")])]),e("td",[t._v(t._s(a.qty))]),e("td",[t._v("NT"+t._s(t._f("currency")(a.product.price)))])])})),e("tr",{staticClass:"total"},[e("td",{attrs:{colspan:"2"}},[t._v(" 總計 ")]),e("td",[t._v("NT"+t._s(t._f("currency")(t.dataAPI.total)))])])],2)])]),e("div",{staticClass:"table-responsive step2table two"},[e("table",{staticClass:"table"},[t._m(1),e("tbody",[e("tr",[e("td",[t._v(" 姓名 ")]),e("td",[t._v(t._s(t.dataAPI.user.name))])]),e("tr",[e("td",[t._v(" 電話 ")]),e("td",[t._v(t._s(t.dataAPI.user.tel))])]),e("tr",[e("td",[t._v("E-mail")]),e("td",[t._v(t._s(t.dataAPI.user.email))])]),e("tr",[e("td",[t._v("地址")]),e("td",[t._v(t._s(t.dataAPI.user.address))])]),e("tr",[e("td",[t._v("備註")]),e("td",[t._v(t._s(t.dataAPI.message))])]),e("tr",[e("td",[t._v("付款狀態")]),e("td",[t.dataAPI.is_paid&&t.dataAPI.create_at?e("span",{staticClass:"green"},[t._v("已付款")]):e("span",{staticClass:"red"},[t._v("尚未付款")])])])])])]),e("div",{staticClass:"link"},[t.dataAPI.is_paid?t._e():e("a",{staticClass:"send",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.pay(a)}}},[t._v("確認付款")])])])])},r=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("thead",[s("tr",[s("th",[t._v("商品資訊")]),s("th",[t._v("數量")]),s("th",[t._v("單價")])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("thead",[s("tr",[s("th",{attrs:{colspan:"2"}},[t._v(" 訂購者資訊 ")])])])}],d=s("4ec3"),i={data:function(){return{orderId:"",dataAPI:{user:{userL:""}},textCoupon:{code:""}}},created:function(){this.orderId=this.$route.params.orderId,this.getApi()},methods:{getApi:function(){var t=this;this.$store.dispatch("updateLoading",!0),Object(d["k"])(this.orderId).then((function(a){t.$store.dispatch("updateLoading",!1),a.data.success&&(t.dataAPI=a.data.order,a.data.order.is_paid?t.$store.commit("CartStepModules/NOWSTEP",3):t.$store.commit("CartStepModules/NOWSTEP",2))}))},pay:function(){var t=this;this.$store.dispatch("updateLoading",!0),Object(d["l"])(this.orderId).then((function(a){t.$store.dispatch("updateLoading",!1),a.data.success&&(t.getApi(),t.$store.commit("CartStepModules/NOWSTEP",3))}))}}},c=i,n=(s("4e79"),s("2877")),o=Object(n["a"])(c,e,r,!1,null,"6c047dbc",null);a["default"]=o.exports},"988c":function(t,a,s){t.exports=s.p+"img/finished_g.2863e8e0.png"}}]);
//# sourceMappingURL=chunk-02e1c53e.0e1d8ed2.js.map