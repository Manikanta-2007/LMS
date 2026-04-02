/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',
        secondary: '#4338ca',
        accent: '#3b82f6',
        'academic-slate': '#334155',
        'academic-gray': '#f1f5f9',
      },
    },
  },
  plugins: [],
}
