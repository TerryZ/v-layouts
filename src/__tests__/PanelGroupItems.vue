<template>
  <PanelGroup>
    <PanelItem
      name="item1"
      :destroy-on-collapse="destroyOnCollapse"
      v-if="item1Visible"
    >
      <template
        #header
        v-if="header"
      >
        panel item 1 header
      </template>
      panel item 1
    </PanelItem>

    <PanelItem
      name="item2"
      :destroy-on-collapse="destroyOnCollapse"
      v-if="item2Visible"
    >
      <template
        #header
        v-if="header"
      >
        panel item 2 header
      </template>
      panel item 2
    </PanelItem>

    <PanelItem
      name="item3"
      :destroy-on-collapse="destroyOnCollapse"
      v-if="item3Visible"
    >
      <template
        #header
        v-if="header"
      >
        panel item 3 header
      </template>
      panel item 3
    </PanelItem>
  </PanelGroup>
</template>

<script setup>
// import { ref } from 'vue'
import { PanelGroup, PanelItem } from '@/'

defineProps({
  item1Visible: { type: Boolean, default: true },
  item2Visible: { type: Boolean, default: true },
  item3Visible: { type: Boolean, default: true },
  header: { type: Boolean, default: true },
  destroyOnCollapse: { type: Boolean, default: false }
})
</script>
