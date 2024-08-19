<template>
  <PanelItem name="item1">
    <template
      #header
      v-if="header"
    >
      panel item 1 header
    </template>
    panel item 1
  </PanelItem>

  <PanelItem name="item2">
    <template
      #header
      v-if="header"
    >
      panel item 2 header
    </template>
    panel item 2
  </PanelItem>

  <PanelItem name="item3">
    <template
      #header
      v-if="header"
    >
      panel item 3 header
    </template>
    panel item 3
  </PanelItem>
</template>

<script setup>
// import { ref } from 'vue'
import { PanelItem } from '@/'

defineProps({
  header: { type: Boolean, default: true }
})
</script>
