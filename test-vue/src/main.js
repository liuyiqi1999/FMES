import { createApp } from "vue";
import App from "./App.vue";
import { init } from "@mitojs/browser";
import { vuePlugin } from "@mitojs/vue";
import { v4 as uuidv4 } from "uuid";

const app = createApp(App);

const MitoInstance = init(
    {
        debug: false,
        apikey: "test-vue",
        vue: app,
        dsn: "http://localhost:3000/upload",
        maxBreadcrumbs: 100,
        backTrackerId() {
            if (!localStorage.getItem("userId")) {
                localStorage.setItem("userId", uuidv4());
            }
            return localStorage.getItem("userId");
        },
    },
    [vuePlugin]
);
window._MITO_ = MitoInstance;

app.mount("#app");
