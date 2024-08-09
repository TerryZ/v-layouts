# 面板布局

区域面板布局（纵向）

## 实例

```vue
<template>
  <LayoutPanelGroup v-model="activeItems">
    <LayoutPanelItem
      name="panel1"
      title="标题栏文本内容"
    >
      <div>内容</div>
    </LayoutPanelItem>

    <LayoutPanelItem name="panel2">
      <template #header>
        <h3>标题栏文本</h3>
      </template>
      <div>内容</div>
    </LayoutPanelItem>
  </LayoutPanelGroup>
</template>

<script setup>
import { ref } from 'vue'
import LayoutPanelGroup from '@/layout/components/LayoutPanelGroup.vue'
import LayoutPanelItem from '@/layout/components/LayoutPanelItem.vue'

const activeItems = ref(['panel1', 'panel2'])
</script>
```

通过设置 `activeItems` 数据中的值，来设置面板初始化打开和收起状态

## 设置

### LayoutPanelGroup

面板容器

#### v-model/value(string[])

设置一个数组，指定容器内面板的初始打开 / 关闭状态

> 如果没有控制打开 / 收起的需求，不需要设置 `v-model`

#### gap(string)

指定容器内各面板间的间距，默认值为 `1rem`

### LayoutPanelItem

内容面板

#### name(string)

指定面板的名称，主容器将根据该名称设置面板的打开 / 收起状态

#### title(string)

如果标题栏仅为文本内容，仅指定 `title` prop 即可应用预设的标题栏模块，有内容定制需求的，使用 `#header` 插槽

#### switcher(boolean)

设置内容面板在是否设置切换开关，用于切换面板的打开和收起状态

## 待办

- [x] 最后一个打开的面板不允许被收起
- [ ] asdf
