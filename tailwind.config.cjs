/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      primary: "#81F8B1",
      secondary: "#A1FFC7",
      main: "#E7FFE9",
      disable: "#EBEBEB",
    }
  },
  plugins: [],
}
