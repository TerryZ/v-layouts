import { computed } from 'vue'

// import { cssValue } from '../helper'
import { ASIDE_POSITION_LEFT } from '../constants'
import { mergeProps } from '../layout-base'

export function adminClassicProps () {
  return mergeProps({
    breadcrumbHeight: { type: [String, Number], default: 60 },
    asideWidth: { type: [String, Number], default: 260 },
    asidePosition: { type: String, default: 'left' },
    asideFullHeight: { type: Boolean, default: false }
  })
}

export function useAdmin (props, slots) {
  const mainClasses = computed(() => {
    return ['admin-main', props.mainClass]
  })

  // sidebar in left by default
  const applyAsideDirection = rowAreas => (
    props.asidePosition === ASIDE_POSITION_LEFT
      ? rowAreas
      : rowAreas.reverse()
  )

  return {
    mainClasses,
    applyAsideDirection
  }
}
