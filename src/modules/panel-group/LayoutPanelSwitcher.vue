<template>
  <div
    class="panel-item-switcher"
    :class="classes"
    @click="change"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-caret-down-fill"
      viewBox="0 0 16 16"
      :style="styles"
    >
      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['input'])

const classes = computed(() => {
  return props.disabled ? 'text-secondary text-opacity-25' : 'text-dark'
})
const styles = computed(() => ({
  transform: props.value ? 'rotate(180deg)' : ''
}))

function change () {
  if (props.disabled) return
  emit('input', !props.value)
}
</script>
