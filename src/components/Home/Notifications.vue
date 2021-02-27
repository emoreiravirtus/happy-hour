<template>
  <div class="card notifications">
    <!-- Notifications -->
    <div class="card-content">
      Notifications (
      <span class="blue-text"> {{ notifications.length }} </span>)
      <p v-if="!notifications.length" class="green-text">No notifications for now</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notifications",
  props: ["notifications"],
};
</script>

<style>
</style>