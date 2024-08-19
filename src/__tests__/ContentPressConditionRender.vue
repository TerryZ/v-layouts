<template>
  <LayoutContentPress>
    <template
      #header
      v-if="header"
    >
      Header
    </template>
    <template
      #primaryAside
      v-if="primaryAside"
    >
      Primary Aside
    </template>
    <template
      #secondaryAside
      v-if="secondaryAside"
    >
      Secondary Aside
    </template>
    <template
      #footer
      v-if="footer"
    >
      Footer
    </template>
    Main Content
  </LayoutContentPress>
</template>

<script setup>
import { LayoutContentPress } from '@/'

defineProps({
  header: {
    type: Boolean,
    default: true
  },
  primaryAside: {
    type: Boolean,
    default: true
  },
  secondaryAside: {
    type: Boolean,
    default: true
  },
  footer: {
    type: Boolean,
    default: true
  }
})
</script>
