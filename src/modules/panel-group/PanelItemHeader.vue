<template>
  <div class="panel-item__header">
    <slot />

    <PanelSwitcher
      :collapse="panelStates.collapse"
      :class="switcherClass"
      :disabled="switcherDisabled"
      @change="changeCollapse"
      v-if="switcher"
    />
  </div>
</template>

<script setup>
import { inject } from 'vue'

import PanelSwitcher from './PanelSwitcher.vue'

import { panelItemInjectKey } from './panel-group'

defineProps({
  switcher: { type: Boolean, default: true },
  switcherClass: { type: String, default: '' }
})

const { panelStates, changeCollapse, switcherDisabled } = inject(panelItemInjectKey)
</script>
