import { defineComponent, ref } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { QRCodeCanvas, QRCodeSVG } from './QRCode'
import { qrcodeProps } from './interface'
import './index.css'

export type QRCodeProps = Partial<ExtractPropTypes<ReturnType<typeof qrcodeProps>>>

const QRCode = defineComponent({
  name: 'QRCode',
  props: { ...qrcodeProps() },
  setup(props, { expose }) {
    const qrCodeCanvas = ref()
    expose({
      toDataURL: (type?: string, quality?: any) => {
        return qrCodeCanvas.value?.toDataURL(type, quality);
      },
    });

    return () => {
      const {
        value,
        icon = '',
        size = 160,
        iconSize = 40,
        color = 'rgba(0, 0, 0, 0.88)',
        bgColor = 'transparent',
        errorLevel = 'M',
        type = 'canvas',
        bordered = true,
        status = 'active',
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
        size: size - (12 + 1) * 2,
        level: errorLevel,
        bgColor,
        fgColor: color,
        imageSettings: icon ? imageSettings : undefined
      }

      return (
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: bgColor,
          }}
          class={['qrcode', {['qrcode-borderless']: !bordered}]}
        >
          {status !== 'active' && (
            <div class={['qrcodeMask']}>
              {status === 'loading' && <div>加载中...</div>}
              {status === 'expired' && <div class={['qrcodeExpired']}>已过期</div>}
            </div>
          )}
          {type === 'svg' ? <QRCodeSVG {...qrCodeProps} /> : <QRCodeCanvas ref={qrCodeCanvas} {...qrCodeProps} />}
        </div>
      )
    }
  }
})

export default QRCode
