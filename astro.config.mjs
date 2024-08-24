import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://yashladha.in",
  integrations: [tailwind(), sitemap({
    filter: page => page !== 'https://yashladha.in/resume',
  })],
});
