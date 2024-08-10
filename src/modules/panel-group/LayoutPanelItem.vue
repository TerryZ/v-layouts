<template>
  <div
    class="panel-item rounded-3 overflow-hidden d-flex flex-column transition-all"
    :class="classes"
  >
    <!-- 头部区域 -->
    <div class="d-flex justify-content-between align-items-center">
      <slot
        name="header"
        :collapse="states.collapse"
      >
        <div
          class="m-0 py-3 ps-3 lh-1 fs-5 fw-semibold text-opacity-75 transition-all"
          :class="headerClasses"
          v-text="title"
        />
      </slot>

      <LayoutPanelSwitcher
        :value="states.collapse"
        :class="switcherClass"
        :disabled="switcherDisabled"
        @input="switchPanelCollapse"
        v-if="switcher"
      />
    </div>

    <!-- 内容区域 -->
    <div
      v-if="!states.collapse"
      class="flex-grow-1 overflow-auto"
    >
      <slot :collapse="states.collapse" />
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onUnmounted } from 'vue'

import { panelGroupInjectKey } from './panel-group'

import LayoutPanelSwitcher from './LayoutPanelSwitcher.vue'

const props = defineProps({
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  /** 是否显示面板切换器 */
  switcher: { type: Boolean, default: true },
  switcherClass: { type: String, default: '' }
})

const {
  panelCount,
  openedPanelCount,
  createPanel,
  setCollapse,
  removePanel
} = inject(panelGroupInjectKey)

const states = createPanel(props.name)

const classes = computed(() => {
  return states.value.collapse
    ? 'bg-light'
    : 'bg-white shadow-sm-dark'
})
const headerClasses = computed(() => {
  return states.value.collapse
    ? 'text-secondary'
    : 'text-dark'
})
const switcherDisabled = computed(() => {
  if (panelCount.value === 0) return true
  return openedPanelCount.value === 1 && !states.value.collapse
})

function switchPanelCollapse (state) {
  setCollapse(states.value.id, state)
}

onUnmounted(() => removePanel(states.value.id))
</script>
