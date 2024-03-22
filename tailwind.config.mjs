/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'dull-lavender': {
          50: '#f6f3ff',
          100: '#efe9fe',
          200: '#e1d7fd',
          300: '#ccb6fc',
          400: '#b18bf8',
          500: '#9a5ff3',
          600: '#8e3dea',
          700: '#7e2bd6',
          800: '#6a24b3',
          900: '#571f93',
          950: '#361164'
        },
        logan: {
          50: '#f7f7fb',
          100: '#f1eff8',
          200: '#e6e2f2',
          300: '#d2cbe7',
          400: '#bcb0d9',
          500: '#a08cc6',
          600: '#8e71b6',
          700: '#7c5fa2',
          800: '#674f88',
          900: '#564270',
          950: '#372a4b'
        }
      },
      boxShadow: {
        outline: '0 0 0 3px rgba(66, 153, 225, 0.5)'
      }
    }
  },
  plugins: []
}
