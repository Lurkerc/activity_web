// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
// import Vuex from 'vuex';
// import VueRouter from 'vue-router'
import App from './App';
import { AjaxPlugin } from 'vux';
// import Home from './components/HelloFromVux'

// Vue.use(VueRouter)
// Vue.use(Vuex);
Vue.use(AjaxPlugin);

// const routes = [{
//   path: '/',
//   component: Home
// }]

// const router = new VueRouter({
//   routes
// })

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app-box')

new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
});