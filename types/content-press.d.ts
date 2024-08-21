import {
  AllowedComponentProps,
  ComponentCustomProps,
  VNodeProps,
  VNode
} from 'vue'
import { LayoutBaseProps, CssValue } from './base'

declare interface ContentPressProps extends LayoutBaseProps {
  /**
   * Primary aside width
   * @default 260
   */
  primaryAsideWidth?: CssValue
  /**
   * Secondary aside width
   * @default 260
   */
  secondaryAsideWidth?: CssValue
  /**
   * Main container position
   * @default `center
   */
  mainPosition?: 'left' | 'center' | 'right'
}

declare interface LayoutContentPress {
  new (): {
    $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & ContentPressProps
    $slots: {
      default?: () => VNode[]
      header?: () => VNode[]
      primaryAside?: () => VNode[]
      secondaryAside?: () => VNode[]
      footer?: () => VNode[]
    }
  }
}
export declare const LayoutContentPress: LayoutContentPress
