<template>
  <div>
    <h4 class="mb-3">
      Content press layout
    </h4>
    <div class="mb-3 d-flex">
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
        @click="asidePrimary = !asidePrimary"
      >
        close primary aside
      </button>
      <button
        type="button"
        class="btn btn-dark me-3"
        @click="asideSecondary = !asideSecondary"
      >
        close secondary aside
      </button>
      <button
        type="button"
        class="btn btn-dark me-3"
        @click="footer = !footer"
      >
        close footer
      </button>
      <div style="width: 200px;">
        <select
          class="form-select"
          v-model="mainPosition"
        >
          <option value="left">
            left
          </option>
          <option value="center">
            center
          </option>
          <option value="right">
            right
          </option>
        </select>
      </div>
    </div>
    <div class="mb-3">
      <LayoutContentPress
        :width="800"
        :height="500"
        :aside-width="asideWidth"
        :main-position="mainPosition"
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
          #primaryAside
          v-if="asidePrimary"
        >
          <div class="bg-warning h-100 w-100">
            aside primary
          </div>
        </template>
        <template
          #secondaryAside
          v-if="asideSecondary"
        >
          <div class="bg-success text-white h-100 w-100">
            aside secondary
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
      </LayoutContentPress>
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
      <LayoutContentPress
        :width="800"
        :height="500"
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
      </LayoutContentPress>
    </div>

    <FullscreenPreview
      v-if="fullscreen"
      @exit="fullscreen = false"
    >
      <LayoutContentPress>
        <template #header>
          <div class="bg-primary text-white h-100 w-100">
            header
          </div>
        </template>
        <template #primaryAside>
          <div class="bg-warning h-100 w-100">
            primary aside
          </div>
        </template>
        <template #secondaryAside>
          <div class="bg-success text-white h-100 w-100">
            secondary aside
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
      </LayoutContentPress>
    </FullscreenPreview>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FullscreenPreview from './FullscreenPreview.vue'
import { LayoutContentPress } from '@/'

const collapse = ref(false)
const asideWidth = computed(() => collapse.value ? 70 : 200)
const mainPosition = ref('center')
const fullscreen = ref(false)

const header = ref(true)
const asidePrimary = ref(true)
const asideSecondary = ref(true)
const footer = ref(true)

// function changeAsidePosition () {
//   asidePosition.value = asidePosition.value === 'left' ? 'right' : 'left'
// }
</script>
