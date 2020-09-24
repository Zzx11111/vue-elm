import {SAVE_GEOHASH,SAVE_USERINFO,SAVE_REMARK,SAVE_ADDRESS,CHOOSE_ADDRESS,SIGN_OUT} from '@/store/mutation-types'
export default {
  [SAVE_GEOHASH](state,payload){
    state.geohash = payload
  },
  [SAVE_USERINFO](state,payload){
    state.userInfo = payload
  },
  [SAVE_REMARK](state,payload){
    state.remark = payload
  },
  [SAVE_ADDRESS](state,payload){
    state.address = payload
  },
  [CHOOSE_ADDRESS](state,payload){
    state.chooseAddress = payload
  },
  [SIGN_OUT](state,payload){
    state.userInfo = payload
  }
}