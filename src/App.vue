<script setup lang="ts">
import { ref, computed } from 'vue'
import QRCode from './components'
import type { QRCodeProps } from './components'
import { version } from '../package.json'
const size = ref(160)
const bgColor = ref('#ffffff')
const color = ref('#000000')
const level = ref('L')
const value = ref('https://vuejs.org')
const type = ref<QRCodeProps['type']>('canvas')
const includeImage = ref(false)
const icon = ref('https://vuejs.org/images/logo.png')
const iconSize = ref(40)
const status = ref<QRCodeProps['status']>('active')
const bordered = ref(true)
const centerImage = ref(true)
const imageX = ref(0)
const imageY = ref(0)
const excavate = ref(false)
const outputCode = computed(() => {
  const iconSettings = {
    x: imageX.value,
    y: imageY.value,
    excavate: excavate.value
  }
  return `
import QRCode from "qrcode.vue-next";

<template>
  <QRCode
    :value="${value.value}"
    :size="${size.value}"
    :bgColor="${bgColor.value}"
    :color="${color.value}"
    :level="${level.value}"
    :type="${type.value}"
    :icon="${includeImage.value ? icon.value : undefined}"
    :iconSize="${includeImage.value ? iconSize.value : undefined}"
    :iconSettings="${centerImage.value ? undefined : JSON.stringify(iconSettings)}"
    :status="${status.value}"
    :bordered="${bordered.value}"
    @change="() => console.log('change')"
    @refresh="() => console.log('refresh')"
  />
</template>
`
})
</script>

<template>
  <h1>
    qrcode.vue-next Demo - v<a
      :href="`https://www.npmjs.com/package/qrcode.vue-next/v/${version}`"
      target="_blank"
      >{{ version }}</a
    >
  </h1>
  <div class="content">
    <fieldset>
      <legend>Basic Settings</legend>
      <label>二维码渲染大小-Size(px): <input type="number" v-model="size" /></label>
      <br />
      <label>二维码背景颜色-Background Color: <input type="color" v-model="bgColor" /></label>
      <br />
      <label>二维码颜色-Color: <input type="color" v-model="color" /></label>
      <br />
      <label
        >二维码纠错等级-Error Level:
        <select v-model="level">
          <option value="L">L</option>
          <option value="M">M</option>
          <option value="Q">Q</option>
          <option value="H">H</option>
        </select>
      </label>
      <br />
      <br />
      <label>扫描后的地址-Value: <textarea v-model="value" /></label>
      <br />
      <br />
      <label
        >渲染类型-Type:
        <select v-model="type">
          <option value="canvas">Canvas</option>
          <option value="svg">SVG</option>
        </select>
      </label>
      <br />
      <label
        >二维码状态-Status:
        <select v-model="status">
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="loading">Loading</option>
          <option value="scanned">Scanned</option>
        </select>
      </label>
      <br />
      <label>二维码边框-Bordered: <input type="checkbox" v-model="bordered" /></label>
      <br />
      <label>是否使用logo: <input type="checkbox" v-model="includeImage" /></label>
      <fieldset :disabled="!includeImage">
        <legend>Icon Settings</legend>
        <label>Icon: <textarea v-model="icon" /></label>
        <br />
        <label>Icon Size {{ iconSize }}: <input type="number" v-model="iconSize" /></label>
        <br />
        <label>logo是否居中: <input type="checkbox" v-model="centerImage" /></label>
        <br />
        <fieldset :disabled="centerImage">
          <legend>Image Seeings</legend>
          <label
            >Image X {{ imageX }}:
            <input type="range" min="0" :max="size - (12 + 1) * 2 - iconSize" v-model="imageX"
          /></label>
          <br />
          <label
            >Image Y {{ imageY }}:
            <input type="range" min="0" :max="size - (12 + 1) * 2 - iconSize" v-model="imageY"
          /></label>
        </fieldset>
        <br />
        <label>图标是否有背景: <input type="checkbox" v-model="excavate" /></label>
      </fieldset>
    </fieldset>
    <div>
      <fieldset>
        <legend>Output Code</legend>
        <textarea cols="80" :rows="outputCode.split('\n').length" :value="outputCode" readonly />
        <QRCode
          :value="value"
          :size="size"
          :level="level"
          :bg-color="bgColor"
          :color="color"
          :type="type"
          :icon="includeImage ? icon : undefined"
          :icon-size="includeImage ? iconSize : undefined"
          :status="status"
          :bordered="bordered"
          :icon-settings="{
            x: centerImage ? undefined : imageX,
            y: centerImage ? undefined : imageY,
            excavate: excavate
          }"
          @change="() => console.log('change')"
          @refresh="() => console.log('refresh')"
        />
      </fieldset>
    </div>
  </div>
</template>

<style>
.content {
  display: flex;
}
</style>
