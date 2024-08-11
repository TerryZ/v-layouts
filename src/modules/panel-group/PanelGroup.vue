<template>
  <div
    class="panel-group"
    :style="groupStyles"
  >
    <slot />
  </div>
</template>

<script setup>
import './panel-group.sass'
import { provide } from 'vue'

import { usePanelGroup, panelGroupInjectKey } from './panel-group'

const props = defineProps({
  modelValue: { type: Array, default: undefined },
  width: { type: [String, Number], default: 'auto' },
  height: { type: [String, Number], default: '100%' },
  /** Panel spacing */
  gap: { type: String, default: '1rem' }
})
const emit = defineEmits(['update:modelValue'])

const {
  panelCount,
  openedPanelCount,
  groupStyles,
  createPanel,
  removePanel,
  setCollapse
} = usePanelGroup(props, emit)

provide(panelGroupInjectKey, {
  panelCount,
  openedPanelCount,
  createPanel,
  removePanel,
  setCollapse
})
</script>
