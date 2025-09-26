<script setup lang="ts">
  import type { CSSProperties } from 'vue'
  import type { QRCodeProps, QRCodeEmits, QRCodeSlots, ImageSettings } from './interface'
  import { ref, computed, useAttrs } from 'vue'
  import QRCodeCanvas from './QRCodeCanvas.vue'
  import QRCodeSVG from './QRCodeSVG.vue'

  defineOptions({ name: 'QRCode' })
  const {
    type = 'canvas',
    size = 160,
    color = 'rgba(0, 0, 0, 0.88)',
    errorLevel = 'M',
    status = 'active',
    bordered = true,
    bgColor = 'transparent',
    icon,
    iconSize,
    value,
    title,
    iconSettings,
  } = defineProps<QRCodeProps>()
  defineEmits<QRCodeEmits>()
  defineSlots<QRCodeSlots>()

  const canvasRef = ref<HTMLCanvasElement | null>(null)
  const svgRef = ref<InstanceType<typeof QRCodeSVG> | null>(null)
  defineExpose({
    toDataURL: () => {
      if (type === 'canvas') {
        return canvasRef.value?.toDataURL()
      }
      else {
        const svgData = new XMLSerializer().serializeToString(svgRef.value?.$el)
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        return url
      }
    },
  })

  const attrs = useAttrs()

  const qrCodeProps = computed(() => {
    const attributeStyle = attrs.style as CSSProperties

    const imageSettings: ImageSettings = {
      src: icon,
      x: undefined,
      y: undefined,
      height: typeof iconSize === 'number' ? iconSize : (iconSize?.height ?? 40),
      width: typeof iconSize === 'number' ? iconSize : (iconSize?.width ?? 40),
      excavate: true,
      crossOrigin: 'anonymous',
      ...iconSettings
    }

    return {
      value,
      size,
      level: errorLevel,
      bgColor,
      fgColor: color,
      style: { width: attributeStyle?.width, height: attributeStyle?.height },
      imageSettings: icon ? imageSettings : undefined,
      title
    }
  })

  const mergedStyle = computed<CSSProperties>(() => {
    return {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: bgColor,
    }
  })
</script>

<template>
  <div class="qrcode" :class="{ 'qrcode-borderless': !bordered }" :style="mergedStyle">
    <template v-if="status !== 'active'">
      <div class="qrcodeMask">
        <slot name="statusRender" v-bind="{ status, onRefresh }">
          <template v-if="status === 'expired'">
            <p class="qrcodeExpired">
              已过期
            </p>
          </template>
          <template v-else-if="status === 'loading'">
            <p>加载中...</p>
          </template>
          <template v-else-if="status === 'scanned'">
            <p class="qrcodeScanned`">
              已扫描
            </p>
          </template>
        </slot>
      </div>
    </template>
    <template v-if="type === 'canvas'">
      <QRCodeCanvas ref="canvasRef" v-bind="qrCodeProps" />
    </template>
    <template v-else-if="type === 'svg'">
      <QRCodeSVG ref="svgRef" v-bind="qrCodeProps" />
    </template>
  </div>
</template>

<style>
  .qrcode {
    box-sizing: border-box;
    margin: 0;
    padding: 12px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
    font-family:
      -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid rgba(5, 5, 5, 0.06);
    position: relative;
    overflow: hidden;
  }
  .qrcode > canvas {
    align-self: stretch;
    flex: auto;
    min-width: 0;
  }

  .qrcode > .qrcodeIcon {
    margin-block-end: 8px;
    font-size: 14px;
  }

  .qrcode > .qrcodeMask {
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: rgba(0, 0, 0, 0.88);
    line-height: 1.5714285714285714px;
    background: rgba(255, 255, 255, 0.96);
    text-align: center;
  }

  .qrcode > .qrcodeMask > .qrcodeExpired,
  .qrcode > .qrcodeMask > .qrcodeScanned {
    color: rgba(0, 0, 0, 0.88);
  }

  .qrcode-borderless {
    border-color: transparent;
    padding: 0;
    border-radius: 0;
  }

</style>
