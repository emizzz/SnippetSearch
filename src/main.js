import Vue from 'vue'

import App from './App.vue'
import Api from './api/Api.js'
import Utilities from './utilities/utilities.js'
import store from './commons/Store'
import VueHighlightJS from 'vue-highlightjs'
import { BootstrapVue } from 'bootstrap-vue'

import 'highlight.js/styles/dark.css';

Vue.config.productionTip = false

Vue.prototype.$api = new Api()
Vue.prototype.$utilities = new Utilities()

Vue.use(BootstrapVue)
Vue.use(VueHighlightJS)

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')

