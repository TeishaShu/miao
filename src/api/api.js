import Axios from 'axios'

const base = {
  shortUrl: `${process.env.VUE_APP_API_PATH}`,
  longUrl: `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}`
}

// backend
export function SignOut () {
  return Axios({
    url: `${base.shortUrl}/logout`,
    method: 'post'
  })
}
export function SignIn (member) {
  return Axios({
    url: `${base.shortUrl}/admin/signin`,
    method: 'post',
    data: member
  })
}

// backend Admin_book
export function BookGet (currentPage) {
  return Axios({
    url: `${base.longUrl}/admin/orders?page=${currentPage}`,
    method: 'get'
  })
}
export function BookUpdate (id, editData) {
  return Axios({
    url: `${base.longUrl}/admin/order/${id}`,
    method: 'put',
    data: editData
  })
}

// backend Admin_coupon
export function CouponGet (currentPage) {
  return Axios({
    url: `${base.longUrl}/admin/coupons?page=${currentPage}`,
    method: 'get'
  })
}
export function CouponAdd (data) {
  return Axios({
    url: `${base.longUrl}/admin/coupon`,
    method: 'post',
    data: data
  })
}
export function CouponEdit (id, addNew) {
  return Axios({
    url: `${base.longUrl}/admin/coupon/${id}`,
    method: 'put',
    data: addNew
  })
}
export const CouponDel = (id) => `${base.longUrl}/admin/coupon/${id}`

// backend Admin_product
export function AdminGet (currentPage) {
  return Axios({
    url: `${base.longUrl}/admin/products?page=${currentPage}`,
    method: 'get'
  })
}
export function AdminProduct (data) {
  return Axios({
    url: `${base.longUrl}/admin/product`,
    method: 'post',
    data: data
  })
}
export function AdminEdit (id, data) {
  return Axios({
    url: `${base.longUrl}/admin/product/${id}`,
    method: 'put',
    data: data
  })
}
export const AdminDel = (id) => `${base.longUrl}/admin/product/${id}`
export function AdminUpload (data) {
  return Axios({
    url: `${base.longUrl}/admin/upload`,
    method: 'post',
    data: data
  })
}

// frontend cart
export function Cart () {
  return Axios({
    url: `${base.longUrl}/cart`,
    method: 'get'
  })
}
export function AddCartApi (data) {
  return Axios({
    url: `${base.longUrl}/cart`,
    method: 'post',
    data: data
  })
}
export function AddCartBtnApi (data) {
  return Axios({
    url: `${base.longUrl}/cart`,
    method: 'post',
    data: data
  })
}

// frontend cart step1
export const CartDel = (id) => `${base.longUrl}/cart/${id}`
export function CartCoupon (data) {
  return Axios({
    url: `${base.longUrl}/coupon`,
    method: 'post',
    data: data
  })
}
export function CartOrder (data) {
  return Axios({
    url: `${base.longUrl}/order`,
    method: 'post',
    data: data
  })
}

// frontend cart step2
export function Cart2Order (id) {
  return Axios({
    url: `${base.longUrl}/order/${id}`,
    method: 'get'
  })
}
export function Cart2Pay (id) {
  return Axios({
    url: `${base.longUrl}/pay/${id}`,
    method: 'post'
  })
}

// frontend product
export function ProductOne (id) {
  return Axios({
    url: `${base.longUrl}/product/${id}`,
    method: 'get'
  })
}
export function ProductAll () {
  return Axios({
    url: `${base.longUrl}/products/all`,
    method: 'get'
  })
}
