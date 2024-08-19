import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import { PanelGroup, PanelItem } from '@/'
import PanelItems from './PanelItems.vue'
import PanelGroupItems from './PanelGroupItems.vue'

describe('Panel group', () => {
  describe('默认情况', () => {
    const wrapper = mount(PanelGroup, {
      slots: {
        default: PanelItems
      }
    })
    const container = wrapper.find('.panel-group')

    test('应包含 3 个 PanelItem 组件', () => {
      expect(wrapper.findAllComponents(PanelItem).length).toBe(3)
    })
    test('每个 PanelItem 中均包含标题栏', () => {
      expect(wrapper.findAll('.panel-item__header').length).toBe(3)
    })
    test('标题栏中包含一个面板可见性切换图标', () => {
      expect(wrapper.findAll('.panel-switcher').length).toBe(3)
    })
    test('3 个面板应均处于打开状态', () => {
      expect(container.element.style['grid-template-rows']).toBe('1fr 1fr 1fr')
    })
  })

  describe('v-model 设置与响应面板折叠状态', () => {
    const wrapper = mount(PanelGroup, {
      props: {
        modelValue: ['item1', 'item3']
      },
      emits: ['update:modelValue'],
      slots: {
        default: PanelItems
      }
    })
    const container = wrapper.find('.panel-group')

    test('3 个面板中应有 2 个面板处于打开状态', () => {
      expect(container.element.style['grid-template-rows']).toBe('1fr auto 1fr')
    })
    test('折叠的面板中的切换图标应处于向上的状态', () => {
      expect(wrapper.findAll('.panel-item').at(1).classes()).toContain('panel-item--collapsed')
    })
    test('在折叠的面板中点击切换图标，面板应恢复打开状态', async () => {
      await wrapper
        .find('.panel-item.panel-item--collapsed')
        .find('.panel-switcher')
        .trigger('click')
      expect(container.element.style['grid-template-rows']).toBe('1fr 1fr 1fr')
      expect(wrapper.findAll('.panel-item.panel-item--collapsed')).toHaveLength(0)
    })
    test('切换后，v-model 响应所有面板打开的值', () => {
      expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(['item1', 'item2', 'item3'])
    })
  })
  describe('条件渲染', () => {
    const wrapper = mount(PanelGroupItems)
    const container = wrapper.find('.panel-group')

    test('默认渲染应包含 3 个 PanelItem 组件', () => {
      expect(wrapper.findAllComponents(PanelItem).length).toBe(3)
    })
    test('每个 PanelItem 中均包含标题栏', () => {
      expect(wrapper.findAll('.panel-item__header').length).toBe(3)
    })
    test('条件切换销毁头部栏', async () => {
      await wrapper.setProps({ header: false })
      expect(wrapper.findAll('.panel-item__header')).toHaveLength(0)
    })
    test('条件切换销毁第 3 个面板', async () => {
      await wrapper.setProps({ item3Visible: false })
      expect(wrapper.findAllComponents(PanelItem).length).toBe(2)
      expect(container.element.style['grid-template-rows']).toBe('1fr 1fr')
    })
  })
  describe('折叠面板行为', () => {
    const wrapper = mount(PanelGroupItems, {
      props: {
        destroyOnCollapse: true
      }
    })

    test('折叠面板后销毁面板内容', async () => {
      await wrapper.findAll('.panel-item').at(2).find('.panel-switcher').trigger('click')
      expect(
        wrapper.findAll('.panel-item').at(2).find('.panel-item__body').exists()
      ).toBeFalsy()
    })
    test('面板恢复打开后，重新渲染内容', async () => {
      await wrapper.findAll('.panel-item').at(2).find('.panel-switcher').trigger('click')
      expect(
        wrapper.findAll('.panel-item').at(2).find('.panel-item__body').exists()
      ).toBeTruthy()
    })
  })
  describe('定制化', () => {
    const wrapper = mount(PanelGroup, {
      props: {
        accordion: false,
        gap: 20,
        width: 400,
        height: 500
      },
      slots: {
        default: PanelItems
      }
    })
    const container = wrapper.find('.panel-group')

    test('容器宽度应为 400px, 高度应为 500px', () => {
      container.element.style.width = '400px'
      container.element.style.height = '500px'
    })
    test('面板间距应为 20px', () => {
      container.element.style['row-gap'] = '20px'
    })
    test('关闭手风琴模式下的默认情况中，只有第一个面板处于打开状态', () => {
      expect(container.element.style['grid-template-rows']).toBe('1fr auto auto')
      expect(wrapper.findAll('.panel-item.panel-item--collapsed')).toHaveLength(2)
    })
    test('打开第 3 个面板，其他面板均应折叠', async () => {
      await wrapper.findAll('.panel-item').at(2).find('.panel-switcher').trigger('click')
      expect(container.element.style['grid-template-rows']).toBe('auto auto 1fr')
      expect(wrapper.findAll('.panel-item.panel-item--collapsed')).toHaveLength(2)
      expect(wrapper.findAll('.panel-item').at(2).classes('panel-item--collapsed')).toBe(false)
    })
  })
})
