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
  gap: { type: [String, Number], default: '1rem' },
  /**
   * Panel group allows all panels to be opened by default
   * set to true, only one panel can be expanded
   */
  accordion: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])

const { groupStyles, createPanel } = usePanelGroup(props, emit)

provide(panelGroupInjectKey, { createPanel })
</script>
