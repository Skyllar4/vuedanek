import Vue from 'vue'
import store from './store'
import router from './router'
import App from './components/App.vue'
import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production';

// Для dev-режима
if (debug) {
    axios.defaults.baseURL = 'http://w-shop.lc';
}

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})
