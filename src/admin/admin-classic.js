import { computed } from 'vue'

// import { cssValue } from '../helper'
import {
  ASIDE_POSITION_LEFT,
  ASIDE, BREADCRUMB, FOOTER, HEADER, MAIN
} from '../constants'
import { cssValue, gridValue, conditionValue, onlyAvailable } from '../helper'
import { mergeProps, useSlots } from '../layout-base'

export function adminClassicProps () {
  return mergeProps({
    breadcrumbHeight: { type: [String, Number], default: 60 },
    asideWidth: { type: [String, Number], default: 260 },
    asidePosition: { type: String, default: 'left' },
    asideFullHeight: { type: Boolean, default: false }
  })
}

export function useAdmin (props, slots) {
  const mainClasses = computed(() => ['admin-main', props.mainClass])

  // sidebar in left by default
  const applyAsideDirection = rowAreas => (
    props.asidePosition === ASIDE_POSITION_LEFT
      ? rowAreas
      : rowAreas.reverse()
  )
  const getContainerStyles = () => {
    const {
      hasAside,
      hasHeader,
      hasBreadcrumb,
      hasFooter
    } = useSlots(slots)
    // grid-template-columns
    const columns = applyAsideDirection([
      conditionValue(hasAside, cssValue(props.asideWidth)),
      'auto'
    ])
    // grid-template-rows
    const rows = [
      conditionValue(hasHeader, cssValue(props.headerHeight)),
      conditionValue(hasBreadcrumb, cssValue(props.breadcrumbHeight)),
      'auto',
      conditionValue(hasFooter, cssValue(props.footerHeight))
    ]
    // grid-template-areas
    const headerAside = conditionValue(
      hasAside, props.asideFullHeight ? ASIDE : HEADER
    )
    const asideArea = conditionValue(hasAside, ASIDE)

    const areas = [[asideArea, MAIN]]
    if (hasBreadcrumb) areas.unshift([asideArea, BREADCRUMB])
    if (hasHeader) areas.unshift([headerAside, HEADER])
    if (hasFooter) areas.push([asideArea, FOOTER])

    const parseAreaRow = row => (
      `"${onlyAvailable(applyAsideDirection(row)).join(' ')}"`
    )

    return {
      width: cssValue(props.width),
      height: cssValue(props.height),
      'grid-template-columns': gridValue(columns),
      'grid-template-rows': gridValue(rows),
      'grid-template-areas': gridValue(areas, parseAreaRow)
    }
  }

  return {
    mainClasses,
    getContainerStyles
  }
}
