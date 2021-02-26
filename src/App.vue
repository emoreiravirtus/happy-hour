<template>
  <div id="app">
    <navbar v-if="user"></navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footerbar from '@/components/Footerbar'

export default {
  name: 'App',
  components:{
    Navbar,
    Footerbar
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
