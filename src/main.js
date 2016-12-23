// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import store from './store/'

Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  store
}).$mount('#app')
