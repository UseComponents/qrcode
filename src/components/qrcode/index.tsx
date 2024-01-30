import { defineComponent, ref } from 'vue'
import type { ExtractPropTypes, SlotsType } from 'vue'
import { QRCodeCanvas, QRCodeSVG } from './QRCode'
import { qrcodeProps } from './interface'
import './index.css'

export type QRCodeProps = Partial<ExtractPropTypes<ReturnType<typeof qrcodeProps>>>

const QRCode = defineComponent({
  name: 'QRCode',
  props: { ...qrcodeProps() },
  slots: Object as SlotsType<{
    status?: any
    icon?: any
  }>,
  emits: ['change', 'refresh'],
  setup(props, { expose, slots, emit }) {
    const qrCodeCanvas = ref()
    const handleChange = () => {
      emit('change')
    }
    expose({
      toDataURL: (type?: string, quality?: any) => {
        return qrCodeCanvas.value?.toDataURL(type, quality)
      }
    })

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
        iconSettings = {
          x: undefined,
          y: undefined,
          excavate: true
        }
      } = props
      const imageSettings: QRCodeProps['imageSettings'] = {
        src: icon,
        height: iconSize,
        width: iconSize,
        ...iconSettings
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
            backgroundColor: bgColor
          }}
          class={['qrcode', { ['qrcode-borderless']: !bordered }]}
        >
          {status !== 'active' && (
            <div class={['qrcodeMask']}>
              {status === 'loading' && (slots.status?.() ?? <div>加载中...</div>)}
              {status === 'expired' && (
                <div class={['qrcodeExpired']}>
                  {slots.status?.() ?? (
                    <>
                      <p>二维码已过期</p>
                      <button onClick={() => emit('refresh')}>点击刷新</button>
                    </>
                  )}
                </div>
              )}
              {status === 'scanned' && (
                <div class={['qrcodeScanned']}>{slots.status?.() ?? '已扫描'}</div>
              )}
            </div>
          )}
          {type === 'svg' ? (
            <QRCodeSVG {...qrCodeProps} onChange={handleChange} />
          ) : (
            <QRCodeCanvas ref={qrCodeCanvas} {...qrCodeProps} onChange={handleChange} />
          )}
        </div>
      )
    }
  }
})

export default QRCode
