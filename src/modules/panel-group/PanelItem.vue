<template>
  <div :class="['panel-item', { 'panel-item--collapsed': panel.collapse }]">
    <div
      class="panel-item__header"
      v-if="$slots.header"
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

    <div
      v-if="bodyIf"
      v-show="bodyShow"
      class="panel-item__body"
    >
      <slot :collapse="panel.collapse" />
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onUnmounted } from 'vue'

import PanelSwitcher from './PanelSwitcher.vue'

import { panelGroupInjectKey } from './panel-group'

const props = defineProps({
  name: { type: String, default: '' },
  switcher: { type: Boolean, default: true },
  switcherClass: { type: String, default: '' },
  destroyOnCollapse: { type: Boolean, default: false }
})
const emit = defineEmits(['change'])

const { createPanel } = inject(panelGroupInjectKey)
const { panel, switcherDisabled, destroy, setCollapse } = createPanel(props.name)

const bodyIf = computed(() => (
  props.destroyOnCollapse ? !panel.value.collapse : true
))
const bodyShow = computed(() => (
  props.destroyOnCollapse ? true : !panel.value.collapse
))

function changeCollapse (collapse) {
  setCollapse(collapse)
  emit('change', collapse)
}

onUnmounted(() => destroy())
</script>
