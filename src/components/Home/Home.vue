<template>
  <div class="home container">
    <div class="row">
      <!-- Main element -->
      <div class="col s12 m8 card margin-bottom-5">
        <div class="row">
          <main-content :timestamp="timestamp"/>
        </div>
      </div>
      <!-- Notifications and User-info -->
      <div class="col s12 m4">
        <div class="row">
          <div class="col s12" v-if="user">
            <notifications :notifications="user.notifications" />
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <user-info :user="user" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notifications from "./Notifications";
import UserInfo from "./UserInfo";
import MainContent from "./Main";

export default {
  name: "Home",
  components: {
    Notifications,
    UserInfo,
    MainContent,
  },
  data() {
    return {
      /**
       * @timestamp : Stores the current time.
       */
      timestamp: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/userData"];
    }
  },
  created() {
    // Starts a counter to update the current time live.
    setInterval(this.getTimestamp, 1000);
  },
  methods: {
    /**
     * @getTimestamp : returns the current time.
     */
    getTimestamp: function () {
      const today = new Date();
      this.timestamp = today.getTime();
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Sacramento&display=swap");
.row .col .m4 {
  margin: 1rem;
}

.margin-bottom-5{
  margin-bottom: 5rem;
}
</style>