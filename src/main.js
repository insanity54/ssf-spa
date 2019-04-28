import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'; // this needs to be imported BEFORE vuetify css

Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  render: h => h(App),
}).$mount('#app')
