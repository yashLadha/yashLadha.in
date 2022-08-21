const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        'raleway': ['Raleway', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
