module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins", "Helvetica", "Arial", "sans-serif"],
    },

    extend: {
      animation: {
        dropin: "dropin 300ms ease-out",
        fadein: "fadein 300ms ease-in-out",
        grow: "grow 400ms ease-in-out",
        burst: "burst 950ms ease-out",
      },
      keyframes: {
        dropin: {
          "0%": {
            transform: "translate3d(0, 0, 0)",
            opacity: "0",
          },
          "1%": {
            transform: "translate3d(0, -50%, 0)",
            opacity: "0",
          },
          "100%": {
            transform: "none",
            opacity: "1",
          },
        },

        burst: {
          "0%": {
            transform: "scale(1, 1)",
            opacity: "100%",
          },
          "100%": {
            transform: "scale(1.5, 2)",
            opacity: "0%",
          },
        },

        fadein: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "0.5",
          },
        },

        grow: {
          "0%": {
            opacity: "0",
            transform: "scale(0)",
          },
          "60%": {
            opacity: ".8",
            transform: "scale(1.15)",
          },
          "90%": {
            opacity: "1",
            transform: "scale(.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
