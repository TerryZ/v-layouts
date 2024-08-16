import { mergeProps } from '../layout-base'

export function contentPressProps () {
  return mergeProps({
    primaryAsideWidth: { type: [String, Number], default: 260 },
    primaryAsidePosition: { type: String, default: 'left' },
    primaryAsideFullHeight: { type: Boolean, default: false },
    secondaryAsideWidth: { type: [String, Number], default: 260 },
    secondaryAsidePosition: { type: String, default: 'left' },
    secondaryAsideFullHeight: { type: Boolean, default: false }
  })
}
