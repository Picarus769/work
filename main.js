import Vue from 'vue'
import App from './App'

import $constData from 'config/constData.config.js'
import $myRequest from 'network/request.js'

Vue.config.productionTip = false

Vue.prototype.$constData = $constData
Vue.prototype.$myRequest = $myRequest
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
