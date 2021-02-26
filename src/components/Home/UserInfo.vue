<template>
  <div class="card user-info">
    <div class="card-content">
      <p class="upper-text" v-if="user">
        Full Name: <span class="blue-text truncate">{{ user.name }}</span>
      </p>
      <p class="upper-text" v-if="user">
        Company: <span class="blue-text truncate">{{ user.company }}</span>
      </p>
      <div class="hours-info">
      <p>
          Expected Working Hours
          <ul>
              <li> Daily: <span class="blue-text truncate">{{ secondsToHms(user.expected_hours_per_day) }}</span></li>
              <li> Month: <span class="blue-text truncate">{{ secondsToHms(user.expected_hours_per_day * 20) }}</span> </li>
          </ul>
      </p>
      <p>
          Worked Hours <strong class="upper-text green-text"> {{ new Date() | moment("MMMM") }}</strong> 
      </p>
      <p class="blue-text truncate">{{ worked_hours_month }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "User-Info",
  props: ["user"],
  computed:{
    days_worked(){
      return this.$store.getters["day_worked/days_worked"]
    },
    worked_hours_month(){

      let totalSeconds = 0

      var d = new Date();
      var current_month = d.getMonth() + 1;

      this.days_worked.forEach(day => {
        if(day.date.slice(0, 2) == current_month){
          totalSeconds += day.workedSeconds
        }
      })
      
      return this.secondsToHms(totalSeconds)
    }
  },
  methods:{
    secondsToHms(seconds) {
      seconds = Number(seconds);
      var h = Math.floor(seconds / 3600);
      var m = Math.floor((seconds % 3600) / 60);
      var s = Math.floor((seconds % 3600) % 60);

      var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
      return hDisplay + mDisplay + sDisplay;
    },
  }
};
</script>

<style>
.user-info .hours-info {
  border-top: 0.2rem solid #2196f3;
  margin: 1rem 0;
  padding: 1rem;
}

.user-info .upper-text {
  text-transform: uppercase;
}
</style>