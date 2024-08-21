import {
  AllowedComponentProps,
  ComponentCustomProps,
  VNodeProps,
  VNode
} from 'vue'
import { LayoutBaseProps, CssValue } from './base'

declare interface AdminClassicProps extends LayoutBaseProps {
  /**
   * Breadcrumb height
   * @default 60
   */
  breadcrumbHeight?: CssValue
  /**
   * Aside width
   * @default 260
   */
  asideWidth?: CssValue
  /**
   * Aside position
   */
  asidePosition?: 'left' | 'right'
  /**
   * Aside full height
   * @default false
   */
  asideFullHeight?: boolean
}

declare interface LayoutAdminClassic {
  new (): {
    $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & AdminClassicProps
    $slots: {
      default?: () => VNode[]
      header?: () => VNode[]
      aside?: () => VNode[]
      breadcrumb?: () => VNode[]
      footer?: () => VNode[]
    }
  }
}
export declare const LayoutAdminClassic: LayoutAdminClassic
