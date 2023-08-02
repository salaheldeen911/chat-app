import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import { BootstrapVue3 } from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import axios from "./axios";
import Pusher from "pusher-js";

const pinia = createPinia();
pinia.use(piniaPersist);

window.Pusher = Pusher;

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(BootstrapVue3);

app.mount("#app");
