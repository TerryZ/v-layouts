import { computed } from 'vue'

import {
  ASIDE_PRIMARY, ASIDE_SECONDARY, FOOTER, HEADER, MAIN
} from '../constants'
import { mergeProps, useSlots } from '../layout-base'
import {
  cssValue,
  conditionValue,
  gridValue,
  onlyAvailable
} from '../helper'

export function contentPressProps () {
  return mergeProps({
    primaryAsideWidth: { type: [String, Number], default: 260 },
    secondaryAsideWidth: { type: [String, Number], default: 260 },
    mainPosition: { type: String, default: 'center' }
  })
}

export function useContentPress (props, slots) {
  const mainClasses = computed(() => ['content-main', props.mainClass])
  const getMainPositionIndex = position => {
    const positions = ['left', 'center', 'right']
    const positionValue = positions.includes(position) ? position : 'center'
    return positions.findIndex(p => p === positionValue)
  }
  const getContainerStyles = () => {
    const {
      hasHeader,
      hasPrimaryAside,
      hasSecondaryAside,
      hasFooter
    } = useSlots(slots)

    const mainPositionIndex = getMainPositionIndex(props.mainPosition)

    // grid-template-columns
    const columns = [
      conditionValue(hasPrimaryAside, cssValue(props.primaryAsideWidth)),
      conditionValue(hasSecondaryAside, cssValue(props.secondaryAsideWidth))
    ]
    columns.splice(mainPositionIndex, 0, 'auto')

    const columnCount = onlyAvailable(columns).length
    // grid-template-rows
    const rows = [
      conditionValue(hasHeader, cssValue(props.headerHeight)),
      'auto',
      conditionValue(hasFooter, cssValue(props.footerHeight))
    ]
    // grid-template-areas
    const headerRow = Array(columnCount).fill(HEADER)
    const footerRow = Array(columnCount).fill(FOOTER)
    const mainRow = [
      conditionValue(hasPrimaryAside, ASIDE_PRIMARY),
      conditionValue(hasSecondaryAside, ASIDE_SECONDARY)
    ]
    mainRow.splice(mainPositionIndex, 0, MAIN)

    const areas = [mainRow]
    if (hasHeader) areas.unshift(headerRow)
    if (hasFooter) areas.push(footerRow)
    const parseAreaRow = row => `"${onlyAvailable(row).join(' ')}"`

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
