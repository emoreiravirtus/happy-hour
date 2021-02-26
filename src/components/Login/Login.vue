<template>
  <div class="login container">
    <div class="row">
      <div class="col s12 m6">
        <form @submit.prevent="Login">
          <div class="row">
            <div class="col s2">
              <img
                id="img-logo"
                src="https://img.icons8.com/cotton/64/000000/apple-watch-apps.png"
              />
            </div>
            <div class="col s10">
              <h2 class="center">Welcome to Happy Hour</h2>
            </div>
          </div>
          <div class="field">
            <label for="email">Email:</label>
            <input type="email" name="email" v-model="email" />
          </div>
          <div class="field">
            <label for="password">Password:</label>
            <input type="password" name="password" v-model="password" />
          </div>
          <div class="field center red-text">
            <span v-if="feedback"> {{ feedback }} </span>
          </div>
          <div class="field center">
            <button class="btn blue darken-1">Enter</button>
          </div>
          <div class="row" style="text-align: center">
            <span>Don't have an account?</span>
            <router-link to="/register"><a class="secondary-btn blue-text">Create an account</a></router-link>
          </div>
        </form>
      </div>
      <div class="col s12 m6 mb-2 info-container">
        <img src="@/assets/login-girl.svg" alt="Kiwi standing on oval" />
        <div class="text-box blue blue-text upper-text">
          <h4 class="text-box-title">Time is ours</h4>
          <div class="row">
            <div class="col">
              <span class="text-card">
                <img
                  class="img-small"
                  src="https://img.icons8.com/fluent/48/000000/working-with-a-laptop.png"
                />
                Worked hours
              </span>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <span class="text-card"
                ><img
                  class="img-small"
                  src="https://img.icons8.com/plasticine/100/000000/car.png"
                />Arriving and Exiting hours</span
              >
            </div>
          </div>
          <div class="row">
            <div class="col">
              <span class="text-card">
                <img
                  class="img-small"
                  src="https://img.icons8.com/emoji/48/000000/hamburger-emoji.png"
                />
                Lunch breaks
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
    };
  },
  methods: {
    async Login() {
      if (!this.email || !this.password) {
        this.feedback = "Values are missing";
      } else {
        let loader = this.$loading.show({
        color: "#2196F3",
        loader: "dots"
      })
        this.feedback = null;
        await this.$store
          .dispatch("user/login", {
            email: this.email,
            password: this.password,
          })
          .then(
            setTimeout(() => {
              this.$router.push({ name: "Home" })
              loader.hide()
            }, 3000)
          )
          .catch((err) => (this.feedback = err));
      }
    },
  },
};
</script>

<style>
.login {
  margin-top: 60px;
}

.login img {
  width: 30rem;
}

.login .secondary-btn{
    padding: 0.3rem;
    border-bottom: 0.3rem solid #2196f3;
    transition: all .3s;
}

.login .secondary-btn:hover{
    color: white !important;
    background-color: #2196f3;
    -webkit-transform: translateY(-0.2rem);
    transform: translateY(-0.2rem);
    border-bottom: 0.3rem solid white;
    -webkit-box-shadow: 0 0 5px black;
    box-shadow: 0 10px 5px #0000004f;
}

.login h2 {
  font-weight: 700;
  font-size: 2.4em;
  text-transform: uppercase;
  background: rgb(48, 147, 245);
  background: -moz-linear-gradient(
    90deg,
    rgba(48, 147, 245, 1) 0%,
    rgba(48, 147, 245, 1) 50%,
    rgba(44, 130, 199, 1) 100%
  );
  background: -webkit-linear-gradient(
    90deg,
    rgba(48, 147, 245, 1) 0%,
    rgba(48, 147, 245, 1) 50%,
    rgba(44, 130, 199, 1) 100%
  );
  background: linear-gradient(
    90deg,
    rgba(48, 147, 245, 1) 0%,
    rgba(48, 147, 245, 1) 50%,
    rgba(44, 130, 199, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#3093f5",endColorstr="#2c82c7",GradientType=1);
  -webkit-background-clip: text;
  color: transparent;
}
.login .field {
  margin-bottom: 1em;
}

.full-width {
  width: 100%;
}

.btn {
  transition: all 0.2s;
}
.btn:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 5px 10px black;
}

.login .info-container {
  position: relative;
}

.text-box {
  position: absolute;
  bottom: -8rem;
  left: 0;
  width: 100%;
  padding: 1rem;
  -webkit-box-shadow: 0 0 6px #0000006b;
  box-shadow: 0 0 6px #0000006b;
  overflow: visible;
  animation-name: appear;
  animation-duration: 1s;
}

.login .img-small {
  width: 1.4rem;
}

.login .text-card {
  padding: 0.5rem 0;
  background: white;
  border-radius: 1rem;
  letter-spacing: 2px;
}

.login .text-box-title {
  position: absolute;
  top: 7.4rem;
  background: white;
  padding: 0.5rem;
  right: 2.5rem;
  box-shadow: -8px 10px 3px #00000038;
}

.login .upper-text {
  text-transform: uppercase;
}

#img-logo {
  width: 5rem;
  margin-top: 2rem;
}

@keyframes appear {
  from {opacity: 0; transform: translateX(-5rem);}
  to {opacity: 1;}
}
</style>