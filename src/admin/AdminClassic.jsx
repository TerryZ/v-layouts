import './admin-classic.sass'

import { defineComponent, computed } from 'vue'

import { mergeProps, useAdmin } from './admin-base'
import { cssValue, gridValue, conditionValue } from '../helper'
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
      hasHeader,
      hasAside,
      hasBreadcrumb,
      hasFooter,
      mainClasses,
      asideSize,
      applyAsideDirection
    } = useAdmin(props, slots)

    const haveHeader = computed(() => !!slots.header)

    const composeAside = areaName => gridValue(
      applyAsideDirection([conditionValue(hasAside.value, 'aside'), areaName])
    )

    const containerStyles = computed(() => {
      // grid-template-columns
      const columns = applyAsideDirection([asideSize.value, 'auto'])
      // grid-template-rows
      const rows = [
        conditionValue(hasHeader.value, cssValue(props.headerHeight)),
        conditionValue(hasBreadcrumb.value, cssValue(props.breadcrumbHeight)),
        'auto',
        conditionValue(hasFooter.value, cssValue(props.footerHeight))
      ]
      // grid-template-areas
      const areas = [
        conditionValue(
          hasHeader.value,
          `${props.asideFullHeight ? 'aside' : 'header'} header`
        ),
        conditionValue(hasBreadcrumb.value, composeAside('breadcrumb')),
        composeAside('main'),
        conditionValue(hasFooter.value, composeAside('footer'))
      ].filter(val => val).map(area => `"${area}"`).join(' ')

      return {
        width: cssValue(props.width),
        height: cssValue(props.height),
        'grid-template-columns': gridValue(columns),
        'grid-template-rows': gridValue(rows),
        'grid-template-areas': areas
      }
    })

    return () => {
      // TODO: 插槽对象非响应式，需要在 render 函数中获取，即每次重新渲染时获取才会准确
      console.log(slots.header)
      return (
      <div class='layout-admin-classic' style={containerStyles.value}>
        <div>{haveHeader.value.toString()},{hasHeader.value.toString()}</div>
        {slots.header && (
          <div class='admin-header'>{slots.header()}</div>
        )}
        {slots.aside && (
          <div class='admin-aside'>{slots.aside()}</div>
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
  }
})
