<template>
  <div>
    <h4 class="mb-3">
      Admin classic layout
    </h4>
    <div class="mb-3">
      Toggle visible
      <button
        type="button"
        class="btn btn-dark mx-3"
        @click="header = !header"
      >
        close header
      </button>
      <button
        type="button"
        class="btn btn-dark me-3"
        @click="aside = !aside"
      >
        close aside
      </button>
      <button
        type="button"
        class="btn btn-dark me-3"
        @click="breadcrumb = !breadcrumb"
      >
        close breadcrumb
      </button>
      <button
        type="button"
        class="btn btn-dark me-3"
        @click="footer = !footer"
      >
        close footer
      </button>
    </div>
    <div class="mb-3">
      <LayoutAdminClassic
        :width="800"
        :height="500"
        :collapse="collapse"
        :aside-collapsed-width="70"
      >
        <template
          #header
          v-if="header"
        >
          <div class="bg-primary text-white h-100 w-100">
            header
          </div>
        </template>
        <template
          #aside
          v-if="aside"
        >
          <div class="bg-warning h-100 w-100">
            aside
          </div>
        </template>
        <template
          #breadcrumb
          v-if="breadcrumb"
        >
          <div class="bg-success text-white h-100 w-100">
            breadcrumb
          </div>
        </template>
        <template
          #footer
          v-if="footer"
        >
          <div class="bg-danger text-white h-100 w-100">
            footer
          </div>
        </template>

        <div>
          main
          <div style="height: 600px;" />
        </div>
      </LayoutAdminClassic>
    </div>
    <div class="mb-3">
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

    <h4 class="mb-3">
      Aside full height
    </h4>

    <div class="">
      <LayoutAdminClassic
        :width="800"
        :height="500"
        :collapse="collapse"
        :aside-collapsed-width="70"
        aside-full-height
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

const header = ref(true)
const aside = ref(true)
const breadcrumb = ref(true)
const footer = ref(true)
</script>
