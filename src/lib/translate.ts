import { page } from '$app/stores'
import { derived } from 'svelte/store'
import { validated } from './enum/locale'
import type { Dict } from './type/Dict'

export const translate = derived(
  page,
  ($page) => (dict: Dict) => dict[validated($page.params.locale)]
)
