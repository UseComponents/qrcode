import { createApp } from 'vue'
import App from './App.vue'
import QRCode from './components'

createApp(App).use(QRCode as any).mount('#app')
