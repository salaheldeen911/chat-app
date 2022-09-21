<template>
  <div id="app">
    <mainNav />

    <router-view />
  </div>
</template>

<script setup>
import "./assets/icons/css/materialdesignicons.min.css";
import mainNav from "./components/mainNav.vue";
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

.disabled {
  pointer-events: none;
  cursor: default;
}
</style>
