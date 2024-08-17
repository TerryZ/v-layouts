<template>
  <LayoutAdminClassic
    aside-width="18rem"
    aside-full-height
  >
    <template #aside>
      <div
        class="bg-light fw-bold h-100"
        style=""
      >
        <div class="pt-3 pb-4 px-3 d-flex align-items-baseline font-monospace">
          <div class="fs-3 me-2 lh-1">
            v-layouts
          </div>
          <div class="fs-5 text-muted fw-normal lh-1">
            examples
          </div>
        </div>

        <div class="ps-3 pt-3">
          <h5 class="m-0">
            layout modules
          </h5>
        </div>
        <hr class="border opacity-50 mx-3">
        <div
          class="px-3 pb-3"
          v-for="item in layoutModules"
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
        <hr class="border opacity-50 mx-3">
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
    </template>

    <div class="p-3">
      <router-view />
    </div>
  </LayoutAdminClassic>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import { LayoutAdminClassic } from '@/'

const layoutModules = [
  { key: 'admin-classic', name: 'Admin Classic', url: '/admin-classic' },
  { key: 'content-press', name: 'Content press', url: '/content-press' }
]
const otherModules = [
  { key: 'panel-group', name: 'Panel group', url: '/panel-group' }
]
const active = ref('')

function isActive (item) {
  if (active.value && active.value === item.key) {
    return 'text-dark fw-bold'
  }
  return 'text-secondary text-opacity-25'
}
function change (item) {
  active.value = item.key
}

onBeforeMount(() => {
  const route = useRoute()
  const allModules = [...layoutModules, ...otherModules]
  const module = allModules.find(val => val.url === route.path)
  if (module) {
    active.value = module.key
  }
})
</script>
