import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		shop: null,
		location: [],
		oftenAddress: null,
		userInfo: {},
		currentProduct: null,
		products: [],
		cartList: [],
		cacheNameList: ["userInfo","location","staff"],
		staff: null
  },
  mutations,
	getters,
  actions,
  modules: {
  }
})
