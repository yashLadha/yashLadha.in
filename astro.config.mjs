import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://yashladha.in",
  prefetch: true,
  trailingSlash: "never",
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'tokyo-night',
      },
    },
  },
  build: {
    format: "file", // Fix trailing slash never in production builds
  },
  integrations: [
    tailwind({
      applyBaseStyles: false, // Let shadcn handle base styles
    }),
    react(),
    sitemap(),
  ],
});