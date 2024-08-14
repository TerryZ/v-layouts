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
      <div class="me-5">
        <h4>Set active panels</h4>
        <div
          class=""
          style="width: 250px;height: 500px;"
        >
          <PanelGroup v-model="activeItems">
            <PanelItem
              name="panel1"
              class="border"
            >
              <template #header>
                <h3 class="m-0">
                  标题栏1
                </h3>
              </template>
              <div style="height: 500px;">
                内容
              </div>
            </PanelItem>
            <PanelItem
              name="panel2"
              class="border"
            >
              <template #header>
                <h3 class="m-0">
                  标题栏2
                </h3>
              </template>
              <div style="height: 500px;">
                内容
              </div>
            </PanelItem>
            <PanelItem
              name="panel3"
              class="border"
              v-if="panel3Visible"
            >
              <template #header>
                <h3 class="m-0">
                  标题栏3
                </h3>
              </template>
              <div style="height: 500px;">
                内容
              </div>
            </PanelItem>
          </PanelGroup>
        </div>
      </div>

      <div class="me-5">
        <h4>Single panel expansion</h4>
        <div
          class=""
          style="width: 250px;height: 500px;"
        >
          <PanelGroup :accordion="false">
            <PanelItem
              name="panel1"
              class="border"
            >
              <template #header>
                <h3 class="m-0">
                  标题栏文本
                </h3>
              </template>
              <div>内容</div>
            </PanelItem>
            <PanelItem
              name="panel2"
              class="border"
              destroy-on-collapse
            >
              <template #header>
                <h3 class="m-0 py-3 ps-3 lh-1 fs-5 fw-semibold text-opacity-75">
                  标题栏文本
                </h3>
              </template>
              <div>内容</div>
            </PanelItem>
            <PanelItem
              name="panel3"
              class="border"
              v-if="panel3Visible"
            >
              <template #header>
                <h3 class="m-0">
                  标题栏文本
                </h3>
              </template>
              <div>内容</div>
            </PanelItem>
          </PanelGroup>
        </div>
      </div>

      <div class="">
        <h4>No header</h4>
        <div
          class=""
          style="width: 250px;height: 500px;"
        >
          <PanelGroup>
            <PanelItem
              name="panel1"
              class="border"
            >
              <div>内容</div>
            </PanelItem>
            <PanelItem
              name="panel2"
              class="border"
            >
              <div>内容</div>
            </PanelItem>
            <PanelItem
              name="panel3"
              class="border"
              v-if="panel3Visible"
            >
              <div>内容</div>
            </PanelItem>
          </PanelGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  PanelGroup,
  PanelItem
} from '@/'

const activeItems = ref(['panel2'])
const panel3Visible = ref(true)
</script>
