import type { Config } from 'tailwindcss'
import gridAuto from '@jill64/tailwind-grid-auto'
import reactions from '@jill64/tailwind-grid-auto'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: [gridAuto, reactions]
} satisfies Config
