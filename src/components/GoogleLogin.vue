<template>
  <!-- Google Sign In Button -->
  <button class="google-btn" @click.prevent="googleAuth">
    Sign in with Google
    <img
      id="u-img-small"
      src="https://img.icons8.com/fluent/48/000000/google-logo.png"
    />
  </button>
</template>
 
<script>
export default {
  data(){
    return{
      loader: null
    }
  },
  computed:{
    user(){
      return this.$store.getters["user/user"]
    }
  },
  methods: {
    async googleAuth() {
      try{
        await this.$store.dispatch("user/signInWithGoogle")
      } catch(e) {
        console.log(e)
      }
    },
  },
  watch:{
    // Check if the user was authenticated, and then routes to Home.
    user(){
      if(this.user){
        this.$router.push({ name: "Home" })
      }
    }
  }
};
</script>

<style>
.google-btn{
    -webkit-box-align: baseline;
    align-items: baseline;
    border-width: 0px;
    box-sizing: border-box;
    font-size: inherit;
    font-style: normal;
    max-width: 90%;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
    padding: 0px 8px;
    vertical-align: middle;
    width: 100%;
    font-weight: bold;
    color: rgb(66, 82, 110) !important;
    height: 40px !important;
    line-height: 40px !important;
    background: rgb(255, 255, 255) !important;
    box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 5px 0px !important;
}
.google-btn img{
        position: absolute;
        margin: 0.65rem 0.1rem;
}

#u-img-small{
    width: 1.4rem;
}
</style>