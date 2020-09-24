import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)
console.log('a')
const store = new Vuex.Store({
  state:{
    geohash:'31.22299,121.36025',
    userInfo:null,
    remark:'',
    address:null,
    chooseAddress:null
  },
  actions,
  mutations
  
})

export default store