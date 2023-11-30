import gridAuto from '@jill64/tailwind-grid-auto'
import reactions from '@jill64/tailwind-reactions'
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [gridAuto, reactions],
  darkMode: 'class'
} satisfies Config
