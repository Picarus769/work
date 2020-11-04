import Vue from 'vue'
import App from './App'

import store from 'store'

import $constData from 'config/constData.config.js'
import { myRequest } from 'network/request.js'
import $base from 'network/baseUrl.js'
import $req from 'data/index/index.js'

Vue.config.productionTip = false

Vue.prototype.$constData = $constData
Vue.prototype.$myRequest = myRequest
Vue.prototype.$base = $base
Vue.prototype.$req = $req
Vue.prototype.$check = function check() {
												if(this.$store.state.oftenAddress===null) {
													uni.showModal({
														content: '添加地址以寻找商店',
														showCancel: false,
														success() {
															uni.navigateTo({
																url: '/pages/profile/setAddress',
															})
														}
													})
												}
											},

App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()
