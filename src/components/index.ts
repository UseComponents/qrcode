import type { App, Plugin } from 'vue'
import QRCode from './qrcode'

QRCode.install = (app: App) => {
  app.component(QRCode.name, QRCode)
}
export default QRCode as typeof QRCode & {
  install: Plugin
}
