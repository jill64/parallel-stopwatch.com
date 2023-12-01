import { i18nInit } from '@jill64/svelte-suite'

export const locales = ['en', 'ja'] as const

export const { match, translate, attach } = i18nInit({
  slug: '[locale=locale]',
  locales: ['en', 'ja']
})
