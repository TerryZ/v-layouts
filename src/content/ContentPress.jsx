import './content-press.sass'

import { defineComponent } from 'vue'

import { contentPressProps, useContentPress } from './content-press'
import { useSlots } from '../layout-base'

/**
 * Content press layout
 *
 * |--------------------------------------|
 * | Header                               |
 * |--------------------------------------|
 * | Primary   | Main Content | Secondary |
 * | Aside     |              | Aside     |
 * |           |              |           |
 * |--------------------------------------|
 * | Footer                               |
 * |--------------------------------------|
 */
export default defineComponent({
  name: 'LayoutContentPress',
  props: contentPressProps(),
  setup (props, { slots }) {
    const { mainClasses, getContainerStyles } = useContentPress(props, slots)

    return () => {
      const {
        hasHeader,
        hasFooter,
        hasPrimaryAside,
        hasSecondaryAside
      } = useSlots(slots)

      const containerStyles = getContainerStyles()

      return (
        <div class='layout-content-press' style={containerStyles}>
          {hasHeader && (
            <div class='content-header'>{slots.header()}</div>
          )}
          {hasPrimaryAside && (
            <div class='content-primary-aside'>{slots.primaryAside()}</div>
          )}
          {hasSecondaryAside && (
            <div class='content-secondary-aside'>{slots.secondaryAside()}</div>
          )}

          <div class={mainClasses.value}>{slots.default?.()}</div>

          {hasFooter && (
            <div class='content-footer' >{slots.footer()}</div>
          )}
        </div>
      )
    }
  }
})
