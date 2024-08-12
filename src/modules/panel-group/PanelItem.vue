<template>
  <div :class="['panel-item', { 'panel-item--collapsed': panel.collapse }]">
    <!-- Panel header -->
    <div
      class="panel-item__header"
      v-if="hasHeader"
    >
      <slot
        name="header"
        :collapse="panel.collapse"
      />

      <PanelSwitcher
        :collapse="panel.collapse"
        :class="switcherClass"
        :disabled="switcherDisabled"
        @change="changeCollapse"
        v-if="switcher"
      />
    </div>

    <!-- Panel body -->
    <div
      v-if="!panel.collapse"
      class="panel-item__body"
    >
      <slot :collapse="panel.collapse" />
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onUnmounted, useSlots } from 'vue'

import PanelSwitcher from './PanelSwitcher.vue'

import { panelGroupInjectKey } from './panel-group'

const props = defineProps({
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  switcher: { type: Boolean, default: true },
  switcherClass: { type: String, default: '' }
})
const emit = defineEmits(['change'])
const slots = useSlots()

const { createPanel } = inject(panelGroupInjectKey)
const { panel, switcherDisabled, destroy, setCollapse } = createPanel(props.name)
const hasHeader = computed(() => !!slots.header)

function changeCollapse (collapse) {
  setCollapse(collapse)
  emit('change', collapse)
}

onUnmounted(() => destroy())
</script>
