import { createApp, markRaw } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./axios";

const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);
app.use(pinia);
app.use(router);

app.mount("#app");
