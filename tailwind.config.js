const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },

      color: {},

      //     color: #e5e7eb;
      // background-color: #1f2937;
      // overflow-x: auto;
      // font-size: 0.875em;
      // line-height: 1.7142857;
      // margin-top: 1.7142857em;
      // margin-bottom: 1.7142857em;
      // border-radius: 0.375rem/* 6px */;
      // padding-top: 0.8571429em;
      // padding-right: 1.1428571em;
      // padding-bottom: 0.8571429em;
      // padding-left: 1.1428571em;

      typography: {
        DEFAULT: {
          css: {
            ".solution pre": {
              backgroundColor: "transparent",
              margin: 0,
              padding: 0,
            },

            "code::before": null,
            "code::after": null,
            "pre strong": {
              color: "#E5E7EB",
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
}
