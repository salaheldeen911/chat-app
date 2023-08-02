<template>
  <div id="site-container">
    <div id="header">
      <mainNav />
    </div>
    <router-view />
  </div>
</template>

<script setup>
import "./assets/icons/css/materialdesignicons.min.css";
import mainNav from "./components/mainNav.vue";
import { AuthStore } from "./stores/AuthStore";
import Echo from "laravel-echo";

const auth = AuthStore();
if (auth.status) {
  if (!window.Echo) {
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "pusher_key",
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
      authEndpoint: "http://localhost:8000/api/broadcasting/auth",
      auth: {
        headers: {
          Authorization: auth.token(),
        },
      },
    });
  }
}
// import { onMounted } from "vue";

// onMounted(() => {
//   window.Echo.private(`friend-request-channel.${id}`).listen(
//     "FriendRquestEvent",
//     (e) => {
//       console.log(e);
//     }
//   );
// });
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#app {
  overflow: hidden;
}
nav {
  text-align: center;
  padding: 30px;
}

#app > #header {
  padding: 0;
  margin: 0;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.disabled {
  pointer-events: none;
  cursor: default;
}
</style>
