# QRCode

[qrcode.react](https://github.com/zpao/qrcode.react)的vue版本实现，最开始是[ant-design-vue](https://www.antdv.com)在QRCode组件中完成迁移，此仓库将其剥离出来，不是重复造轮子，而是满足在有使用二维码场景但组件库选型不是ant-design-vue的情况下，能够使用到[qrcode.react](https://github.com/zpao/qrcode.react)这一业界优秀实现，感谢qrcode.react与ant-design-vue为开源做出的贡献

## 安装

```sh
npm install qrcode.vue-next
```

## 使用

`qrcode.vue-next`导出三个组件，支持以SVG或Canvas形式呈现。通常建议使用SVG，因为它更灵活，但Canvas可能更可取。

### `Canvas`

```js
import QRCode fom 'qrcode.vue-next';

<template>
  <QRCode value="https://vuejs.org/" />
</template>
```

### `SVG`

```js
import QRCode fom 'qrcode.vue-next';

<template>
  <QRCode value="https://vuejs.org/" type="svg" />
</template>
```

### `自定义`

如果不满足封装的QRCode提供的样式与功能，可以直接导出`QRCodeCanvas`或`QRCodeSVG`来使用，并传递所需props，然后就可以自由创造了。

```js
import QRCode, { QRCodeCanvas, QRCodeSVG } from 'qrcode.vue-next';

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

<template>
  <QRCodeCanvas v-bind="qrcodeProps" />
  <br />
  <QRCodeSVG v-bind="qrcodeProps" />
</template>

```

## 封装后的API，基于antd
| 参数 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------------- | ---- |
| `bgColor` | `string` | `'transparent'` | 二维码背景颜色 |
| `bordered` | `boolean` | `true` | 是否显示边框 |
| `color` | `string` | `'#000000'` | 二维码颜色 |
| `errorLevel` | `'L'` \| `'M'` \| `'Q'` \| `'H'` | `'L'` | 二维码纠错等级 |
| `icon` | `string` | - | 二维码中的图片地址 |
| `iconSize` | `number` | `40` | 二维码中图片的大小 |
| `size` | `number` | `160` | 二维码渲染大小 |
| `status` | `'active'` \| `'expired'` \| `'loading'` | `'active'` | 二维码状态 |
| `type` | `'canvas'` \| `'svg'` | `'canvas'` | 渲染类型 |
| `value` | `string` | - | 扫描后的地址 |

## 原本的API

| prop            | type                         | default value | note |
| --------------- | ---------------------------- | ------------- | ---- |
| `value`         | `string`                     |
| `size`          | `number`                     | `128`         |
| `bgColor`       | `string`                     | `"#FFFFFF"`   | CSS color |
| `fgColor`       | `string`                     | `"#000000"`   | CSS color |
| `level`         | `string` (`'L' 'M' 'Q' 'H'`) | `'L'`         |
| `minVersion`    | `number` (1-40)              | `1`           | QR Code versions are 1-40. The optimal (lowest) version is determined for the `value` provided, using this minimum as the lower bound.
| `includeMargin` | `boolean`                    | `false`       | **DEPRECATED**. This is being remvoed in favor of `marginSize` |
| `marginSize`    | `number`                     | `0`           | Specifies the number of _modules_ to use for margin around the symbol. The QR Code specification requires `4`, however you may use other values. Values will be turned to integers with `Math.floor`. Overrides `includeMargin` default value when specified |
| `imageSettings` | `object`                     |               | See below |

### `imageSettings`

| field      | type      | default value     | note |
| ---------- | --------- | ----------------- | ---- |
| `src`      | `string`  |
| `x`        | `number`  | none              | Will attempt to center if not specified |
| `y`        | `number`  | none              | Will attempt to center if not specified |
| `height`   | `number`  | 10% of `size`     |
| `width`    | `number`  | 10% of `size`     |
| `excavate` | `boolean` | `false`           |
| `opacity`  | `number`  | 1                 |

## 自定义样式

`qrcode.vue-next`将通过任何附加的道具传递到底层DOM节点（`＜svg＞`或`＜canvas＞`）。这允许使用内联“style”或自定义“class”来自定义渲染。一个常见的用途是支持响应式布局。

**注意:** 为了在高密度显示器上渲染`＜canvas＞`中的二维码，我们缩放画布元素以包含适当数量的像素，然后使用内联样式进行缩小。我们将合并任何其他样式，自定义的`height`和`width`将覆盖我们原本的值。这允许缩放到百分比_but_如果缩放超过`size`，您将遇到模糊的图像。建议在渲染到`＜canvas＞`时传递适当的大小.

<img src="src/assets/qrcode.png" height="160" width="160">

## 编码模式

`qrcode.vue3`仅支持在单个段中对文本进行编码。所使用的编码库进行最少的检测，以确定所编码的文本是否可以遵循数字或字母数字模式的优化路径，从而允许对更多数据进行编码。否则，它将按照字节模式进行编码。此模式包括支持多字节Unicode字符（如汉字），但不支持优化的汉字编码模式。.
