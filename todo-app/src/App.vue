<script setup>
import { RouterView } from 'vue-router';
import ToasterNotification from './components/ToasterNotification.vue';
</script>
<template>
  <div class="route-container">
    <RouterView />
    <ToasterNotification/>
  </div>
</template>
<style scoped></style>
