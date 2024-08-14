import { computed } from 'vue'

import { cssValue } from '../helper'

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
    // Main content margin space
    contentMargin: {
      type: Number,
      default: 4,
      validator: val => (val >= 0 && val <= 5)
    },
    // Main content area border rounded
    contentRounded: { type: Boolean, default: false },
    contentGrayBackground: { type: Boolean, default: true },
    // Main content area display shadow
    contentShadow: { type: Boolean, default: true },
    ...props
  }
}

export function useAdmin (props, slots) {
  // 内容区域主容器样式
  const contentMainClass = computed(() => {
    const classes = ['admin-main']
    // 容器与内容区域之间的间隔
    classes.push(`p-${props.contentMargin}`)
    classes.push(props.contentGrayBackground ? 'bg-light-gray' : 'bg-white')
    return classes.join(' ')
  })
  // 内容区域子容器样式
  const contentContainerClass = computed(() => {
    const classes = ['admin-main-container', 'w-100', 'h-100', 'bg-white']
    if (props.contentRounded) {
      classes.push('rounded')
    }
    if (props.contentShadow) {
      classes.push('shadow')
    }
    return classes.join(' ')
  })

  const hasHeader = computed(() => Object.hasOwn(slots, 'header'))
  const hasAside = computed(() => Object.hasOwn(slots, 'aside'))
  const hasBreadcrumb = computed(() => Object.hasOwn(slots, 'breadcrumb'))
  const hasFooter = computed(() => Object.hasOwn(slots, 'footer'))
  const asideSize = computed(() => (
    hasAside.value
      ? cssValue(
        props.collapse ? props.asideCollapsedWidth : props.asideWidth
      )
      : ''
  ))

  return {
    hasHeader,
    hasAside,
    hasBreadcrumb,
    hasFooter,
    asideSize,
    contentMainClass,
    contentContainerClass
  }
}
