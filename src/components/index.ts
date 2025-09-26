import type { App, Plugin } from 'vue'
import QRCode from './qrcode/QRCode.vue'
import QRCodeCanvas from './qrcode/QRCodeCanvas.vue'
import QRCodeSVG from './qrcode/QRCodeSVG.vue'
import type { QRCodeProps, QRProps } from './qrcode/interface'

QRCode.install = (app: App) => {
  app.component('QRCode', QRCode)
  app.component('QRCodeCanvas', QRCodeCanvas)
  app.component('QRCodeSVG', QRCodeSVG)
  return app
}

export { QRCodeCanvas, QRCodeSVG }

export default QRCode as typeof QRCode &
  Plugin & {
    readonly QRCodeCanvas: typeof QRCodeCanvas
    readonly QRCodeSVG: typeof QRCodeSVG
  }
export type { QRCodeProps, QRProps }
