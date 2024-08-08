<template>
  <Teleport to="body">
    <div class="position-fixed top-0 start-0 bg-white">
      <slot />
      <div
        class="
        shadow bg-white rounded-circle
        d-flex justify-content-center align-items-center
        position-fixed
      "
        style="width: 60px;height: 60px;bottom: 2rem;right:2rem;"
        @click="emit('exit')"
      >
        x
      </div>
    </div>
  </Teleport>
</template>

<script setup>
// import { ref } from 'vue'
const emit = defineEmits(['exit'])
</script>
