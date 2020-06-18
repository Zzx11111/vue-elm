import {SAVE_GEOHASH} from '@/store/mutation-types'
export default {
  [SAVE_GEOHASH](state,payload){
    state.geohash = payload
  }
}