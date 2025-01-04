import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import CityView from '@/views/CityView.vue'

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/weather/:state?/:city",
    name: "cityView",
    component: CityView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
