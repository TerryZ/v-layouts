import { computed } from 'vue'

// import { cssValue } from '../helper'
import { ASIDE_POSITION_LEFT } from '../constants'

export function mergeProps (props) {
  return {
    width: { type: [String, Number], default: '100vw' },
    height: { type: [String, Number], default: '100vh' },
    headerHeight: { type: [String, Number], default: 60 },
    breadcrumbHeight: { type: [String, Number], default: 60 },
    footerHeight: { type: [String, Number], default: 60 },
    // Aside collapse state
    collapse: { type: Boolean, default: false },
    asideWidth: { type: [String, Number], default: 260 },
    // The width of the collapsed sidebar
    asideCollapsedWidth: { type: [String, Number], default: 70 },
    asidePosition: { type: String, default: 'left' },
    asideFullHeight: { type: Boolean, default: false },
    mainClass: { type: [String, Object, Array], default: '' },
    ...props
  }
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
