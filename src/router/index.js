import { createRouter, createWebHashHistory } from 'vue-router'

export const constantRoutes = []

const router = createRouter(
  {
    history: createWebHashHistory(),
    routes: constantRoutes,
    scrollBehavior: () => ({ left: 0, top: 0 })
  }
)


export default router