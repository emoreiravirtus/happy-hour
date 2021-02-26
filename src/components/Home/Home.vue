<template>
  <div class="home container">
    <div class="row">
      <div class="col s8 card">
        <div class="row">
          <main-content :timestamp="timestamp"/>
        </div>
      </div>
      <div class="col s4">
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
      timestamp: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/userData"];
    }
  },
  created() {
    setInterval(this.getTimestamp, 1000);
  },
  methods: {
    getTimestamp: function () {
      const today = new Date();
      this.timestamp = today.getTime();
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Sacramento&display=swap");
.row .col .s4 {
  margin: 1rem;
}
</style>