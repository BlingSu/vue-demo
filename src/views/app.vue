<template>
  <router-view></router-view>
</template>

<script>
import  store  from '../store'
export default {
  name: 'myApp',
  created() {
    console.log(`app.vue init !!!`)
  }
}
</script>