<template>
  <div class="d-flex vh-100">
    <div
      class="bg-light fw-bold flex-shrink-0"
      style="width: 18rem;"
    >
      <div class="pt-3 pb-4 px-3 d-flex align-items-baseline font-monospace">
        <div class="fs-3 me-2 lh-1">
          v-layouts
        </div>
        <div class="fs-5 text-muted fw-normal lh-1">
          examples
        </div>
      </div>

      <div class="ps-3 py-3">
        <h5>Admin layout modules</h5>
      </div>
      <div
        class="px-3 pb-4"
        v-for="item in adminModules"
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

      <div class="ps-3 py-3">
        <h5>Other layout modules</h5>
      </div>
      <div
        class="px-3 pb-4"
        v-for="item in otherModules"
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

    <div class="p-3 flex-grow-1 overflow-auto">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const adminModules = [
  { key: 'classic', name: 'Admin Classic', url: '/classic' }
]
const otherModules = [
  { key: 'panel-group', name: 'Panel group', url: '/panel-group' }
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
  const allModules = [...adminModules, ...otherModules]
  const module = allModules.find(val => val.url === route.path)
  if (module) {
    active.value = module.key
  }
})
</script>
