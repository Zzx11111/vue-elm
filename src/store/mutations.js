import {SAVE_GEOHASH,SAVE_USERINFO} from '@/store/mutation-types'
export default {
  [SAVE_GEOHASH](state,payload){
    state.geohash = payload
  },
  [SAVE_USERINFO](state,payload){
    state.userInfo = payload
  }
}