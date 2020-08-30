import Vue from 'vue';

import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

import App from './App.vue';
import router from './router';
import store from './store';

import './assets/css/main.css';

import './validators/validators';

const socket = io('http://localhost:3000', {
  autoConnect: false,
});

Vue.use(VueSocketIOExt, socket, { store });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
