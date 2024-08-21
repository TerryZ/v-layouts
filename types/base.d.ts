import { StyleValue } from 'vue'

export declare type CssValue = string | number

export declare interface LayoutBaseProps {
  /**
   * Layout container width
   * @default `100vw`
   */
  width?: CssValue
  /**
   * Layout container height
   * @default `100vh`
   */
  height?: CssValue
  /**
   * Header height
   * @default 60
   */
  headerHeight?: CssValue
  /**
   * Footer height
   * @default 60
   */
  footerHeight?: CssValue
  /**
   * Main container custom classes
   */
  mainClass?: StyleValue
}
