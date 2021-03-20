import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import GoogleMap from './GoogleMap'

window.EventBus = new Vue({
  data () {
    return {
      sanfrancisco: [37.78268, - 122.41136]
    }
  }
});

Vue.component('GoogleMap', GoogleMap);

Vue.config.productionTip = false

new Vue({

  router,
  store,
  render: h => h(App)
}).$mount('#app')
