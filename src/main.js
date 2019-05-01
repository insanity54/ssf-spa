import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // this needs to be imported BEFORE vuetify css
import VueStripeCheckout from 'vue-stripe-checkout'



Vue.config.productionTip = false
Vue.use(VueStripeCheckout, 'pk_test_Wq4GDKNwnRyPqAJmugC3AJYw001VzDVMsp')
Vue.use(Vuetify)
Vue.use(VueResource)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
