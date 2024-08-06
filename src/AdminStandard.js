import './layout.sass'
import adminMixins from './admin-mixins'

/**
 * Admin platform standard layout
 *
 * |---------------------------------|
 * | Header                          |
 * |---------------------------------|
 * | Menu  | Breadcrumb              |
 * |       |-------------------------|
 * |       | Main Content            |
 * |       |                         |
 * |       |                         |
 * |---------------------------------|
 */
export default {
  mixins: [adminMixins],
  render (h) {
    const { headerHeight, asideWidth } = this
    const { buildSlot } = this

    // Main container
    return h('div', {
      class: 'admin-layout vw-100 vh-100 d-flex flex-column overflow-hidden'
    }, [
      // Header bar
      h('div', {
        class: 'admin-header d-flex align-items-center',
        style: `height: ${headerHeight}px`,
        props: {
          height: 'auto'
        }
      }, buildSlot('header')),
      h('div', {
        class: 'flex-grow-1 d-flex overflow-hidden'
      }, [
        // Sidebar
        h('div', {
          class: 'admin-menu flex-shrink-0',
          style: {
            width: `${asideWidth}px`,
            height: `calc(100vh - ${headerHeight}px)`
          },
          props: {
            width: 'auto'
          }
        }, buildSlot('menu')),
        // Main content
        h('div', {
          class: 'd-flex flex-column flex-grow-1',
          style: {
            width: `calc(100vw - ${asideWidth}px)`
          }
        }, this.buildContent(h))
      ])
    ])
  },
  methods: {
    buildContent (h) {
      // 外部应用的具名插槽集
      const slot = this.$scopedSlots
      const { headerHeight, breadcrumbHeight } = this
      const { buildSlot } = this

      const content = []
      // Breadcrumb bar
      if ('breadcrumb' in slot) {
        content.push(h('div', {
          class: 'admin-breadcrumb',
          style: `height: ${breadcrumbHeight}px`,
          props: {
            height: 'auto'
          }
        }, slot.breadcrumb()))
      }
      // 内容容器的其他所有兄弟容器的总高度
      let siblingsHeight = headerHeight
      if ('breadcrumb' in slot) {
        siblingsHeight += breadcrumbHeight
      }

      // Content main container area
      const contentContainer = h('div', {
        class: this.contentContainerClass
      }, buildSlot('default'))

      // Content main area
      content.push(h('div', {
        class: this.contentMainClass,
        style: `height: calc(100vh - ${siblingsHeight}px)`
      }, [contentContainer]))

      return content
    }
  }
}
