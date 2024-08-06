import AdminBaseLayout from './admin-base'

export module '@framework-core/layout' {
  /**
   * 标准模式管理平台布局
   */
  export class LayoutAdminStandard extends AdminBaseLayout {}
  /**
   * 基于标准管理平台布局，侧边栏独占列模式
   */
  export class LayoutAdminVerticalAside extends AdminBaseLayout {}
}
