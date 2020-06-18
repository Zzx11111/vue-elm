import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    geohash:'31.22299,121.36025'
  },
  mutations
})

export default store