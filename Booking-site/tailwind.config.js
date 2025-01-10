/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // primary:'#F5385D',
        primary:'#1E40AF',
        // darker to lighter
        bg1:'#2f2235',
        bg2:'#60495a',
        bg3:'#8c6982',
        lighter:'#bfc3ba',
        light:'#d5d7d5',
        shadow:'#a9aca9',
      }
    },
  },
  plugins: [],
}

