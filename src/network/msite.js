import {request} from './request'

export function getLocation(geohash){
  return request({
    url:`/v2/pois/${geohash}`
  })
}

export function getIndexEntry(){
  return request({
    url:'/v2/index_entry'
  })
}

export function getShop(latitude,longitude,offset){
  return request({
    url:'/shopping/restaurants',
    params:{
      latitude,
      longitude,
      offset
    }
  })
}