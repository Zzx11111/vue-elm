import {request} from "./request"
//加入购物车
export function checkout(restaurant_id,geohash,entities){
  return request({
    url:'/v1/carts/checkout',
    method:"post",
    data:{
      restaurant_id,
      geohash,
      entities
    }
  })
}

//获取备注
export function getRemarks(cart_id){
  return request({
    url:`/v1/carts/${cart_id}/remarks`
  })
}

//搜索地址
export function searchAddress(keyword){
  return request({
    url:'/v1/pois',
    params:{
      keyword
    }
  })
}

//添加收货地址
export function addAddress(user_id,address,address_detail,geohash,name,phone,tag,sex,phone_bk){
  return request({
    url:`/v1/users/${user_id}/addresses`,
    method:"post",
    data:{
      user_id,
      address,
      address_detail,
      geohash,
      name,
      phone,
      tag,
      sex,
      phone_bk,
      tag_type:2
    }
  })
}

//获取收货地址列表
export function getAddress(user_id){
  return request({
    url:`/v1/users/${user_id}/addresses`
  })
}

//确认下单
export function confirmOrder(user_id,cart_id,address_id,restaurant_id,geohash,description,entities){
  return request({
    url:`/v1/users/${user_id}/carts/${cart_id}/orders`,
    method:'post',
    data:{
      user_id,
      cart_id,
      address_id,
      restaurant_id,
      geohash,
      description,
      entities
    }
  })
}


//获取订单列表
export function getOrderList(user_id){
  return request({
    url:`/bos/v2/users/${user_id}/orders`,
    params:{
      user_id,
      limit:20
    }
  })
}