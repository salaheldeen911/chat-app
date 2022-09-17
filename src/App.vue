<template>
  <div id="app">
    <mainNav />

    <router-view />
  </div>
</template>

<script>
import "./assets/icons/css/materialdesignicons.min.css";
import mainNav from "./components/mainNav.vue";

export default {
  components: { mainNav },
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.none {
  display: none !important;
}

.clicked {
  pointer-events: none;
  cursor: default;
}
</style>
