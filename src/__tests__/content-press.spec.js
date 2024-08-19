import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import { LayoutContentPress } from '@/'
import ConditionRender from './ContentPressConditionRender.vue'

describe('Content press layout', () => {
  describe('默认情况', () => {
    const wrapper = mount(LayoutContentPress, {
      slots: {
        default: 'Main Content'
      }
    })

    test('主内容区应存在文本 `Main Content`', () => {
      expect(wrapper.find('.content-main').exists).toBeTruthy()
      expect(wrapper.find('.content-main').text()).toBe('Main Content')
    })
    test('布局中应只有主内容区一个子元素', () => {
      expect(wrapper.find('.layout-content-press').element.children.length).toBe(1)
    })
    test('容器默认应用屏幕可见区域的宽度与高度', () => {
      expect(wrapper.find('.layout-content-press').element.style.width).toBe('100vw')
      expect(wrapper.find('.layout-content-press').element.style.height).toBe('100vh')
    })
  })

  describe('应用所有布局区块', () => {
    const wrapper = mount(LayoutContentPress, {
      slots: {
        default: 'Main Content',
        header: 'Header',
        footer: 'Footer',
        primaryAside: 'Primary Aside',
        secondaryAside: 'Secondary Aside'
      }
    })
    const container = wrapper.find('.layout-content-press')

    test('五个布局区块应生成，并在对应的插槽里存在设置的内容', () => {
      expect(wrapper.find('.content-main').exists()).toBeTruthy()
      expect(wrapper.find('.content-primary-aside').exists()).toBeTruthy()
      expect(wrapper.find('.content-secondary-aside').exists()).toBeTruthy()
      expect(wrapper.find('.content-header').exists()).toBeTruthy()
      expect(wrapper.find('.content-footer').exists()).toBeTruthy()

      expect(wrapper.find('.content-main').text()).toBe('Main Content')
      expect(wrapper.find('.content-header').text()).toBe('Header')
      expect(wrapper.find('.content-primary-aside').text()).toBe('Primary Aside')
      expect(wrapper.find('.content-secondary-aside').text()).toBe('Secondary Aside')
      expect(wrapper.find('.content-footer').text()).toBe('Footer')
    })

    test('应用网格布局的列应为 3 列，宽度均应用默认值', () => {
      expect(container.element.style['grid-template-columns']).toBe('260px auto 260px')
    })
    test('应用网格布局的行应为 3 行，高度均应用默认值', () => {
      expect(container.element.style['grid-template-rows']).toBe('60px auto 60px')
    })
    test('应用网格布局默认区域模板', () => {
      expect(container.element.style['grid-template-areas'])
        .toBe('"header header header" "primary-aside main secondary-aside" "footer footer footer"')
    })
  })

  describe('定制化', () => {
    const wrapper = mount(LayoutContentPress, {
      slots: {
        default: 'Main Content',
        header: 'Header',
        footer: 'Footer',
        primaryAside: 'Primary Aside',
        secondaryAside: 'Secondary Aside'
      },
      props: {
        width: '100%',
        height: 500,
        headerHeight: 50,
        footerHeight: '5rem',
        mainClass: 'main-class',
        primaryAsideWidth: '200px',
        secondaryAsideWidth: '200px',
        mainPosition: 'right'
      }
    })
    const container = wrapper.find('.layout-content-press')

    test('容器宽度应为 100%，高度应为 500px', () => {
      expect(container.element.style.width).toBe('100%')
      expect(container.element.style.height).toBe('500px')
    })
    test('头部栏高度应为 50px，底部栏高度应为 5rem，面包屑高度应为 70px', () => {
      expect(container.element.style['grid-template-rows']).toBe('50px auto 5rem')
    })
    test('主内容区应应用 `main-class` 类', () => {
      expect(wrapper.find('.content-main').classes()).toContain('main-class')
    })
    test('两个侧边栏宽度应均为 200px，主内容区位置处于为右侧', () => {
      expect(container.element.style['grid-template-columns']).toBe('200px 200px auto')
    })
  })

  describe('响应区域条件渲染', () => {
    const wrapper = mount(ConditionRender)
    const container = wrapper.find('.layout-content-press')

    test('应用全部区域时，布局中应有 5 个元素', () => {
      expect(container.element.children.length).toBe(5)
    })
    test('通过条件销毁头部栏，布局中应只有 4 个元素，网格布局的行数应为 2 行', async () => {
      await wrapper.setProps({ header: false })
      expect(container.element.children.length).toBe(4)
      expect(wrapper.find('.content-header').exists()).toBeFalsy()
      expect(container.element.style['grid-template-rows']).toBe('auto 60px')
      expect(container.element.style['grid-template-areas']).toBe('"primary-aside main secondary-aside" "footer footer footer"')
    })
    test('通过条件销毁主侧边栏，布局中应只有 3 个元素，网格布局的列数应为 2 列', async () => {
      await wrapper.setProps({ primaryAside: false })
      expect(container.element.children.length).toBe(3)
      expect(wrapper.find('.content-primary-aside').exists()).toBeFalsy()
      expect(container.element.style['grid-template-columns']).toBe('auto 260px')
      expect(container.element.style['grid-template-areas']).toBe('"main secondary-aside" "footer footer"')
    })
    test('通过条件销毁次侧边栏，布局中应只有 2 个元素，网格布局的行数应为 2 行', async () => {
      await wrapper.setProps({ secondaryAside: false })
      expect(container.element.children.length).toBe(2)
      expect(wrapper.find('.content-secondary-aside').exists()).toBeFalsy()
      expect(container.element.style['grid-template-rows']).toBe('auto 60px')
      expect(container.element.style['grid-template-areas']).toBe('"main" "footer"')
    })
    test('通过条件销毁底部栏，布局中应只有 1 个元素，网格布局应只剩 1 行 1 列', async () => {
      await wrapper.setProps({ footer: false })
      expect(container.element.children.length).toBe(1)
      expect(wrapper.find('.content-footer').exists()).toBeFalsy()
      expect(container.element.style['grid-template-rows']).toBe('auto')
      expect(container.element.style['grid-template-columns']).toBe('auto')
      expect(container.element.style['grid-template-areas']).toBe('"main"')
    })
  })
})
