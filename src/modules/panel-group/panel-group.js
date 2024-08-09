import { ref } from 'vue'

export function usePanelGroup () {
  const panels = ref([])
  let sequence = 0

  function createPanel () {
    // increment
    const data = {
      id: ++sequence,
      title: 'Panel',
      content: 'Panel content'
    }
    panels.value.push(data)

    return data
  }
  function removePanel (id) {
    panels.value = panels.value.filter(panel => panel.id !== id)
  }

  return {
    panels,
    createPanel,
    removePanel
  }
}
