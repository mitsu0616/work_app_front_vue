import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

import "./reset.css";
import router from "@/route/index";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount("#app");
