import { createRouter, createWebHashHistory } from 'vue-router'
import Marathon from '../views/Marathon.vue'
import BackNForth from '../views/BackNForth.vue'
import Controller from '../views/Controller.vue'

const routes = [
  {
    path: '/',
    name: 'Marathon',
    component: Marathon
  },
  {
    path: '/BackNForth',
    name: 'BackNForth',
    component: BackNForth
  },
  {
    path: '/Controller',
    name: 'Controller',
    component: Controller
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
