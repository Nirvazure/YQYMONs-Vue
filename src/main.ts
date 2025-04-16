// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";
import "animate.css";
// import "./assets/main.css";
import router from "./router";
import { createPinia } from "pinia";

const app = createApp(App);

registerPlugins(app);

const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount("#app");
