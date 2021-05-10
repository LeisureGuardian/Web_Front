import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vuetify from './plugins/vuetify';
import VuetifyDialog from 'vuetify-dialog'
import * as VueGoogleMaps from 'vue2-google-maps'


Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBRQUHCl1nNaeUgn-ZiXF4eLBfUH9D9oMs',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  }
})

Vue.config.productionTip = false

Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)

}).$mount('#app')
