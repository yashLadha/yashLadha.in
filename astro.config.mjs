import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://yashladha.in",
  prefetch: true,
  // Astro 7 defaults to "jsx", which strips spaces between inline elements such as links in prose.
  compressHTML: true,
  trailingSlash: "never",
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "tokyo-night",
      },
    },
  },
  build: {
    format: "file", // Fix trailing slash never in production builds
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
});
