import { computed } from 'vue'

export function mergeProps (props) {
  return {
    width: {
      type: [String, Number],
      default: '100vw'
    },
    height: {
      type: [String, Number],
      default: '100vh'
    },
    headerHeight: {
      type: Number,
      default: 60
    },
    breadcrumbHeight: {
      type: Number,
      default: 60
    },
    footerHeight: {
      type: Number,
      default: 60
    },
    // Aside collapse state
    collapse: {
      type: Boolean,
      default: false
    },
    asideWidth: {
      type: Number,
      default: 260
    },
    // The width of the collapsed sidebar
    asideCollapseWidth: {
      type: Number,
      default: 70
    },
    // Main content margin space
    contentMargin: {
      type: Number,
      default: 4,
      validator: function (val) {
        return val >= 0 && val <= 5
      }
    },
    // Main content area border rounded
    contentRounded: {
      type: Boolean,
      default: false
    },
    contentGrayBackground: {
      type: Boolean,
      default: true
    },
    // Main content area display shadow
    contentShadow: {
      type: Boolean,
      default: true
    },
    ...props
  }
}

export function useAdmin (props) {
  // 内容区域主容器样式
  const contentMainClass = computed(() => {
    const classes = ['admin-main', 'overflow-auto']
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
  const asideCurrentWidth = computed(() => {
    return props.collapse ? props.asideCollapseWidth : props.asideWidth
  })

  return {
    contentMainClass,
    contentContainerClass,
    asideCurrentWidth
  }
}
