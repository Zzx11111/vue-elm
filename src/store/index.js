import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)
const userinfo = JSON.parse(window.localStorage.getItem('save_userInfo'))
const store = new Vuex.Store({
  state:{
    geohash:'31.22299,121.36025',
    userInfo:userinfo
  },
  mutations,
  actions
})

export default store