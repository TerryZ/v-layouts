<template>
  <div>
    <h4 class="mb-3">
      Admin classic layout
    </h4>
    <div class="mb-3">
      <LayoutAdminClassic
        :width="800"
        :height="500"
        :collapse="collapse"
        :aside-collapsed-width="70"
      >
        <template #header>
          <div class="bg-primary text-white h-100 w-100">
            header
          </div>
        </template>
        <template #aside>
          <div class="bg-warning h-100 w-100">
            aside
          </div>
        </template>
        <template #breadcrumb>
          <div class="bg-success text-white h-100 w-100">
            breadcrumb
          </div>
        </template>
        <template #footer>
          <div class="bg-danger text-white h-100 w-100">
            footer
          </div>
        </template>

        <div>main</div>
      </LayoutAdminClassic>
    </div>
    <div>
      <button
        type="button"
        class="btn btn-dark me-3"
        @click="collapse = !collapse"
      >
        收起/展开侧边栏
      </button>
      <button
        type="button"
        class="btn btn-dark"
        @click="fullscreen = true"
      >
        全屏预览
      </button>
    </div>

    <FullscreenPreview
      v-if="fullscreen"
      @exit="fullscreen = false"
    >
      <LayoutAdminClassic
        :collapse="collapse"
        :aside-collapsed-width="70"
        aside-position="right"
      >
        <template #header>
          <div class="bg-primary text-white h-100 w-100">
            header
          </div>
        </template>
        <template #aside>
          <div class="bg-warning h-100 w-100">
            aside
          </div>
        </template>
        <template #breadcrumb>
          <div class="bg-success text-white h-100 w-100">
            breadcrumb
          </div>
        </template>
        <template #footer>
          <div class="bg-danger text-white h-100 w-100">
            footer
          </div>
        </template>

        <div>
          main
          <div>
            <button
              type="button"
              class="btn btn-dark me-3"
              @click="collapse = !collapse"
            >
              收起/展开侧边栏
            </button>
          </div>
        </div>
      </LayoutAdminClassic>
    </FullscreenPreview>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FullscreenPreview from './FullscreenPreview.vue'
import { LayoutAdminClassic } from '@/'

const collapse = ref(false)
const fullscreen = ref(false)

</script>
