<template>
  <div
    class="h-100 d-grid"
    :style="styles"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, provide, useSlots } from 'vue'

const props = defineProps({
  value: { type: Array, default: undefined },
  /** 间距，默认为 `1rem` */
  gap: { type: String, default: '1rem' }
})

const emit = defineEmits(['input'])
const slots = useSlots()

const gridTemplateRows = ref('')
const openedPanelSize = ref(0)

const styles = computed(() => ({
  'grid-template-rows': gridTemplateRows.value,
  'row-gap': props.gap
}))
const panelSize = computed(() => haveDefaultSlot() ? slots.default().length : 0)
// 考虑使用依赖注入的方式管理子面板的注册，状态，销毁等行为，避免使用 vue 内部对象
const openedPanels = computed(() => {
  if (!haveDefaultSlot()) return []
  return slots.default().filter(val => !val.componentInstance.collapse)
})

watch(
  () => props.value,
  () => {
    // console.log(props.value)
    setupPanelItemsCollapse()
    setupPanelItemsSize()
  },
  { deep: true }
)

function haveDefaultSlot () {
  return Object.hasOwn(slots, 'default')
}
// 根据 v-model 的设置，应用子面板的开关状态
function setupPanelItemsCollapse () {
  if (!props.value) return
  if (!haveDefaultSlot()) return

  slots.default().forEach(item => {
    const name = item.componentInstance.name
    item.componentInstance.setCollapse(!props.value.includes(name))
  })
}
// 根据子面板的开关状态，设置面板的缩放比例
function setupPanelItemsSize () {
  if (!haveDefaultSlot()) {
    gridTemplateRows.value = ''
    openedPanelSize.value = 0
    return
  }

  gridTemplateRows.value = slots.default()
    .map(val => val.componentInstance?.collapse ? 'auto' : '1fr')
    .join(' ')
  openedPanelSize.value = openedPanels.value.length
}
function switchGroupItemCollapse () {
  if (!haveDefaultSlot()) {
    emit('input', [])
    return
  }

  emit('input', openedPanels.value.map(val => val.componentInstance.name))
  setupPanelItemsSize()
}

onMounted(() => {
  setupPanelItemsCollapse()
  setupPanelItemsSize()
})

provide('switchGroupItemCollapse', switchGroupItemCollapse)
provide('panelSize', panelSize)
provide('openedPanelSize', openedPanelSize)

defineExpose({
  setupPanelItemsSize,
  switchGroupItemCollapse
})
</script>
