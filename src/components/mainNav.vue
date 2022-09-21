<template>
  <nav>
    <router-link v-if="auth.status" class="m-1" to="/">Home</router-link>
    <router-link v-if="auth.status" class="m-1" to="/todo">Todos</router-link>

    <a
      v-if="auth.status"
      href=" javascript:void(0)"
      :class="{ disabled: clicked }"
      @click="logout"
      class="m-1"
      >Logout</a
    >
    <router-link v-if="!auth.status" class="m-1" :to="{ name: 'login' }"
      >Login</router-link
    >
    <router-link v-if="!auth.status" class="m-1" :to="{ name: 'register' }"
      >Register</router-link
    >
  </nav>
</template>

<script>
import axios from "axios";
import { AuthStore } from "../stores/AuthStore";
export default {
  name: "mainNav",
  setup() {
    const auth = AuthStore();
    return { auth };
  },
  mounted() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.auth.token()}`;
  },
  data() {
    return {
      clicked: false,
    };
  },
  methods: {
    async logout() {
      this.clicked = true;
      try {
        let response = await axios.post("logout");
        console.log(response.data);
        this.auth.$reset();
        this.$router.push({ path: "/login", replace: true });
        this.clicked = false;

        return true;
      } catch (errors) {
        console.log(errors);
        this.clicked = false;
      }
    },
  },
};
</script>

<style>
</style>