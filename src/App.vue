<script setup lang="ts">
import { ref } from 'vue'
import QRCode, { QRCodeCanvas, QRCodeSVG } from './components'
import type { QRCodeProps } from './components'

const size = ref(160)
const level = ref<QRCodeProps['errorLevel']>('L')
const qrcodeCanvasRef = ref()
const decline = () => {
  size.value = size.value - 10
  if (size.value < 48) {
    size.value = 48
  }
}
const increase = () => {
  size.value = size.value + 10
  if (size.value > 300) {
    size.value = 300
  }
}
const selectChange = (e: any) => {
  level.value = e.target.value
}
const downloadChange = async () => {
  try {
    const url = await qrcodeCanvasRef.value.toDataURL()
    console.log(url, qrcodeCanvasRef.value.toDataURL)
    const a = document.createElement('a')
    a.download = 'QRCode.png'
    a.href = url
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  } catch (error) {
    console.log(error)
  }
}
const qrcodeProps = {
  value: 'https://vuejs.org',
  size: 134,
  level: 'M',
  bgColor: 'transparent',
  fgColor: 'rgba(0, 0, 0, 0.88)',
  imageSettings: {
    src: 'https://vuejs.org/images/logo.png',
    x: undefined,
    y: undefined,
    height: 40,
    width: 40,
    excavate: true
  }
}
</script>

<template>
  <QRCode value="https://vuejs.org" bg-color="#cccccc" />
  <QRCode value="https://vuejs.org" color="#cccccc" />
  <hr />
  <QRCode value="https://vuejs.org" icon="https://vuejs.org/images/logo.png" />
  <hr />
  <QRCode value="https://vuejs.org" type="svg" status="loading">
    <template #status>加载中...</template>
  </QRCode>
  <QRCode value="https://vuejs.org" type="svg" status="expired" />
  <hr />
  <button @click="decline">- small</button>
  <button @click="increase">+ large</button>
  <br />
  <QRCode
    value="https://vuejs.org"
    type="svg"
    icon="https://vuejs.org/images/logo.png"
    :size="size"
    :iconSize="size / 4"
    error-level="Q"
  />
  <hr />
  <select name="select" @change="selectChange">
    <option value="L">L</option>
    <option value="M">M</option>
    <option value="Q">Q</option>
    <option value="H">H</option>
  </select>
  <QRCode
    value="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
    :error-level="level"
  />
  <hr />
  <QRCode value="https://vuejs.org" ref="qrcodeCanvasRef" />
  <button @click="downloadChange">下载</button>
  <hr />
  <QRCodeCanvas v-bind="qrcodeProps" />
  <br />
  <QRCodeSVG v-bind="qrcodeProps" />
</template>
