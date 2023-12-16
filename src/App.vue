<script setup lang="ts">
import { ref } from 'vue'
import QRCode from './components'
const size = ref(160)
const level = ref('L')
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
  console.log('download')
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
</script>

<template>
  <QRCode value="https://vuejs.org" bg-color="#cccccc" />
  <QRCode value="https://vuejs.org" color="#cccccc" />
  <hr />
  <QRCode value="https://vuejs.org" icon="https://www.antdv.com/assets/logo.1ef800a8.svg" />
  <hr />
  <QRCode value="https://vuejs.org" type="svg" status="loading" />
  <QRCode value="https://vuejs.org" type="svg" status="expired" />
  <hr />
  <button @click="decline">- small</button>
  <button @click="increase">+ large</button>
  <br />
  <QRCode
    value="https://vuejs.org"
    type="svg"
    icon="https://www.antdv.com/assets/logo.1ef800a8.svg"
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
</template>
