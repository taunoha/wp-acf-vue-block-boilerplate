import { createApp } from "vue";
import App from "./App.vue";
import { getConfig } from "@wordpress/interactivity";
import { setLocaleData } from "@/utils/i18n";

import "./assets/main.scss";

const { translations } = getConfig("{domain}/{block-slug}");

setLocaleData(translations);

const app = createApp(App);

app.mount(`#{domain}-{block-slug}`);
