import '@style/admin-classic.sass'

import { defineComponent, computed, toRefs } from 'vue'

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
    const { collapse } = toRefs(props)
    const {
      contentMainClass,
      contentContainerClass
    } = useAdmin(props)

    const hasHeader = computed(() => Object.hasOwn(slots, 'header'))
    const hasAside = computed(() => Object.hasOwn(slots, 'aside'))
    const hasBreadcrumb = computed(() => Object.hasOwn(slots, 'breadcrumb'))
    const hasFooter = computed(() => Object.hasOwn(slots, 'footer'))

    const asideSize = computed(() => hasAside.value
      ? cssValue(collapse.value ? props.asideCollapsedWidth : props.asideWidth)
      : ''
    )

    const chooseSide = () => props.asidePosition === 'left' ? 0 : -1
    const mergeAside = areaName => {
      const areas = [hasAside.value ? 'aside' : '', areaName].sort(chooseSide)
      return areas.join(' ')
    }
    const moduleSize = (condition, size) => condition ? cssValue(size) : ''
    const modulePlaceholder = (condition, placeholder) => condition ? placeholder : ''

    const containerStyles = computed(() => {
      const columns = [asideSize.value, 'auto'].sort(chooseSide)

      const rows = [
        moduleSize(hasHeader.value, props.headerHeight),
        moduleSize(hasBreadcrumb.value, props.breadcrumbHeight),
        'auto',
        moduleSize(hasFooter.value, props.footerHeight)
      ]

      const areas = [
        modulePlaceholder(hasHeader.value, 'header header'),
        modulePlaceholder(hasBreadcrumb.value, mergeAside('breadcrumb')),
        mergeAside('main'),
        modulePlaceholder(hasFooter.value, mergeAside('footer'))
      ]

      return {
        width: cssValue(props.width),
        height: cssValue(props.height),
        'grid-template-columns': columns.join(' '),
        'grid-template-rows': rows.join(' '),
        'grid-template-areas': areas.map(area => `"${area}"`).join(' ')
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
