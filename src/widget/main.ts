import { createApp } from "vue";
import { createPinia } from "pinia";
import WidgetApp from "./WidgetApp.vue";
import router from "../router";

export function init(options: { element: string }) {
  const app = createApp(WidgetApp);

  const pinia = createPinia();
  app.use(pinia);

  app.use(router);

  app.mount(options.element);
}

export default { init };
