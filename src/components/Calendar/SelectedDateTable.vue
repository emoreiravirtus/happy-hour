<template>
  <table class="selected-date-table responsive-table">
    <!-- Worked day details -->
    <tbody>
      <tr>
        <td>Work beginning</td>
        <td class="green-text">
          {{ selectedDate.day_beg | moment("h:mm:ss a") }}
        </td>
      </tr>
      <tr>
        <td>Work Ending</td>
        <td class="green-text">
          {{ selectedDate.day_end | moment("h:mm:ss a") }}
        </td>
      </tr>
      <tr>
        <td>Lunch Beginning</td>
        <td class="green-text">
          {{ selectedDate.lunch_beg | moment("h:mm:ss a") }}
        </td>
      </tr>
      <tr>
        <td>Lunch Ending</td>
        <td class="green-text">
          {{ selectedDate.lunch_end | moment("h:mm:ss a") }}
        </td>
      </tr>
      <tr>
        <td>Working Hours</td>
        <td class="green-text">{{ secondsToHms(selectedDate.workedSeconds) }}</td>
      </tr>
      <tr>
        <td>Lunch Hours</td>
        <td class="green-text">{{ secondsToHms(selectedDate.lunchSeconds) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "SelectedDateTable",
  /**
   * @selectedDate : The current selected date to display 
   */
  props: ["selectedDate"],
  methods: {
    /**
     * @secondsToHms : Takes a timestamp and returns a formatted date.
     */
    secondsToHms(seconds) {
      seconds = Number(seconds);
      var h = Math.floor(seconds / 3600);
      var m = Math.floor((seconds % 3600) / 60);
      var s = Math.floor((seconds % 3600) % 60);

      var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
      return hDisplay + mDisplay + sDisplay;
    },
  },
};
</script>

<style>
.selected-date-table {
  width: auto;
}
</style>