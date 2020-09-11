import axios from 'axios';

// api
const base = {
  shortUrl: `${process.env.VUE_APP_API_PATH}`,
  longUrl: `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}`
} 

// backend
export function signOut() {
  return axios({
    url: `${base.shortUrl}/logout`,
    method: 'post',
  })
}
export function signIn(member) {
  return axios({
    url: `${base.shortUrl}/admin/signin`,
    method: 'post',
    data: member,
  })
}

// backend Admin_book
export function bookGet(currentPage) {
  return axios({
    url: `${base.longUrl}/admin/orders?page=${currentPage}`,
    method: 'get',
  })
}
export function bookUpdate(id, editData) {
  return axios({
    url: `${base.longUrl}/admin/order/${id}`,
    method: 'put',
    data: editData,
  })
}

// backend Admin_coupon
export function couponGet(currentPage) {
  return axios({
    url: `${base.longUrl}/admin/coupons?page=${currentPage}`,
    method: 'get',
  })
}
export function couponAdd(data) {
  return axios({
    url: `${base.longUrl}/admin/coupon`,
    method: 'post',
    data: data,
  })
}
export function couponEdit(id, addNew) {
  return axios({
    url: `${base.longUrl}/admin/coupon/${id}`,
    method: 'put',
    data: addNew,
  })
}
export const couponDel = () => `${base.longUrl}/admin/coupon/${id}`; 

// backend Admin_product
export function adminGet(currentPage) {
  return axios({
    url: `${base.longUrl}/admin/products?page=${currentPage}`,
    method: 'get',
  })
}
export function adminProduct(data) {
  return axios({
    url: `${base.longUrl}/admin/product`,
    method: 'post',
    data: data,
  })
}
export function adminEdit(id, data) {
  return axios({
    url: `${base.longUrl}/admin/product/${id}`,
    method: 'put',
    data: data,
  })
}
export const adminDel = (id) => `${base.longUrl}/admin/product/${id}`;
export function adminUpload(data) {
  return axios({
    url: `${base.longUrl}/admin/upload`,
    method: 'post',
    data: data
  })
}




