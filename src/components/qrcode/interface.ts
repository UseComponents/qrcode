import type { Ecc, QrCode } from './libs/qrcodegen'

export type Modules = ReturnType<QrCode['getModules']>
export interface Excavation {
  x: number
  y: number
  w: number
  h: number
}
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'
export type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined
export type ERROR_LEVEL_MAPPED_TYPE = {
  [index in ErrorCorrectionLevel]: Ecc
}
export interface ImageSettings {
  src?: string
  height: number
  width: number
  excavate: boolean
  x?: number
  y?: number
  crossOrigin?: CrossOrigin
  opacity?: number
}

export interface QRProps {
  size?: number
  value: string
  level?: ErrorCorrectionLevel
  color?: string
  bgColor?: string
  fgColor?: string
  includeMargin?: boolean
  marginSize?: number
  imageSettings?: ImageSettings
  title?: string
  minVersion?: number
  boostLevel?: boolean
}

export interface QRCodeProps extends QRProps {
  type?: 'canvas' | 'svg'
  errorLevel?: ErrorCorrectionLevel
  icon?: string
  iconSize?: number | { width: number; height: number }
  iconSettings?: Pick<ImageSettings, 'x' | 'y' | 'excavate'>
  status?: 'active' | 'expired' | 'loading' | 'scanned'
  bordered?: boolean
  onChange?: () => void
  onRefresh?: () => void
}

export interface QRCodeEmits {
  (e: 'refresh'): void
  (e: 'change'): void
}

export interface QRCodeSlots {
  statusRender: ({
    status,
    onRefresh
  }: {
    status: QRCodeProps['status']
    onRefresh: QRCodeProps['onRefresh']
  }) => unknown
}
