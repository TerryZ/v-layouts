import './layout.sass'
import {
  Container,
  Header,
  Aside,
  Main
} from 'element-ui'

/**
 * Admin platform standard layout with Element-ui
 */
export default {
  components: {
    'el-container': Container,
    'el-header': Header,
    'el-aside': Aside,
    'el-main': Main
  },
  render (h) {
    const slot = this.$scopedSlots

    const content = []
    // Breadcrumb bar
    if ('breadcrumb' in slot) {
      content.push(h('el-header', {
        class: 'admin-breadcrumb',
        props: {
          height: 'auto'
        }
      }, slot.breadcrumb()))
    }
    content.push(h('el-main', {
      class: 'admin-main'
    }, this.buildSlot('default')))

    // Main container
    return h('el-container', { class: 'admin-layout' }, [
      // Header bar
      h('el-header', {
        class: 'admin-header',
        props: {
          height: 'auto'
        }
      }, this.buildSlot('header')),
      h('el-container', [
        // Sidebar
        h('el-aside', {
          class: 'admin-menu',
          props: {
            width: 'auto'
          }
        }, this.buildSlot('menu')),
        // Main content
        h('el-container', content)
      ])
    ])
  },
  methods: {
    buildSlot (name) {
      return name in this.$scopedSlots ? this.$scopedSlots[name]() : undefined
    }
  }
}
