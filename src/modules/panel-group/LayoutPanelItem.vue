<template>
  <div
    class="rounded-3 overflow-hidden d-flex flex-column transition-all"
    :class="classes"
  >
    <!-- 头部区域 -->
    <div class="d-flex justify-content-between align-items-center">
      <slot
        name="header"
        :collapse="collapse"
      >
        <div
          class="m-0 py-3 ps-3 lh-1 fs-5 fw-semibold text-opacity-75 transition-all"
          :class="headerClasses"
          v-text="title"
        />
      </slot>

      <LayoutPanelSwitcher
        :value="collapse"
        :class="switcherClass"
        :disabled="switcherDisabled"
        @input="switchPanelCollapse"
        v-if="switcher"
      />
    </div>

    <!-- 内容区域 -->
    <div
      v-if="!collapse"
      class="flex-grow-1 overflow-auto"
    >
      <slot :collapse="collapse" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import LayoutPanelSwitcher from './LayoutPanelSwitcher.vue'

const props = defineProps({
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  /** 是否显示面板切换器 */
  switcher: { type: Boolean, default: true },
  switcherClass: { type: String, default: '' }
})

const collapse = ref(false)

const switchGroupItemCollapse = inject('switchGroupItemCollapse')
const panelSize = inject('panelSize')
const openedPanelSize = inject('openedPanelSize')

const classes = computed(() => {
  return collapse.value
    ? 'bg-light'
    : 'bg-white shadow-sm-dark'
})
const headerClasses = computed(() => {
  return collapse.value
    ? 'text-secondary'
    : 'text-dark'
})
const switcherDisabled = computed(() => {
  if (panelSize.value === 0) return true
  return openedPanelSize.value === 1 && !collapse.value
})

function setCollapse (value) {
  collapse.value = value
}
function switchPanelCollapse (state) {
  setCollapse(state)

  switchGroupItemCollapse()
}

defineExpose({
  /** 面板折叠状态 */
  collapse,
  setCollapse,
  name: props.name
})
</script>
