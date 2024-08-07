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

    const containerStyles = computed(() => {
      const columns = [
        hasAside.value ? cssValue(props.asideWidth) : '',
        'auto'
      ]
      const rows = [
        hasHeader.value ? cssValue(props.headerHeight) : '',
        hasBreadcrumb.value ? cssValue(props.breadcrumbHeight) : '',
        'auto',
        hasFooter.value ? cssValue(props.footerHeight) : ''
      ]

      const areas = []
      const asideArea = hasAside.value ? 'aside ' : ''
      if (hasHeader.value) {
        areas.push('header header')
      }
      if (hasBreadcrumb.value) {
        areas.push(asideArea + 'breadcrumb')
      }
      areas.push(asideArea + 'main')
      if (hasFooter.value) {
        areas.push(asideArea + 'footer')
      }
      const areasResult = areas.map(area => `"${area}"`)
      console.log(areasResult)

      return {
        width: cssValue(props.width),
        height: cssValue(props.height),
        'grid-template-columns': columns.join(' '),
        'grid-template-rows': rows.join(' '),
        'grid-template-areas': areasResult.join(' ')
      }
    })

    return () => (
      // Main container
      <div class='layout-admin-classic' style={containerStyles.value}>
        {slots.header && (
          <div class='admin-header'>
            {slots.header()}
          </div>
        )}

        {slots.aside && (
          <div class='admin-aside flex-shrink-0'>
            {slots.aside()}
          </div>
        )}

        {slots.breadcrumb && (
          <div class='admin-breadcrumb'>
            {slots.breadcrumb()}
          </div>
        )}

        <div class={contentMainClass.value}>
          <div class={contentContainerClass.value}>
            {slots.default?.()}
          </div>
        </div>

        {slots.footer && (
          <div class='admin-footer'>
            {slots.footer()}
          </div>
        )}
      </div>
    )
  }
})
