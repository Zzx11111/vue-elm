import {request} from './request'

export function searchRestaurants(geohash,keyword){
  return request({
    url:"/v4/restaurants",
    params:{
      geohash,
      keyword
    }
  })
}
//获取所有商铺分类列表
export function restaurantAllCategory(){
  return request({
    url:'/shopping/v2/restaurant/category'
  })
}

//获取商铺列表
export function getRestaurants(latitude,longitude,offset,restaurant_category_id,order_by,restaurant_category_ids){
  return request({
    url:'/shopping/restaurants',
    params:{
      latitude,
      longitude,
      offset,
      restaurant_category_id,
      order_by,
      'restaurant_category_ids[]':restaurant_category_ids
    }
  })
}

//商铺详细信息
export function getRestaurantsInfo(id){
  return request({
    url:`/shopping/restaurant/${id}`,
  })
}

//商品列表信息
export function getFoodMenu(id){
  return request({
    url:`/shopping/v2/menu`,
    params:{
      restaurant_id:id
    }
  })
}

//获取商品评价
export function getRatings(id){
  return request({
    url:`/ugc/v2/restaurants/${id}/ratings`
  })
}

//获取店铺分数
export function getRatingsScores(id){
  return request({
    url:`/ugc/v2/restaurants/${id}/ratings/scores`
  })
}

//评价分类

export function getRatingTag(id){
  return request({
    url:`/ugc/v2/restaurants/${id}/ratings/tags`
  })
}