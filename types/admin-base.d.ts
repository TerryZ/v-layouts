import { VNode } from 'vue'

export default class AdminBaseLayout {
  /**
   * 收起侧边栏（侧边栏最小化）
   * @default false
   */
  collapse: boolean
  /**
   * 头部区域高度
   * @default 60
   */
  headerHeight: number
  /**
   * 面包屑区域高度
   * @default 60
   */
  breadcrumbHeight: number
  /**
   * 侧边栏宽度
   * @default 260
   */
  asideWidth: number
  /**
   * 侧边栏收起（最小化）后的宽度
   * @default 70
   */
  asideCollapseWidth: number
  /**
   * 内容区域间距
   * @default 4
   * 该参数仅接受 0-5 之间的数字
   */
  contentMargin: number
  /**
   * 内容区域是否设置圆角
   * @default false
   */
  contentRounded: boolean
  /**
   * 内容间距区是否使用灰色背景色
   * @default true
   */
  contentGrayBackground: boolean
  /**
   * 内容区域是否使用阴影
   * @default true
   */
  contentShadow: boolean
  /**
   * slot 插槽对象
   */
  $slots: {
    /**
     * 主内容区域插槽
     */
    '': VNode[]
    /**
     * 头部区域插槽
     */
    header: VNode[]
    /**
     * 侧边栏区域插槽
     */
    menu: VNode[]
    /**
     * 面包屑区域插槽
     */
    breadcrumb: VNode[]
  }
}
