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
        title="Exit fullscreen preview"
        style="width: 60px;height: 60px;top: 2rem;right:2rem;cursor: pointer;"
        @click="emit('exit')"
      >
        x
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const emit = defineEmits(['exit'])
</script>
