import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/style.css'
import App from './App.vue'

// Handle 404.html redirect on GitHub Pages
if (window.location.pathname.includes('?p=')) {
  const pathname = decodeURIComponent(window.location.pathname.split('?p=')[1])
  window.history.replaceState(null, null, pathname)
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
