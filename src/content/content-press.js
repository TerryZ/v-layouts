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
    let columns = [
      conditionValue(hasPrimaryAside, cssValue(props.primaryAsideWidth)),
      conditionValue(hasSecondaryAside, cssValue(props.secondaryAsideWidth))
    ]
    columns = columns.toSpliced(mainPositionIndex, 0, 'auto')
    const columnCount = onlyAvailable(columns).length
    // grid-template-rows
    const rows = [
      conditionValue(hasHeader, cssValue(props.headerHeight)),
      'auto',
      conditionValue(hasFooter, cssValue(props.footerHeight))
    ]

    // grid-template-areas
    let mainRow = [
      conditionValue(hasPrimaryAside, ASIDE_PRIMARY),
      conditionValue(hasSecondaryAside, ASIDE_SECONDARY)
    ]
    mainRow = mainRow.toSpliced(mainPositionIndex, 0, MAIN)
    const verifyRow = ([available, ...areaRow]) => available ? areaRow : []
    const areas = [
      [hasHeader, ...Array(columnCount).fill(HEADER)],
      [true, ...mainRow],
      [hasFooter, ...Array(columnCount).fill(FOOTER)]
    ].map(verifyRow).filter(area => area.length)
    const areaRowTransform = areaRow => `"${areaRow.join(' ')}"`

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
