import {SAVE_USERINFO} from './mutation-types'
import {getUserInfo} from '@/network/user'
export default {
  [SAVE_USERINFO](context,userInfo){
    context.commit(SAVE_USERINFO,userInfo)
  },
  async getUser(context) {
    let res = await getUserInfo()
    if(res.data.id){
      context.commit(SAVE_USERINFO,res.data)
    }
  }
}