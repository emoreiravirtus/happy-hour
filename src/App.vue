<template>
  <!-- App Wrapper -->
  <div id="app">
    <!-- Navbar -->
    <navbar v-if="user"></navbar>
    <!-- Router-view -->
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components:{
    Navbar
  },
  computed:{
    user(){
      return this.$store.getters["user/user"]
    }
  },
  async created(){
      await this.$store.dispatch("user/listenUserData")
  },
}
</script>

<style>
body{
  background-color: #fafafa;  
}
</style>
