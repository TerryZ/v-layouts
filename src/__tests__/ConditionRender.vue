<template>
  <LayoutAdminClassic>
    <template
      #header
      v-if="header"
    >
      Header
    </template>
    <template
      #aside
      v-if="aside"
    >
      Aside
    </template>
    <template
      #breadcrumb
      v-if="breadcrumb"
    >
      Breadcrumb
    </template>
    <template
      #footer
      v-if="footer"
    >
      Footer
    </template>
    Main Content
  </LayoutAdminClassic>
</template>

<script setup>
import { LayoutAdminClassic } from '@/'

defineProps({
  header: {
    type: Boolean,
    default: true
  },
  aside: {
    type: Boolean,
    default: true
  },
  breadcrumb: {
    type: Boolean,
    default: true
  },
  footer: {
    type: Boolean,
    default: true
  }
})
</script>
