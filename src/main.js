import Vue from 'vue'
import App from './App'
import Request from './utils/request'
import Json from './utils/request-json'
import './styles/base.scss'
import './styles/resetuiVant.scss'

Vue.prototype.$http = Request
Vue.prototype.$json = Json
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
