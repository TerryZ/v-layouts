import './admin-classic.sass'

import { defineComponent } from 'vue'

import { adminClassicProps, useAdmin } from './admin-classic'
import { useSlots } from '../layout-base'
/**
 * Admin platform classic layout
 *
 * |---------------------------------|
 * | Header                          |
 * |---------------------------------|
 * | Aside | Breadcrumb              |
 * |       |-------------------------|
 * |       | Main Content            |
 * |       |                         |
 * |       |-------------------------|
 * |       | Footer                  |
 * |---------------------------------|
 */
export default defineComponent({
  name: 'LayoutAdminClassic',
  props: adminClassicProps(),
  setup (props, { slots }) {
    const {
      mainClasses,
      getContainerStyles
    } = useAdmin(props, slots)

    return () => {
      const { hasAside, hasHeader, hasBreadcrumb, hasFooter } = useSlots(slots)
      const containerStyles = getContainerStyles()

      return (
        <div class='layout-admin-classic' style={containerStyles}>
          {hasHeader && (
            <div class='admin-header'>{slots.header()}</div>
          )}
          {hasAside && (
            <div class='admin-aside'>{slots.aside()}</div>
          )}
          {hasBreadcrumb && (
            <div class='admin-breadcrumb'>{slots.breadcrumb()}</div>
          )}

          <div class={mainClasses.value}>{slots.default?.()}</div>

          {hasFooter && (
            <div class='admin-footer'>{slots.footer()}</div>
          )}
        </div>
      )
    }
  }
})
