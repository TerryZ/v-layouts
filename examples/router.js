import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('./ExamplesIndex.vue'),
    children: [
      { path: '/classic', component: () => import('./ExampleClassic.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export { router }
