// tailwind.config.js
export default {
  theme: {
    extend: {
      fontFamily: {
        base: ['"Base Neue"', "sans-serif"],
      },
    },
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // or './pages/**/*' depending on your router
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: ["prettier-plugin-tailwindcss"],
};
