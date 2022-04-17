module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        dropin: 'dropin 300ms ease-out',
        fadein: 'fadein 300ms ease-in-out',
      },
      keyframes: {

        dropin: {
          '0%': {
            transform: 'translate3d(0, -50%, 0)',
            opacity: '0'
          },
          '100%': {
            transform: 'none',
            opacity: '1'
          },
        },

        fadein: {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '0.5'
          },
        },

      }
    },
  },
  plugins: [],
}