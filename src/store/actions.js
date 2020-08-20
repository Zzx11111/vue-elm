import {SAVE_USERINFO} from './mutation-types'
export default {
  [SAVE_USERINFO](context,userInfo){
    context.commit(SAVE_USERINFO,userInfo)
  }
}