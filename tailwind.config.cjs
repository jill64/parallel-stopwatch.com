/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  darkMode: 'media',
  plugins: [
    require('@jill64/tailwind-grid-auto'),
    require('@jill64/tailwind-reactions')
  ]
}

module.exports = config
