/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
module.exports = {
  content: ["./app/**/*.tsx","./components/**/*.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {}
  },
  plugins: []
}

