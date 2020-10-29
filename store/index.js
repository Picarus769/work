import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		shop: null,
		cate: [],
		activities: [],
		location: [],
		oftenAddress: null,
		searchValue: '',
		userInfo: {},
		currentProduct: null,
		products: [],
		cartList: [],
		freight: null,
		// cacheNameList: ["userInfo","location","staff",'cart'],
		cacheNameList: ['cart'],
		staff: null
  },
  mutations,
	getters,
  actions,
  modules: {
  }
})
