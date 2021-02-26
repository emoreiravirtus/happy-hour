<template>
  <div class="navbar">
    <nav>
      <div class="nav-wrapper blue">
        <router-link to="/">
          <a href="" class="brand-logo">
            <div class="row">
              <div class="col s4">
                <img src="https://img.icons8.com/cotton/64/000000/apple-watch-apps.png"/>
              </div>
              <div class="col s8">
                <span>Happy Hour</span>
              </div>
            </div>
          </a>
        </router-link>
        <ul class="right hide-on-med-and-down">
          <li class="user-name" v-if="userData">
              Welcome, {{ userData.name.split(' ').slice(0, -1)[0] }}
          </li>
          <li v-if="!user">
              <router-link to="/login"><a>Login</a></router-link>
          </li>
          <li v-if="user">
              <router-link to="/"><a>Home</a></router-link>
          </li>
          <li v-if="user">
              <router-link to="/calendar"><a>Calendar</a></router-link>
          </li>
           <li v-if="user">
              <a @click="Logout">Logout</a>
          </li>
          <li v-if="!user">
              <router-link to="/register"><a>Register</a></router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  name: "Navbar",
  data() {
    return {
    };
  },
  async mounted(){

        await this.$store.dispatch("day_worked/startListen")

        document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems, {
            alignment: 'left',
            coverTrigger: false
        });
        });
  },
  computed: {
    user(){
      return this.$store.getters["user/user"]
    },
    userData(){
      return this.$store.getters["user/userData"]
    }
  },
  methods:{
    async Logout(){
      await this.$store.dispatch("day_worked/stopListen")
      await this.$store.dispatch("user/logout", this.user).then(this.$router.push({name: "Login"}))
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Merriweather+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap');

.navbar img {
  width: 4rem;
}
.navbar nav .nav-wrapper span {
  font-family: 'Comfortaa', cursive;
}
nav .brand-logo{
    position: absolute;
    color: #fff;
    display: inline-block;
    font-size: 1.1rem;
    padding: 0rem;
    width: 20rem;
}
.navbar .user-name{
    margin-right: 3em;
    letter-spacing: 0.1em;
    font-family: 'Merriweather Sans', sans-serif;
}
</style>