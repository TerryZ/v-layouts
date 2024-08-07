<template>
  <div>
    <h4 class="mb-3">
      Admin classic layout
    </h4>
    <div>
      <LayoutAdminClassic
        :width="800"
        :height="500"
      >
        <!-- <template #header>
          <div class="bg-primary h-100 w-100">
            header
          </div>
        </template> -->
        <template #aside>
          <div class="bg-warning h-100 w-100">
            aside
          </div>
        </template>
        <!-- <template #breadcrumb>
          <div class="bg-success h-100 w-100">
            breadcrumb
          </div>
        </template> -->
        <template #footer>
          <div class="bg-danger h-100 w-100">
            footer
          </div>
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
