import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import VueLazyLoad from 'vue-lazyload'

import fastclick from 'fastclick'
import router from './router'

import 'common/stylus/index.styl'

Vue.use(VueLazyLoad, {
  loading: require('components/m-header/logo@2x.png')
})

fastclick.attach(document.body)

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
