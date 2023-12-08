import { defineComponent, ref } from 'vue'
import type { App, Plugin } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { QRCodeCanvas, QRCodeSVG } from './QRCode'
import { qrcodeProps } from './interface'

export type QRCodeProps = Partial<ExtractPropTypes<ReturnType<typeof qrcodeProps>>>

const QRCode = defineComponent({
  name: 'QRCode',
  props: { ...qrcodeProps() },
  setup(props, { expose }) {
    const canvasRef = ref()
    expose({
      toDataURL() {
        return canvasRef.value?.toDataURL()
      }
    })
    return () => {
      const {
        value,
        icon = '',
        size = 160,
        iconSize = 40,
        color = '#000000',
        bgColor = 'transparent',
        errorLevel = 'M',
        type = 'canvas'
      } = props
      const imageSettings: QRCodeProps['imageSettings'] = {
        src: icon,
        x: undefined,
        y: undefined,
        height: iconSize,
        width: iconSize,
        excavate: true
      }
      const qrCodeProps = {
        value,
        size,
        level: errorLevel,
        bgColor,
        fgColor: color,
        imageSettings: icon ? imageSettings : undefined
      }
      return type === 'svg' ? <QRCodeSVG {...qrCodeProps} /> : <QRCodeCanvas ref={canvasRef.value} {...qrCodeProps} />
    }
  }
})

QRCode.install = (app: App) => {
  app.component(QRCode.name, QRCode)
}

export default QRCode as typeof QRCode & {
  install: Plugin
}
