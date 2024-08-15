import './content-press.sass'

import { defineComponent, computed } from 'vue'

import { mergeProps, useAdmin } from './admin-base'
import { cssValue, gridValue, conditionValue } from '../helper'

export default defineComponent({
  name: 'ContentPress',
  props: mergeProps(),
  setup (props, { slots }) {
    return () => (
      <div class='layout-admin-classic' style={containerStyles.value}>
        {slots.header && (
          <div class='admin-header'>{slots.header()}</div>
        )}
        {slots.aside && (
          <div class='admin-primary-aside'>{slots.aside()}</div>
        )}
        {slots.breadcrumb && (
          <div class='admin-breadcrumb'>{slots.breadcrumb()}</div>
        )}

        <div class={mainClasses.value}>{slots.default?.()}</div>

        {slots.footer && (
          <div class='admin-footer' >{slots.footer()}</div>
        )}
      </div>
    )
  }
})
