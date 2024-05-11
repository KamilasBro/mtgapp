/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      // breakpoints works different than in media queries
      // it is taking current width and wider
      // so fhd is the minimum width just before 1600 breakpint
      fhd: '1601px',
      xxl: '1441px',
      xl: '1281px',
      lg: '1025px',
      mobilexl: '801px',
      mobilelg: '601px',
      mobilemd: '426px',
      mobilesm: '320px',
    },
    extend: {},
  },
  plugins: [],
}