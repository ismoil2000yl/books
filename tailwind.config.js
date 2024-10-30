/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: { screens: { "md-lg": "900px" } },
    container: {
      center: true
    }
  },
  corePlugins: {
    preflight: false
  },
  plugins: [],
}

