import './content-press.sass'

import { defineComponent, computed } from 'vue'

import { contentPressProps } from './content-press'
import { cssValue, gridValue, conditionValue, useSlots } from '../helper'

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
    return () => {
      const {
        hasHeader,
        hasFooter,
        hasPrimaryAside,
        hasSecondaryAside
      } = useSlots(slots)

      return (
        <div class='layout-content-press' style={containerStyles.value}>
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
