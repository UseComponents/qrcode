import type { PropType } from 'vue'

export function objectType<T = {}>(defaultVal?: T) {
  return { type: Object as PropType<T>, default: defaultVal as T }
}
export function stringType<T extends string = string>(defaultVal?: T) {
  return { type: String as unknown as PropType<T>, default: defaultVal as T }
}

export interface ImageSettings {
  src: string
  height: number
  width: number
  excavate: boolean
  x?: number
  y?: number
}

export const qrProps = () => {
  return {
    size: { type: Number, default: 160 },
    value: { type: String, required: true },
    type: {
      type: String as PropType<'canvas' | 'svg'>,
      default: 'canvas'
    },
    color: String,
    bgColor: String,
    includeMargin: Boolean,
    imageSettings: objectType<ImageSettings>()
  }
}

export const qrcodeProps = () => {
  return {
    ...qrProps(),
    errorLevel: {
      type: String as PropType<'L' | 'M' | 'Q' | 'H'>,
      default: 'M'
    },

    icon: String,
    iconSize: { type: Number, default: 40 },

    status: stringType<'active' | 'expired' | 'loading'>('active'),
    bordered: { type: Boolean, default: true }
  }
}

export interface QRCodeCanvasColor {
  dark?: string // 默认#000000ff
  light?: string // 默认#ffffffff
}

export interface QRCodeCanvasOptions {
  version?: number
  errorCorrectionLevel?: string // 默认"M"
  maskPattern?: number // 遮罩符号的掩码图案
  toSJISFunc?: Function // 将汉字转换为其 Shift JIS 值的帮助程序函数
  margin?: number
  scale?: number
  small?: boolean
  width: number
  color?: QRCodeCanvasColor
}
