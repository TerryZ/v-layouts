<template>
  <div>
    <div>Admin classic</div>
    <div>
      <LayoutAdminClassic>
        <template #aside>
          <div>aside</div>
        </template>
        <div>main</div>
      </LayoutAdminClassic>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import { LayoutAdminClassic } from '@/'
</script>
