import { createApp } from 'vue'
import App from './App.vue'
import QRCode from './components/qrcode'

createApp(App).use(QRCode).mount('#app')
