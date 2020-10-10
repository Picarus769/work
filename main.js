import Vue from 'vue'
import App from './App'

import $constData from 'config/constData.config.js'

Vue.config.productionTip = false

Vue.prototype.$constData = $constData
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
