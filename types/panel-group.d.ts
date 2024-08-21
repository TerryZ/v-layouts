import {
  AllowedComponentProps,
  ComponentCustomProps,
  VNodeProps,
  VNode
} from 'vue'
import { CssValue } from './base'

declare interface PanelGroupProps {
  /**
   * Activated panel item names
   */
  modelValue?: string[]
  /**
   * @default `auto`
   */
  width?: CssValue
  /**
   * @default `100%`
   */
  height?: CssValue
  /**
   * Panel spacing
   * @default `1rem`
   */
  gap?: CssValue
  /**
   * Whether to allow multiple panels to be expanded at the same time
   * @default true
   */
  accordion?: boolean
}

declare interface PanelGroup {
  new (): {
    $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & PanelGroupProps
    $emit: (event: 'update:modelValue', value: string[]) => void
    $slots: {
      default?: () => VNode[]
    }
  }
}
export declare const PanelGroup: PanelGroup

declare interface PanelItemProps {
  /**
   * Panel item name
   */
  name?: string
  /**
   * Panel content collapse switcher
   * @default true
   */
  switcher?: boolean
  /**
   * Switcher custom class
   */
  switcherClass?: string
  /**
   * @default false
   */
  destroyOnCollapse?: boolean
}

declare interface PanelItem {
  new (): {
    $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & PanelItemProps
    $emit: (event: 'change', value: boolean) => void
    $slots: {
      default?: () => VNode[]
      header?: () => VNode[]
    }
  }
}
export declare const PanelItem: PanelItem
