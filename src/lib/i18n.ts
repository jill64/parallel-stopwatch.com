import { init } from '@jill64/svelte-i18n'

export const locales = ['en', 'ja'] as const

export const { match, translate, attach } = init({
  slug: '[locale=locale]',
  locales: ['en', 'ja']
})
