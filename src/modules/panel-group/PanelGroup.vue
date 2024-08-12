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
   * Whether to allow multiple panels to be expanded at the same time
   */
  accordion: { type: Boolean, default: true }
})
const emit = defineEmits(['update:modelValue'])

const { groupStyles, createPanel } = usePanelGroup(props, emit)

provide(panelGroupInjectKey, { createPanel })
</script>
