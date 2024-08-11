import { ref, computed, watchEffect } from 'vue'

import { cssValue } from '../../helper'

export const panelGroupInjectKey = Symbol('panel-group')
export const panelItemInjectKey = Symbol('panel-item')

export function usePanelGroup (props, emit) {
  const panels = ref([])
  let sequence = 0

  const panelCount = computed(() => panels.value.length)
  const openedPanelCount = computed(() => panels.value.filter(panel => !panel.collapse).length)
  const gridTemplateRows = computed(() => (
    panels.value.map(val => val.collapse ? 'auto' : '1fr').join(' ')
  ))
  const groupStyles = computed(() => ({
    width: cssValue(props.width),
    height: cssValue(props.height),
    'grid-template-rows': gridTemplateRows.value,
    'row-gap': props.gap
  }))
  const activePanels = computed({
    get () {
      return panels.value.filter(panel => !panel.collapse).map(val => val.name)
    },
    set (val) {
      if (!Array.isArray(val)) return

      panels.value.forEach(panel => { panel.collapse = !val.includes(panel.name) })
    }
  })

  function createPanel (name) {
    // increment
    const data = {
      id: ++sequence,
      collapse: false,
      name
    }
    panels.value.push(data)

    return computed(() => panels.value.find(panel => panel.id === data.id))
  }
  function removePanel (id) {
    panels.value = panels.value.filter(panel => panel.id !== id)
  }
  function setCollapse (id, val) {
    const index = panels.value.findIndex(panel => panel.id === id)
    if (index !== -1) {
      panels.value[index].collapse = val
    }
    emit('update:modelValue', activePanels.value)
  }

  watchEffect(() => { activePanels.value = props.modelValue })

  return {
    panels,
    activePanels,
    panelCount,
    openedPanelCount,
    groupStyles,

    setCollapse,
    createPanel,
    removePanel
  }
}
