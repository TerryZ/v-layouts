import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('./ExamplesIndex.vue'),
    children: [
      { path: '/admin-classic', component: () => import('./ExampleAdminClassic.vue') },
      { path: '/content-press', component: () => import('./ExampleContentPress.vue') },
      { path: '/panel-group', component: () => import('./ExamplePanelGroup.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export { router }
