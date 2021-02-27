<template>
  <div class="register container">
    <div class="row">
       <!-- Element on the left -->
      <div class="col s12 m6">
        <form @submit.prevent="Register">
          <!-- Header on the Left -->
          <div class="row">
            <div class="col s12">
              <h2 class="center">Start using our app</h2>
            </div>

            <div class="row" style="text-align: center">
              <span>Already a member?</span>
              <router-link to="/login"
                ><a class="secondary-btn blue-text">Login</a></router-link
              >
            </div>
          </div>
          <!-- Fields -->
          <div class="field">
            <label for="name">Name:</label>
            <input type="text" name="name" v-model="name" />
          </div>
          <div class="field">
            <label for="email">Email:</label>
            <input type="email" name="email" v-model="email" />
          </div>
          <div class="field">
            <label for="email">Company:</label>
            <input type="text" name="company" v-model="company" />
          </div>
          <div class="field">
            <label for="password">Password:</label>
            <input type="password" name="password" v-model="password" />
          </div>
          <div class="field center red-text">
            <span v-if="feedback"> {{ feedback }} </span>
          </div>
          <div class="field center">
            <button class="btn blue">Send</button>
          </div>
        </form>
      </div>
      <!-- Element on the right -->
      <div class="col s12 m6 info-container">
        <img src="@/assets/register-couple.svg" alt="Kiwi standing on oval" />
        <div class="text-box blue blue-text upper-text">
          <h4 class="text-box-title">Focus on what matters</h4>
          <h4 class="text-box-title-2">Live better</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      name: null,
      email: null,
      company: null,
      password: null,
      
      /**
       * @feedback : The little error message that may appear.
       */
      feedback: null,
    };
  },
  methods: {
    /**
     * @Register : evaluates the fields and if they are all set correctly, 
     * sends a register request to firebase.
     */
    async Register() {
      if (!this.email || !this.password || !this.company || !this.name) {
        this.feedback = "Please fill all fields";
      } else {
        if (this.password.length < 6)
          return (this.feedback = "Password too short (at least 6 characters)");
        this.feedback = "";

        let loader = this.$loading.show({
          color: "#2196F3",
          loader: "dots",
        });
        await this.$store
          .dispatch("user/registerUser", {
            name: this.name,
            email: this.email,
            company: this.company,
            password: this.password,
          })
          .then(() => {
            this.password = null
            this.$router.push({ name: "Home" })
            loader.hide()
          })
          .catch((err) => {
            this.feedback = err
            if (err.type == 400) {
              this.feedback = "Email already used";
            }
          });
      }
    },
  },
};
</script>

<style>
.register {
  margin-top: 60px;
}

.register img {
  width: 30rem;
}
.register .secondary-btn {
  padding: 0.3rem;
  border-bottom: 0.3rem solid #2196f3;
  transition: all 0.3s;
}

.register .secondary-btn:hover {
  color: white !important;
  background-color: #2196f3;
  -webkit-transform: translateY(-0.2rem);
  transform: translateY(-0.2rem);
  border-bottom: 0.3rem solid white;
  -webkit-box-shadow: 0 0 5px black;
  box-shadow: 0 10px 5px #0000004f;
}

.register h2 {
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
.register .field {
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

.register .info-container {
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
  height: 10rem;
}

.register .img-small {
  width: 1.4rem;
}

.register .text-card {
  padding: 0.5rem 0;
  background: white;
  border-radius: 1rem;
  letter-spacing: 2px;
}

.register .text-box-title {
  position: absolute;
  top: -3rem;
  background: white;
  padding: 0.5rem;
  right: 0;
  box-shadow: -8px 10px 3px #00000038;
}

.register .text-box-title-2 {
  position: absolute;
  bottom: 2rem;
  background: white;
  padding: 0.5rem;
  right: 2rem;
  -webkit-box-shadow: -8px 10px 3px #00000038;
  box-shadow: -8px 10px 3px #00000038;
}

.register .upper-text {
  text-transform: uppercase;
}

#img-logo {
  width: 5rem;
  margin-top: 2rem;
}
</style>