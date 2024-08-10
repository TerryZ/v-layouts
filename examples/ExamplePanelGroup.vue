<template>
  <div>
    <h4>Panel group</h4>
    <div>
      <div class="mb-2">
        active panels: {{ activeItems }}
      </div>
      <div class="mb-3">
        <button
          type="button"
          class="btn btn-dark me-3"
          @click="activeItems = ['panel1']"
        >
          panel1
        </button>
        <button
          type="button"
          class="btn btn-dark me-3"
          @click="activeItems = ['panel2']"
        >
          panel2
        </button>
        <button
          type="button"
          class="btn btn-dark me-3"
          @click="activeItems = ['panel1', 'panel2', 'panel3']"
        >
          both
        </button>
        <button
          type="button"
          class="btn btn-danger"
          @click="panel3Visible = !panel3Visible"
        >
          panel 3 visible
        </button>
      </div>
    </div>
    <div class="d-flex">
      <div
        class=""
        style="width: 300px;height: 500px;"
      >
        <LayoutPanelGroup v-model="activeItems">
          <LayoutPanelItem
            name="panel1"
            title="标题栏文本内容"
            class="border"
          >
            <div>内容</div>
          </LayoutPanelItem>
          <LayoutPanelItem
            name="panel2"
            class="border"
          >
            <template #header>
              <h3>标题栏文本</h3>
            </template>
            <div>内容</div>
          </LayoutPanelItem>
          <LayoutPanelItem
            name="panel3"
            class="border"
            v-if="panel3Visible"
          >
            <template #header>
              <h3>标题栏文本</h3>
            </template>
            <div>内容</div>
          </LayoutPanelItem>
        </LayoutPanelGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  LayoutPanelGroup,
  LayoutPanelItem
  // LayoutPanelSwitcher
} from '@/'

const activeItems = ref(['panel2'])
const panel3Visible = ref(true)
</script>
