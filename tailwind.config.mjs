const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["Assistant Variable", ...defaultTheme.fontFamily.sans],
      source: ["Source Code Pro Variable", ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [],
};
