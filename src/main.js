import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

wx.cloud.init({
  env: 'release-7aspz'
})

const app = new Vue(App)
app.$mount()
