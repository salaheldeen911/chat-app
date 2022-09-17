import { defineStore } from "pinia";

export const AuthStore = defineStore("auth", {
  state() {
    return {
      user: null,
      token: "",
      status: false,
    };
  },
  actions: {
    setData(user, token) {
      this.user = user;
      this.token = token;
      this.status = true;
    },
  },

  persist: {
    strategies: [
      {
        key: "user",
        storage: localStorage,
        paths: ["status", "token", "user"],
      },
    ],
    enabled: true,
  },
});
