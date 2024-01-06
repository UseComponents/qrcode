import type { App, Plugin } from 'vue'
import QRCode from './qrcode'
import { QRCodeCanvas, QRCodeSVG } from './qrcode/QRCode'
import type { QRCodeProps } from './qrcode'

QRCode.install = (app: App) => {
  app.component(QRCode.name, QRCode)
  app.component(QRCodeCanvas.name, QRCodeCanvas)
  app.component(QRCodeSVG.name, QRCodeSVG)
  return app
}

export { QRCodeCanvas, QRCodeSVG }

export default QRCode as typeof QRCode &
  Plugin & {
    readonly QRCodeCanvas: typeof QRCodeCanvas
    readonly QRCodeSVG: typeof QRCodeSVG
  }
export type { QRCodeProps }
