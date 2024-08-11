<template>
  <div :class="['panel-item', { 'panel-item--collapsed': states.collapse }]">
    <!-- Panel header -->
    <!-- <div class="d-flex justify-content-between align-items-center">
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
        :collapse="states.collapse"
        :class="switcherClass"
        :disabled="switcherDisabled"
        @change="switchPanelCollapse"
        v-if="switcher"
      />
    </div> -->
    <slot name="header" />

    <!-- Panel body -->
    <div
      v-if="!states.collapse"
      class="panel-item__body"
    >
      <slot :collapse="states.collapse" />
    </div>
  </div>
</template>

<script setup>
import { computed, provide, inject, onUnmounted } from 'vue'

import { panelGroupInjectKey, panelItemInjectKey } from './panel-group'

const props = defineProps({
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  /** 是否显示面板切换器 */
  switcher: { type: Boolean, default: true },
  switcherClass: { type: String, default: '' }
})
const emit = defineEmits(['change'])

const {
  openedPanelCount,
  createPanel,
  setCollapse,
  removePanel
} = inject(panelGroupInjectKey)

const states = createPanel(props.name)

provide(panelItemInjectKey, {
  panelStates: states,
  changeCollapse: collapse => {
    setCollapse(states.value.id, collapse)
    emit('change', collapse)
  },
  switcherDisabled: computed(() => (
    openedPanelCount.value === 1 && !states.value.collapse
  ))
})

onUnmounted(() => removePanel(states.value.id))
</script>
