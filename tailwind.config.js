const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        'gill-sans': ['Gill Sans', ...defaultTheme.fontFamily.sans]
      },
    },
  },
  plugins: [],
}
