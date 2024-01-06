import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import QRCode from '../components/index'

describe('QRCode test', () => {
  it('should correct render', () => {
    const wrapper = mount({
      render() {
        return <QRCode value="test" icon="test" />
      }
    })
    expect(wrapper.find('.qrcode')).toBeTruthy()
    expect(wrapper.find('canvas')).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('image')).toBeTruthy()
  })
})
