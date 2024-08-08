<template>
  <div class="d-flex vh-100">
    <div
      class="bg-light fw-bold flex-shrink-0"
      style="width: 18rem;"
    >
      <div class="py-4 px-3 d-flex align-items-baseline font-monospace">
        <div class="fs-3 me-2">
          v-layouts
        </div>
        <div class="fs-5 text-muted fw-normal">
          examples
        </div>
      </div>
      <div
        class="px-3 pb-4"
        v-for="item in modules"
        :key="item.key"
      >
        <router-link
          class="nav-link"
          aria-current="page"
          :class="isActive(item)"
          :to="item.url"
          @click="change(item)"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>

    <div class="p-5 flex-grow-1 overflow-auto">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const modules = [
  { key: 'classic', name: 'Admin Classic', url: '/classic' }
]
const active = ref('')

function isActive (item) {
  if (active.value && active.value === item.key) {
    return 'text-dark fw-bold'
  }
  return 'text-secondary text-opacity-50'
}
function change (item) {
  active.value = item.key
}

onBeforeMount(() => {
  const route = useRoute()
  const module = modules.find(val => val.url === route.path)
  if (module) {
    active.value = module.key
  }
})
</script>
