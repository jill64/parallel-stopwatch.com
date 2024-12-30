import { init } from '@jill64/svelte-suite/i18n'

export const locales = ['en', 'ja'] as const

export const i = init({
  slug: '[locale=locale]',
  locales: ['en', 'ja']
})
