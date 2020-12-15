import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/permission'

if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

createApp(App).use(store).use(router).mount('#app')
