<script setup lang="ts">
import { ref } from 'vue'
const size = ref(160)
const level = ref('L')
const decline = () => {
  size.value = size.value - 10;
  if (size.value < 48) {
    size.value = 48;
  }
};
const increase = () => {
  size.value = size.value + 10;
  if (size.value > 300) {
    size.value = 300;
  }
};
const selectChange = (e: any) => {
  level.value = e.target.value;
};
</script>

<template>
  <QRCode value="https://antdv.com" bg-color="#cccccc" />
  <QRCode value="https://antdv.com" color="#cccccc"/>
  <hr />
  <QRCode value="https://antdv.com" icon="https://www.antdv.com/assets/logo.1ef800a8.svg" />
  <hr />
  <QRCode value="https://antdv.com" type="svg" status="loading" />
  <QRCode value="https://antdv.com" type="svg" status="expired" />
  <hr />
  <button @click="decline">- small</button>
  <button @click="increase">+ large</button>
  <br />
  <QRCode value="https://antdv.com" type="svg" icon="https://www.antdv.com/assets/logo.1ef800a8.svg" :size="size" :iconSize="size / 4" error-level="Q" />
  <hr/>
  <select name="select" @change="selectChange">
    <option value="L">L</option>
    <option value="M">M</option>
    <option value="Q">Q</option>
    <option value="H">H</option>
  </select>
  <QRCode value="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" :error-level="level" />
</template>
