<script >
import { RouterView } from 'vue-router'
import navbar from "./components/navBar.vue"
// import HelloWorld from './components/HelloWorld.vue'
export default{
  components:{
    RouterView,
    navbar
  }
}
</script>

<template>

  <navbar :key="$route.fullPath"/>
  <RouterView />
</template>
