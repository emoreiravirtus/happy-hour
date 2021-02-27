<template>
  <!-- App Wrapper -->
  <div id="app">

    <!-- Navbar -->
    <navbar v-if="user"></navbar>

    <!-- Navbar User Name (For Mobile only) -->
    <div v-if="user" class="navbar-mobile-helper container hide-on-large-only">
        <span class="col s12 user-name">Welcome, {{ userData.name.split(' ').slice(0, -1)[0] }}</span>
    </div>
    
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
    },
    userData(){
      return this.$store.getters["user/userData"]
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
.navbar-mobile-helper{
  margin-top: 1rem;
}
.user-name{
    letter-spacing: 0.1em;
    font-family: 'Merriweather Sans', sans-serif;
    color: #2196F3;
}
</style>
