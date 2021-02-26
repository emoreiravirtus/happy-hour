<template>
  <div class="card-content main-content center">
    <div class="row valign-wrapper" v-if="action != 'Complete'">
      <div class="col s6">
        <img src="@/assets/work-guys.svg" />
      </div>
      <div class="col s6">
        <div class="row">
          <p class="time">{{ timestamp | moment("h:mm:ss a") }}</p>
          <span>{{ new Date() | moment("dddd, MMMM Do YYYY") }}</span>
        </div>
        <div class="row" v-if="action != 'Complete'">
          <p class="action-btn blue white-text" @mouseup="addTime(timestamp)">
            {{ action }}
          </p>
        </div>
      </div>
    </div>
    <div class="row valign-wrapper" v-if="action == 'Complete'">
      <div class="col s6">
        <img src="@/assets/celebrate.svg" />
      </div>
      <div class="col s6">
        <h2>Have a good day!</h2>
      </div>
    </div>
    <div class="row titles white-text blue lighten-1">
      <div class="col s3"><p>Start Working</p></div>
      <div class="col s3"><p>Lunch Start</p></div>
      <div class="col s3"><p>Lunch End</p></div>
      <div class="col s3"><p>Finish Working</p></div>
    </div>
    <div class="row blue-text">
      <div class="col s3">
        <p v-if="!day_worked.day_beg">--:--:--</p>
        <vue-timepicker
          v-else-if="editing"
          format="kk:mm:ss"
          v-model="editable_day_beg"
        ></vue-timepicker>
        <p class="green-text" v-else>
          {{ day_worked.day_beg | moment("h:mm:ss a") }}
        </p>
      </div>
      <div class="col s3">
        <p v-if="!day_worked.lunch_beg">--:--:--</p>
        <vue-timepicker
          v-else-if="editing"
          format="kk:mm:ss"
          v-model="editable_lunch_beg"
        ></vue-timepicker>
        <p class="green-text" v-else>
          {{ day_worked.lunch_beg | moment("h:mm:ss a") }}
        </p>
      </div>
      <div class="col s3">
        <p v-if="!day_worked.lunch_end">--:--:--</p>
        <vue-timepicker
          v-else-if="editing"
          format="kk:mm:ss"
          v-model="editable_lunch_end"
        ></vue-timepicker>
        <p class="green-text" v-else>
          {{ day_worked.lunch_end | moment("h:mm:ss a") }}
        </p>
      </div>
      <div class="col s3">
        <p v-if="!day_worked.day_end">--:--:--</p>
        <vue-timepicker
          v-else-if="editing"
          format="kk:mm:ss"
          v-model="editable_day_end"
        ></vue-timepicker>
        <p class="green-text" v-else>
          {{ day_worked.day_end | moment("h:mm:ss a") }}
        </p>
      </div>
    </div>
    <div class="row" v-if="action == 'Complete' && !editing">
      <p>
        Something wrong?
        <span class="secondary-btn" @click="startEditing">Edit Day</span>
      </p>
    </div>
    <div class="row" v-if="action == 'Complete' && editing">
      <p class="text-red" v-if="feedback">{{ feedback }}</p>
      <p>
        <span class="secondary-btn-red-border" @click="editing = false"
          >Cancel</span
        >
        <span class="secondary-btn" @click="sendEditedTime">Send</span>
      </p>
    </div>
    <div class="row">
      <router-link to="/calendar"
        ><div class="info-container">
          <div class="text-box-title valign-wrapper">
            <div class="col s6">My calendar</div>
            <div class="col s6">
              <img
                class="img-medium"
                src="https://img.icons8.com/plasticine/100/000000/calendar.png"
              />
            </div>
          </div></div
      ></router-link>
    </div>
  </div>
</template>

<script>
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";

export default {
  name: "Main",
  props: ["timestamp", "date"],
  components: { VueTimepicker },
  data() {
    return {
      action: "Start working",
      editing: false,
      feedback: null,
      day_worked: {
        day_beg: null,
        lunch_beg: null,
        lunch_end: null,
        day_end: null,
      },
      editable_day_beg: null,
      editable_lunch_beg: null,
      editable_lunch_end: null,
      editable_day_end: null,
    };
  },
  computed: {
    workedSeconds() {
      return Math.abs(this.day_worked.day_end - this.day_worked.day_beg) / 1000;
    },
    lunchSeconds() {
      return (
        Math.abs(this.day_worked.lunch_end - this.day_worked.lunch_beg) / 1000
      );
    },
    days_worked() {
      return this.$store.getters["day_worked/days_worked"]
    }
  },
  methods: {
    startEditing() {
      this.editable_day_beg = this.getEditableObject(this.day_worked.day_beg);
      this.editable_lunch_beg = this.getEditableObject(this.day_worked.lunch_beg);
      this.editable_lunch_end = this.getEditableObject(this.day_worked.lunch_end);
      this.editable_day_end = this.getEditableObject(this.day_worked.day_end);
      this.editing = true;
    },
    checkTodayWork(){
      // It is going to check if are something in database concerning today, and fill the fields.
      let now = new Date()
      let date = (now.getMonth() + 1) + "-" + now.getDate() + "-" + now.getFullYear()
      
      for(let day in this.days_worked){
        if(this.days_worked[day].date == date){
          this.day_worked = this.days_worked[day]
        }
      }
    },
    convertTimestamp(timestamp) {
      var h = new Date(timestamp).getHours();
      var m = new Date(timestamp).getMinutes();
      var s = new Date(timestamp).getSeconds();

      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;
      var output = h + ":" + m + ":",
        s;
    },
    getEditableObject(timestamp) {
      var h = new Date(timestamp).getHours();
      var m = new Date(timestamp).getMinutes();
      var s = new Date(timestamp).getSeconds();
      return {
        kk: h.toString(),
        mm: m.toString(),
        ss: s.toString(),
      };
    },
    addTime(hours) {
      if (!this.day_worked.day_beg) {
        this.day_worked.day_beg = hours;
        this.action = "Start Lunch";
        this.sendTime();
        return;
      } else if (!this.day_worked.lunch_beg) {
        this.day_worked.lunch_beg = hours;
        this.action = "Finish Lunch";
        this.sendTime();
        return;
      } else if (!this.day_worked.lunch_end) {
        this.day_worked.lunch_end = hours;
        this.action = "Finish Day";
        this.sendTime();
        return;
      } else if (!this.day_worked.day_end) {
        this.day_worked.day_end = hours;
        this.sendTime();
        this.action = "Complete"
      }
    },
    sendTime() {
      let data = this.day_worked
      
      data.day_end ? data.workedSeconds = this.workedSeconds : data.workedSeconds = 0
      data.lunch_end ? data.lunchSeconds = this.lunchSeconds : data.lunchSeconds = 0

      this.$store
        .dispatch("day_worked/sendTime", data)
        .catch((err) => (this.feedback = err));
    },
    getTimestamp(time) {
      let now = new Date();
      return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDay(),
        time.kk,
        time.mm,
        time.ss
      ).getTime();
    },
    sendEditedTime() {
      var incorrect_data = false;
      var day_beg, day_end, lunch_beg, lunch_end;

      for (var prop in this.editable_day_beg) {
        if (prop == "") {
          incorrect_data = true;
        }
      }
      for (var prop in this.editable_lunch_beg) {
        if (prop == "") {
          incorrect_data = true;
        }
      }
      for (var prop in this.editable_lunch_end) {
        if (prop == "") {
          incorrect_data = true;
        }
      }
      for (var prop in this.editable_day_end) {
        if (prop == "") {
          incorrect_data = true;
        }
      }

      this.day_worked.day_beg = this.getTimestamp(this.editable_day_beg);
      this.day_worked.lunch_beg = this.getTimestamp(this.editable_lunch_beg);
      this.day_worked.lunch_end = this.getTimestamp(this.editable_lunch_end);
      this.day_worked.day_end = this.getTimestamp(this.editable_day_end);


      if (!incorrect_data) {

        let data = this.day_worked
        data.lunchSeconds = this.lunchSeconds
        data.workedSeconds = this.workedSeconds

        this.feedback = "";
        this.$store
          .dispatch("day_worked/sendTime", data)
          .catch((err) => (this.feedback = err));

        this.editing = false
      } else {
        this.feedback = "Please fill all fields correctly";
      }
    },
  },
  watch:{
    day_worked(){
      if(this.day_worked.day_end){
        this.action = "Complete"
      }
      else{
        if(!this.day_worked.day_beg){
          this.action = "Start Working"
        }
        else if(!this.day_worked.lunch_beg){
          this.action = "Start Lunch"
        }
        else if(!this.day_worked.lunch_end){
          this.action = "Finish Lunch"
        }
        else{
          this.action = "Finish Work"
        }
      }
    },
    days_worked(){
      this.checkTodayWork()
    }
  },
  mounted(){
    this.checkTodayWork()
  }
};
</script>

<style>
.main-content .vue__time-picker {
  display: inline-block;
  position: relative;
  font-size: 0.8em;
  font-family: sans-serif;
  vertical-align: middle;
}

input[type="text"]:not(.browser-default)[readonly="readonly"] {
  border-bottom: 1px solid gray;
}

.main-content .vue__time-picker input.display-time {
  width: 100%;
}
.main-content .time {
  font-weight: 500;
  letter-spacing: 2px;
}

.main-content .info-container {
  position: relative;
}
.main-content .img-medium {
  width: 4rem;
}

.main-content .text-box-title {
  position: absolute;
  text-transform: uppercase;
  cursor: pointer;
  background: #2196f3;
  top: 2.4rem;
  color: white;
  padding: 0 3rem;
  right: 2.5rem;
  box-shadow: 0 10px 3px #00000038;
  transition: all 0.2s;
}

.main-content .text-box-title:hover {
  transform: translateX(-1rem) skew(4deg);
  box-shadow: 25px 9px 3px #00000038;
}

.main-content img {
  width: 100%;
}

.main-content h2 {
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

.main-content .secondary-btn {
  padding: 0.3rem;
  border-bottom: 0.3rem solid #2196f3;
  transition: all 0.3s;
  cursor: pointer;
}
.main-content .secondary-btn-red-border {
  padding: 0.3rem;
  border-bottom: 0.3rem solid #f44336;
  transition: all 0.3s;
  cursor: pointer;
}

.main-content .secondary-btn-red-border:hover {
  color: white !important;
  background-color: #f44336;
  -webkit-transform: translateY(-0.2rem);
  transform: translateY(-0.2rem);
  border-bottom: 0.3rem solid white;
  -webkit-box-shadow: 0 0 5px black;
  box-shadow: 0 10px 5px #0000004f;
}

.main-content .secondary-btn:hover {
  color: white !important;
  background-color: #2196f3;
  -webkit-transform: translateY(-0.2rem);
  transform: translateY(-0.2rem);
  border-bottom: 0.3rem solid white;
  -webkit-box-shadow: 0 0 5px black;
  box-shadow: 0 10px 5px #0000004f;
}

.main-content .action-btn {
  cursor: pointer;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0rem 0.6rem 0.6rem #00000061;
  text-transform: uppercase;
  transition: all 0.3s;
  font-weight: 700;
}
.main-content .action-btn:hover {
  color: #1e88e5 !important;
  background: white !important;
  border: 0.1rem solid #1e88e5;
  transform: translateY(-0.3rem);
}
.main-content .action-btn:active {
  transform: translateY(0.3rem);
  box-shadow: none;
}
.main-content .titles {
  border-bottom: 0.4rem solid #1e88e5;
  text-transform: uppercase;
}
</style>