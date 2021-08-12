<template>
  <dashboard />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dashboard from "./views/dashboard/index.vue";

export default defineComponent({
  name: "App",
  components: {
    Dashboard,
  },
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}
</style>
