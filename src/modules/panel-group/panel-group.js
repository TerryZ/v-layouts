import { ref, computed, watchEffect } from 'vue'

import { cssValue } from '../../helper'

export const panelGroupInjectKey = Symbol('panel-group')

export function usePanelGroup (props, emit) {
  const panels = ref([])
  let sequence = 0

  const openedPanels = computed(() => panels.value.filter(panel => !panel.collapse))
  const groupStyles = computed(() => ({
    width: cssValue(props.width),
    height: cssValue(props.height),
    'grid-template-rows': panels.value.map(val => val.collapse ? 'auto' : '1fr').join(' '),
    'row-gap': cssValue(props.gap)
  }))
  const activePanels = computed({
    get: () => openedPanels.value.map(val => val.name),
    set (val) {
      if (!Array.isArray(val) || !val.length) return

      const active = props.accordion ? val[0] : val
      panels.value.forEach(panel => { panel.collapse = !active.includes(panel.name) })
    }
  })

  const createPanel = name => {
    const id = ++sequence // increment
    // In accordion mode, only one panel can be opened at a time
    const collapse = !!(props.accordion && !props.modelValue && panels.value.length)

    panels.value.push({ id, name, collapse })

    const panel = computed(() => panels.value.find(panel => panel.id === id))

    return {
      panel,
      switcherDisabled: computed(() => (
        openedPanels.value.length === 1 && !panel.value.collapse
      )),
      destroy: () => (
        panels.value = panels.value.filter(panel => panel.id !== id)
      ),
      setCollapse: val => {
        const panel = panels.value.find(panel => panel.id === id)
        // close all panels before open in accordion mode
        if (props.accordion) {
          panels.value.forEach(panel => { panel.collapse = true })
        }
        panel && (panel.collapse = val)
        emit('update:modelValue', activePanels.value)
      }
    }
  }

  watchEffect(() => { activePanels.value = props.modelValue })

  return {
    panels,
    activePanels,
    groupStyles,

    createPanel
  }
}
