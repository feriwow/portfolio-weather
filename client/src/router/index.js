import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import home from "../components/homeWeather.vue"
import login from "../components/loginUser.vue"
import register from "../components/userRegister.vue"
import bucket from "../components/bucketList.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login 
    },
    {
      path: "/register",
      name: "register",
      component: register
    },
    {
      path: "/bucket",
      name: "bucket",
      component: bucket
    }
  ]
})

export default router
