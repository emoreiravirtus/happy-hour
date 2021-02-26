<template>
  <div class="calendar container">
    <div class="row">
      <div class="col s6 card">
        <div class="row card-content" v-if="enableCalendar">
          <FunctionalCalendar
          :markedDates="marked_days_worked"
          :dateFormat='dateFormat'
          @dayClicked="changeDay"
          ></FunctionalCalendar>
        </div>
      </div>
      <div class="col-s6 card">
        <div class="row card-content right">
          <h4 v-if="marked_days_worked.length == 0">You don't have worked days yet</h4>
          <h4 v-else-if="!selectedDate">Select a date to see details</h4>
          <div v-else>
              <h4>{{ selectedDate.date }} Details</h4>
              <selected-date-table :selectedDate="selectedDate"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectedDateTable from "./SelectedDateTable"

export default {
  name: "Calendar",
  components:{
    SelectedDateTable
  },
  data() {
    return {
      dateFormat: "mm/dd/yyyy",
      selectedDate: null,
      enableCalendar: false
    }
  },
  computed: {
    user() {
      return this.$store.getters["user/userData"];
    },
    days_worked(){
      return this.$store.getters["day_worked/days_worked"]
    },
    marked_days_worked(){
      let markers = this.days_worked.map(day => {
        return day.date.replaceAll("-", "/")
        })
      return markers
    }
  },
  mounted(){
    let loader = this.$loading.show({
        color: "#2196F3",
        loader: "bars"
    })
    setTimeout(() => {
      this.enableCalendar = true
      loader.hide()
    }, 1000)
  },
  methods:{
    changeDay(object){
      object.date = object.date.replaceAll("/", "-")
      this.days_worked.filter(day => {
        if(day.date == object.date){
          this.selectedDate = day
        }
        })
    }
  }
};
</script>

<style>

.calendar{
  margin-top: 1rem;
}
.calendar h4{
  font-weight: 700;
  font-size: 1.4em;
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

.vfc-week .vfc-day span.vfc-span-day.vfc-marked{
  cursor: pointer;
}
</style>