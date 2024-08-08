import '@style/admin-classic.sass'

import { defineComponent, computed } from 'vue'

import { mergeProps, useAdmin } from './admin-base'
import { cssValue } from '../helper'
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
  name: 'AdminClassic',
  props: mergeProps(),
  setup (props, { slots }) {
    const {
      contentMainClass,
      contentContainerClass
    } = useAdmin(props)

    const hasHeader = computed(() => Object.hasOwn(slots, 'header'))
    const hasAside = computed(() => Object.hasOwn(slots, 'aside'))
    const hasBreadcrumb = computed(() => Object.hasOwn(slots, 'breadcrumb'))
    const hasFooter = computed(() => Object.hasOwn(slots, 'footer'))
    const asideArea = computed(() => hasAside.value ? 'aside' : '')
    const asideSize = computed(() => hasAside.value
      ? cssValue(props.collapse ? props.asideCollapsedWidth : props.asideWidth)
      : ''
    )

    const mergeAside = areaName => {
      if (props.asidePosition === 'left') return asideArea.value + ' ' + areaName
      // aside panel is on the right
      return areaName + ' ' + asideArea.value
    }

    const containerStyles = computed(() => {
      const columns = ['auto']
      if (props.asidePosition === 'left') {
        columns.unshift(asideSize.value)
      } else {
        columns.push(asideSize.value)
      }
      const rows = [
        hasHeader.value ? cssValue(props.headerHeight) : '',
        hasBreadcrumb.value ? cssValue(props.breadcrumbHeight) : '',
        'auto',
        hasFooter.value ? cssValue(props.footerHeight) : ''
      ]

      const areas = []
      hasHeader.value && areas.push('header header')
      hasBreadcrumb.value && areas.push(mergeAside('breadcrumb'))
      areas.push(mergeAside('main'))
      hasFooter.value && areas.push(mergeAside('footer'))
      const areasResult = areas.map(area => `"${area}"`)

      return {
        width: cssValue(props.width),
        height: cssValue(props.height),
        'grid-template-columns': columns.join(' '),
        'grid-template-rows': rows.join(' '),
        'grid-template-areas': areasResult.join(' ')
      }
    })

    return () => (
      <div class='layout-admin-classic' style={containerStyles.value}>
        {slots.header && (
          <div class='admin-header'>{slots.header()}</div>
        )}

        {slots.aside && (
          <div class='admin-aside'>{slots.aside()}</div>
        )}

        {slots.breadcrumb && (
          <div class='admin-breadcrumb'>{slots.breadcrumb()}</div>
        )}

        <div class={contentMainClass.value}>
          <div class={contentContainerClass.value}>
            {slots.default?.()}
          </div>
        </div>

        {slots.footer && (
          <div class='admin-footer' >{slots.footer()}</div>
        )}
      </div>
    )
  }
})
