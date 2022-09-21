import { defineStore } from "pinia";

export const AuthStore = defineStore("auth", {
  state() {
    return {
      user: null,
      encryptedToken: "",
      status: false,
    };
  },
  actions: {
    setData(user, token) {
      this.user = user;
      this.encryptedToken = this.crypt("hell", token);
      this.status = true;
    },

    crypt(salt, text) {
      const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
      const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
      const applySaltToChar = (code) =>
        textToChars(salt).reduce((a, b) => a ^ b, code);

      return text
        .split("")
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join("");
    },

    decrypt(salt, encoded) {
      const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
      const applySaltToChar = (code) =>
        textToChars(salt).reduce((a, b) => a ^ b, code);
      return encoded
        .match(/.{1,2}/g)
        .map((hex) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode) => String.fromCharCode(charCode))
        .join("");
    },
  },
  getters: {
    token(state) {
      if (state.encryptedToken) this.decrypt("hell", state.encryptedToken);
    },
  },

  persist: {
    strategies: [
      {
        key: "user",
        storage: localStorage,
        paths: ["status", "encryptedToken", "user"],
      },
    ],
    enabled: true,
  },
});
