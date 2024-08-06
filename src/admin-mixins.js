export default {
  props: {
    // 收起侧边栏（侧边栏最小化）
    collapse: {
      type: Boolean,
      default: false
    },
    // 头部区域高度
    headerHeight: {
      type: Number,
      default: 60
    },
    // 面包屑区域高度
    breadcrumbHeight: {
      type: Number,
      default: 60
    },
    // 侧边栏宽度
    asideWidth: {
      type: Number,
      default: 260
    },
    // 侧边栏收起（最小化）后的宽度
    asideCollapseWidth: {
      type: Number,
      default: 70
    },
    // 内容区域间距
    contentMargin: {
      type: Number,
      default: 4,
      validator: function (val) {
        return val >= 0 && val <= 5
      }
    },
    // 内容区域是否设置圆角
    contentRounded: {
      type: Boolean,
      default: false
    },
    // 内容间距区是否使用灰色背景色
    contentGrayBackground: {
      type: Boolean,
      default: true
    },
    // 内容区域是否使用阴影
    contentShadow: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 内容区域主容器样式
    contentMainClass () {
      const classes = ['admin-main', 'overflow-auto']
      // 容器与内容区域之间的间隔
      classes.push(`p-${this.contentMargin}`)
      classes.push(this.contentGrayBackground ? 'bg-light-gray' : 'bg-white')
      return classes.join(' ')
    },
    // 内容区域子容器样式
    contentContainerClass () {
      const classes = ['admin-main-container', 'w-100', 'h-100', 'bg-white']
      if (this.contentRounded) {
        classes.push('rounded')
      }
      if (this.contentShadow) {
        classes.push('shadow')
      }
      return classes.join(' ')
    },
    asideCurrentWidth () {
      return this.collapse ? this.asideCollapseWidth : this.asideWidth
    }
  },
  methods: {
    buildSlot (name) {
      return name in this.$scopedSlots ? this.$scopedSlots[name]() : undefined
    }
  }
}
