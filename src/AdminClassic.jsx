import './layout.sass'

import { defineComponent } from 'vue'
import { mergeProps, useAdmin } from './admin-base'
/**
 * Admin platform standard layout
 *
 * |---------------------------------|
 * | Header                          |
 * |---------------------------------|
 * | Menu  | Breadcrumb              |
 * |       |-------------------------|
 * |       | Main Content            |
 * |       |                         |
 * |       |                         |
 * |---------------------------------|
 */
export default defineComponent({
  name: 'AdminClassic',
  props: mergeProps(),
  setup (props, { slots }) {
    const {
      contentMainClass,
      contentContainerClass
    } = useAdmin(props)
    const buildContent = () => {
      // 外部应用的具名插槽集
      const content = []
      // Breadcrumb bar
      if ('breadcrumb' in slots) {
        content.push(
          <div
            class='admin-breadcrumb'
            style={{ height: `${props.breadcrumbHeight}px` }}
          >
            {slots.breadcrumb?.()}
          </div>
        )
      }
      // 内容容器的其他所有兄弟容器的总高度
      let siblingsHeight = props.headerHeight
      if ('breadcrumb' in slots) {
        siblingsHeight += props.breadcrumbHeight
      }

      // Content main area
      content.push(
        <div
          class={contentMainClass.value}
          style={{ height: `calc(100vh - ${siblingsHeight}px)` }}
        >
          <div class={contentContainerClass.value}>
            {slots.default?.()}
          </div>
        </div>
      )

      return content
    }

    return () => (
      // Main container
      <div class='admin-layout vw-100 vh-100 d-flex flex-column overflow-hidden'>
        <div
          class='admin-header d-flex align-items-center'
          style={{ height: `${props.headerHeight}px` }}
        >
          {slots.header?.()}
        </div>

        <div class='flex-grow-1 d-flex overflow-hidden'>
          <div
            class='admin-menu flex-shrink-0'
            style={{
              width: `${props.asideWidth}px`,
              height: `calc(100vh - ${props.headerHeight}px)`
            }}
          >
            {slots.aside?.()}
          </div>

          <div
            class='d-flex flex-column flex-grow-1'
            style={{ width: `calc(100vw - ${props.asideWidth}px)` }}
          >
            {buildContent()}
          </div>
        </div>
      </div>
    )
  }
})
