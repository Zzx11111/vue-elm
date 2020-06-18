import {request} from './request'

export function getCity(type) {
  return request({
    url: '/v1/cities',
    params: {
      type
    }
  })
}

export function cityInfo(id){
  return request({
    url:`/v1/cities/${id}`
  })
}

export function selectAddress(id,keyword){
  return request({
    url:'/v1/pois',
    params:{
      city_id:id,
      keyword
    }
  })
}