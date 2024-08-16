// import { computed } from 'vue'

// import { ASIDE_POSITION_LEFT } from '../constants'

export function mergeProps (props) {
  return {
    width: { type: [String, Number], default: '100vw' },
    height: { type: [String, Number], default: '100vh' },
    headerHeight: { type: [String, Number], default: 60 },
    footerHeight: { type: [String, Number], default: 60 },
    mainClass: { type: [String, Object, Array], default: '' },
    ...props
  }
}

export function useLayout (props, slots) {
  return {
  }
}
// Call in render function
export function useSlots (slots) {
  return {
    hasHeader: slots.header,
    hasAside: slots.aside,
    hasPrimaryAside: slots.primaryAside,
    hasSecondaryAside: slots.secondaryAside,
    hasBreadcrumb: slots.breadcrumb,
    hasFooter: slots.footer
  }
}
