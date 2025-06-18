/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        softGreen: "#E6F0ED",
        lightPeach: "#FAF3F0",
        earthText: "#4F6F52",
        softBrown: "#9D7C6D",
        softCream: "#FAF4EF",
      },
      

      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Lora', 'serif']
      }
    },
  },
  plugins: [],
}
