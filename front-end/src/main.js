import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = 'Demo Brews';
  next();
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
