import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import Routes from './routes'
import { store } from './store.js'
import 'leaflet/dist/leaflet.css';

Vue.config.productionTip = false
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  vuetify,
  render: h => h(App),
  router: router,
  store: store
}).$mount('#app')
