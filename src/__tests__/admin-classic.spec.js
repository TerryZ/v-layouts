import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import { LayoutAdminClassic } from '@/'
import ConditionRender from './ConditionRender.vue'

describe('Admin classic layout', () => {
  describe('默认情况', () => {
    const wrapper = mount(LayoutAdminClassic, {
      slots: {
        default: 'Main Content'
      }
    })

    test('主内容区应存在文本 `Main Content`', () => {
      expect(wrapper.find('.admin-main').exists).toBeTruthy()
      expect(wrapper.find('.admin-main').text()).toBe('Main Content')
    })
    test('布局中应只有主内容区一个子元素', () => {
      expect(wrapper.find('.layout-admin-classic').element.children.length).toBe(1)
    })
    test('容器默认应用屏幕可见区域的宽度与高度', () => {
      expect(wrapper.find('.layout-admin-classic').element.style.width).toBe('100vw')
      expect(wrapper.find('.layout-admin-classic').element.style.height).toBe('100vh')
    })
  })

  describe('应用所有布局区块', () => {
    const wrapper = mount(LayoutAdminClassic, {
      slots: {
        default: 'Main Content',
        header: 'Header',
        footer: 'Footer',
        aside: 'Aside',
        breadcrumb: 'Breadcrumb'
      }
    })
    const container = wrapper.find('.layout-admin-classic')

    test('五个布局区块应生成，并在对应的插槽里存在设置的内容', () => {
      expect(wrapper.find('.admin-main').exists()).toBeTruthy()
      expect(wrapper.find('.admin-aside').exists()).toBeTruthy()
      expect(wrapper.find('.admin-header').exists()).toBeTruthy()
      expect(wrapper.find('.admin-breadcrumb').exists()).toBeTruthy()
      expect(wrapper.find('.admin-footer').exists()).toBeTruthy()

      expect(wrapper.find('.admin-main').text()).toBe('Main Content')
      expect(wrapper.find('.admin-aside').text()).toBe('Aside')
      expect(wrapper.find('.admin-header').text()).toBe('Header')
      expect(wrapper.find('.admin-breadcrumb').text()).toBe('Breadcrumb')
      expect(wrapper.find('.admin-footer').text()).toBe('Footer')
    })

    test('应用网格布局的列应为 2 列，宽度均应用默认值', () => {
      expect(container.element.style['grid-template-columns']).toBe('260px auto')
    })
    test('应用网格布局的行应为 4 行，宽度均应用默认值', () => {
      expect(container.element.style['grid-template-rows']).toBe('60px 60px auto 60px')
    })
    test('应用网格布局默认区域模板', () => {
      expect(container.element.style['grid-template-areas'])
        .toBe('"header header" "aside breadcrumb" "aside main" "aside footer"')
    })
  })

  describe('定制化', () => {
    const wrapper = mount(LayoutAdminClassic, {
      slots: {
        default: 'Main Content',
        header: 'Header',
        footer: 'Footer',
        aside: 'Aside',
        breadcrumb: 'Breadcrumb'
      },
      props: {
        width: '100%',
        height: 500,
        headerHeight: 50,
        footerHeight: '5rem',
        mainClass: 'main-class',
        breadcrumbHeight: 70,
        asideWidth: '200px',
        asidePosition: 'right',
        asideFullHeight: true
      }
    })
    const container = wrapper.find('.layout-admin-classic')

    test('容器宽度应为 100%，高度应为 500px', () => {
      expect(container.element.style.width).toBe('100%')
      expect(container.element.style.height).toBe('500px')
    })
    test('头部栏高度应为 50px，底部栏高度应为 5rem，面包屑高度应为 70px', () => {
      expect(container.element.style['grid-template-rows']).toBe('50px 70px auto 5rem')
    })
    test('主内容区应应用 `main-class` 类', () => {
      expect(wrapper.find('.admin-main').classes()).toContain('main-class')
    })
    test('侧边栏宽度应为 200px，且位置处于为右侧', () => {
      expect(container.element.style['grid-template-columns']).toBe('auto 200px')
    })
    test('侧边栏应应用全高', () => {
      expect(container.element.style['grid-template-areas']).toBe('"header aside" "breadcrumb aside" "main aside" "footer aside"')
    })
  })

  describe('响应区域条件渲染', () => {
    const wrapper = mount(ConditionRender)
    const container = wrapper.find('.layout-admin-classic')

    test('应用全部区域时，布局中应有 5 个元素', () => {
      expect(container.element.children.length).toBe(5)
    })
    test('通过条件销毁头部栏，布局中应只有 4 个元素，网格布局的行数应为 3 行', async () => {
      await wrapper.setProps({ header: false })
      expect(container.element.children.length).toBe(4)
      expect(wrapper.find('.admin-header').exists()).toBeFalsy()
      // 剩余 3 行
      expect(container.element.style['grid-template-rows']).toBe('60px auto 60px')
      expect(container.element.style['grid-template-areas']).toBe('"aside breadcrumb" "aside main" "aside footer"')
    })
    test('通过条件销毁侧边栏，布局中应只有 3 个元素，网格布局的列数应为 1 列', async () => {
      await wrapper.setProps({ aside: false })
      expect(container.element.children.length).toBe(3)
      expect(wrapper.find('.admin-aside').exists()).toBeFalsy()
      // 剩余 1 列
      expect(container.element.style['grid-template-columns']).toBe('auto')
      expect(container.element.style['grid-template-areas']).toBe('"breadcrumb" "main" "footer"')
    })
    test('通过条件销毁面包屑，布局中应只有 2 个元素，网格布局的行数应为 2 行', async () => {
      await wrapper.setProps({ breadcrumb: false })
      expect(container.element.children.length).toBe(2)
      expect(wrapper.find('.admin-breadcrumb').exists()).toBeFalsy()
      // 剩余 2 行
      expect(container.element.style['grid-template-rows']).toBe('auto 60px')
      expect(container.element.style['grid-template-areas']).toBe('"main" "footer"')
    })
    test('通过条件销毁底部栏，布局中应只有 1 个元素，网格布局应只剩 1 行 1 列', async () => {
      await wrapper.setProps({ footer: false })
      expect(container.element.children.length).toBe(1)
      expect(wrapper.find('.admin-footer').exists()).toBeFalsy()
      expect(container.element.style['grid-template-rows']).toBe('auto')
      expect(container.element.style['grid-template-columns']).toBe('auto')
      expect(container.element.style['grid-template-areas']).toBe('"main"')
    })
  })
})
