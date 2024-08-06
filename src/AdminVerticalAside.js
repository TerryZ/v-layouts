import './layout.sass'
import adminMixins from './admin-mixins'

/**
 * Admin platform vertical aside layout
 *
 * |---------------------------------|
 * | Menu  | Header                  |
 * |       |-------------------------|
 * |       | Breadcrumb              |
 * |       |-------------------------|
 * |       | Main Content            |
 * |       |                         |
 * |       |                         |
 * |---------------------------------|
 */
export default {
  mixins: [adminMixins],
  render (h) {
    const { asideCurrentWidth } = this
    const { buildSlot, buildContent } = this

    // Main container
    return h('div', {
      class: 'admin-layout vw-100 vh-100 d-flex flex-column overflow-hidden'
    }, [
      h('div', {
        class: 'flex-grow-1 d-flex overflow-hidden'
      }, [
        // Sidebar
        h('div', {
          class: 'admin-menu flex-shrink-0 vh-100',
          style: {
            width: `${asideCurrentWidth}px`
          },
          props: {
            width: 'auto'
          }
        }, buildSlot('menu')),
        // Main content
        h('div', {
          class: 'd-flex flex-column flex-grow-1',
          style: {
            width: `calc(100vw - ${asideCurrentWidth}px)`
          }
        }, buildContent(h))
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
      // Header bar
      content.push(h('div', {
        class: 'admin-header d-flex align-items-center',
        style: `height: ${headerHeight}px`,
        props: {
          height: 'auto'
        }
      }, buildSlot('header')))
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
