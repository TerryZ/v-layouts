import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('./ExamplesIndex.vue'),
    children: [
      { path: '/classic', component: () => import('./ExampleClassic.vue') },
      { path: '/panel-group', component: () => import('./ExamplePanelGroup.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export { router }
