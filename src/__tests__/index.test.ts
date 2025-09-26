import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import QRCode from '../components/index'

describe('QRCode test', () => {
  it('should correct render', () => {
    const wrapper = mount(QRCode, {
      props: {
        value: 'https://www.baidu.com',
        icon: 'https://www.baidu.com/favicon.ico',
      }
    })
    expect(wrapper.find('.qrcode')).toBeTruthy()
    expect(wrapper.find('canvas')).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('image')).toBeTruthy()
  })
})
