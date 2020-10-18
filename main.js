import Vue from 'vue'
import App from './App'

import store from 'store'

import $constData from 'config/constData.config.js'
import { myRequest } from 'network/request.js'
import $base from 'network/baseUrl.js'

Vue.config.productionTip = false

Vue.prototype.$constData = $constData
Vue.prototype.$myRequest = myRequest
Vue.prototype.$base = $base


App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()
