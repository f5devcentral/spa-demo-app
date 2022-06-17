import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


router.beforeEach((to, from, next) => {
  document.title = 'Demo Brews';
  next();
});

const app = createApp(App)
app.config.productionTip = false
app.use(router)
app.mount('#app')
