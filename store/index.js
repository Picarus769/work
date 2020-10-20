import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		isLogin: false,
		location: [],
		userInfo: {},
		cartList: [],
		cacheNameList: ["userInfo","location"]
  },
  mutations,
	getters,
  actions,
  modules: {
  }
})
