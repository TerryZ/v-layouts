import './admin-classic.sass'

import { defineComponent, computed } from 'vue'

import { mergeProps, useAdmin } from './admin-base'
import { cssValue, gridValue, conditionValue, useSlots } from '../helper'
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
      mainClasses,
      applyAsideDirection
    } = useAdmin(props, slots)

    return () => {
      const { hasAside, hasHeader, hasBreadcrumb, hasFooter } = useSlots(slots)
      const composeAside = areaName => gridValue(
        applyAsideDirection([conditionValue(hasAside, 'aside'), areaName])
      )

      const asideSize = computed(() => conditionValue(hasAside, cssValue(
        props.collapse ? props.asideCollapsedWidth : props.asideWidth
      )))

      const containerStyles = computed(() => {
        // grid-template-columns
        const columns = applyAsideDirection([asideSize.value, 'auto'])
        // grid-template-rows
        const rows = [
          conditionValue(hasHeader, cssValue(props.headerHeight)),
          conditionValue(hasBreadcrumb, cssValue(props.breadcrumbHeight)),
          'auto',
          conditionValue(hasFooter, cssValue(props.footerHeight))
        ]
        // grid-template-areas
        const headerAside = conditionValue(
          hasAside, props.asideFullHeight ? 'aside' : 'header'
        )
        const areas = [
          conditionValue(
            hasHeader,
            gridValue(applyAsideDirection([headerAside, 'header']))
          ),
          conditionValue(hasBreadcrumb, composeAside('breadcrumb')),
          composeAside('main'),
          conditionValue(hasFooter, composeAside('footer'))
        ]

        return {
          width: cssValue(props.width),
          height: cssValue(props.height),
          'grid-template-columns': gridValue(columns),
          'grid-template-rows': gridValue(rows),
          'grid-template-areas': gridValue(areas, area => `"${area}"`)
        }
      })

      return (
        <div class='layout-admin-classic' style={containerStyles.value}>
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
