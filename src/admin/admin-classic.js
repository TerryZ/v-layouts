import { computed } from 'vue'

// import { cssValue } from '../helper'
import {
  ASIDE_POSITION_LEFT,
  ASIDE, BREADCRUMB, FOOTER, HEADER, MAIN
} from '../constants'
import { cssValue, gridValue, conditionValue } from '../helper'
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
    const verifyRow = ([available, ...areaRow]) => available ? areaRow : []
    const areas = [
      [hasHeader, headerAside, HEADER],
      [hasBreadcrumb, asideArea, BREADCRUMB],
      [true, asideArea, MAIN],
      [hasFooter, asideArea, FOOTER]
    ].map(verifyRow).filter(area => area.length)
    const areaRowTransform = areaRow => (
      `"${applyAsideDirection(areaRow).join(' ')}"`
    )

    return {
      width: cssValue(props.width),
      height: cssValue(props.height),
      'grid-template-columns': gridValue(columns),
      'grid-template-rows': gridValue(rows),
      'grid-template-areas': gridValue(areas, areaRowTransform)
    }
  }

  return {
    mainClasses,
    getContainerStyles
  }
}
